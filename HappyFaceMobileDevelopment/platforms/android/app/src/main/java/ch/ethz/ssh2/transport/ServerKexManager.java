/*
 * Copyright (c) 2006-2013 Christian Plattner. All rights reserved.
 * Please refer to the LICENSE.txt for licensing details.
 */
package ch.ethz.ssh2.transport;

import java.io.IOException;
import java.security.DigestException;

import ch.ethz.ssh2.ConnectionInfo;
import ch.ethz.ssh2.PacketTypeException;
import ch.ethz.ssh2.auth.ServerAuthenticationManager;
import ch.ethz.ssh2.crypto.cipher.BlockCipher;
import ch.ethz.ssh2.crypto.cipher.BlockCipherFactory;
import ch.ethz.ssh2.crypto.dh.DhExchange;
import ch.ethz.ssh2.crypto.digest.MAC;
import ch.ethz.ssh2.packets.PacketKexDHInit;
import ch.ethz.ssh2.packets.PacketKexDHReply;
import ch.ethz.ssh2.packets.PacketKexInit;
import ch.ethz.ssh2.packets.Packets;
import ch.ethz.ssh2.server.ServerConnectionState;
import ch.ethz.ssh2.signature.DSASHA1Verify;
import ch.ethz.ssh2.signature.DSASignature;
import ch.ethz.ssh2.signature.RSASHA1Verify;
import ch.ethz.ssh2.signature.RSASignature;

/**
 * @version $Id: ServerKexManager.java 160 2014-05-01 14:30:26Z dkocher@sudo.ch $
 */
public class ServerKexManager extends KexManager {

    private final ServerConnectionState state;

    private boolean authenticationStarted = false;

    public ServerKexManager(ServerConnectionState state) {
        super(state.tm, state.csh, state.next_cryptoWishList, state.generator);
        this.state = state;
    }

    @Override
    public void handleFailure(final IOException failure) {
        synchronized(accessLock) {
            connectionClosed = true;
            accessLock.notifyAll();
        }
    }

    @Override
    public void handleMessage(byte[] msg) throws IOException {
        PacketKexInit kip;

        if((kxs == null) && (msg[0] != Packets.SSH_MSG_KEXINIT)) {
            throw new PacketTypeException(msg[0]);
        }

        if(ignore_next_kex_packet) {
            ignore_next_kex_packet = false;
            return;
        }

        if(msg[0] == Packets.SSH_MSG_KEXINIT) {
            if((kxs != null) && (kxs.state != 0)) {
                throw new PacketTypeException(msg[0]);
            }

            if(kxs == null) {
                /*
                 * Ah, OK, peer wants to do KEX. Let's be nice and play
				 * together.
				 */
                kxs = new KexState();
                kxs.local_dsa_key = nextKEXdsakey;
                kxs.local_rsa_key = nextKEXrsakey;
                kxs.dhgexParameters = nextKEXdhgexParameters;
                kip = new PacketKexInit(nextKEXcryptoWishList, rnd);
                kxs.localKEX = kip;
                tm.sendKexMessage(kip.getPayload());
            }

            kip = new PacketKexInit(msg);
            kxs.remoteKEX = kip;

            kxs.np = mergeKexParameters(kxs.remoteKEX.getKexParameters(), kxs.localKEX.getKexParameters());

            if(kxs.remoteKEX.isFirst_kex_packet_follows() && (kxs.np.guessOK == false)) {
                // Guess was wrong, we need to ignore the next kex packet.
                ignore_next_kex_packet = true;
            }

            if(kxs.np.kex_algo.equals("diffie-hellman-group1-sha1")
                    || kxs.np.kex_algo.equals("diffie-hellman-group14-sha1")) {
                kxs.dhx = new DhExchange();

                if(kxs.np.kex_algo.equals("diffie-hellman-group1-sha1")) {
                    kxs.dhx.serverInit(1, rnd);
                }
                else {
                    kxs.dhx.serverInit(14, rnd);
                }

                kxs.state = 1;
                return;
            }

            throw new IllegalStateException("Unkown KEX method!");
        }

        if(msg[0] == Packets.SSH_MSG_NEWKEYS) {
            if(km == null) {
                throw new IOException("Peer sent SSH_MSG_NEWKEYS, but I have no key material ready!");
            }

            BlockCipher cbc;
            MAC mac;

            try {
                cbc = BlockCipherFactory.createCipher(kxs.np.enc_algo_client_to_server, false,
                        km.enc_key_client_to_server, km.initial_iv_client_to_server);

                try {
                    mac = new MAC(kxs.np.mac_algo_client_to_server, km.integrity_key_client_to_server);
                }
                catch(DigestException e) {
                    throw new IOException(e);
                }

            }
            catch(IllegalArgumentException e) {
                throw new IOException(e);
            }

            tm.changeRecvCipher(cbc, mac);

            ConnectionInfo sci = new ConnectionInfo();

            kexCount++;

            sci.keyExchangeAlgorithm = kxs.np.kex_algo;
            sci.keyExchangeCounter = kexCount;
            sci.clientToServerCryptoAlgorithm = kxs.np.enc_algo_client_to_server;
            sci.serverToClientCryptoAlgorithm = kxs.np.enc_algo_server_to_client;
            sci.clientToServerMACAlgorithm = kxs.np.mac_algo_client_to_server;
            sci.serverToClientMACAlgorithm = kxs.np.mac_algo_server_to_client;
            sci.serverHostKeyAlgorithm = kxs.np.server_host_key_algo;
            sci.serverHostKey = kxs.remote_hostkey;

            synchronized(accessLock) {
                lastConnInfo = sci;
                accessLock.notifyAll();
            }

            kxs = null;
            return;
        }

        if((kxs == null) || (kxs.state == 0)) {
            throw new IOException("Unexpected Kex submessage!");
        }

        if(kxs.np.kex_algo.equals("diffie-hellman-group1-sha1")
                || kxs.np.kex_algo.equals("diffie-hellman-group14-sha1")) {
            if(kxs.state == 1) {
                PacketKexDHInit dhi = new PacketKexDHInit(msg);

                kxs.dhx.setE(dhi.getE());

                byte[] hostKey = null;

                if(kxs.np.server_host_key_algo.equals("ssh-rsa")) {
                    hostKey = RSASHA1Verify.encodeSSHRSAPublicKey(kxs.local_rsa_key.getPublicKey());
                }

                if(kxs.np.server_host_key_algo.equals("ssh-dss")) {
                    hostKey = DSASHA1Verify.encodeSSHDSAPublicKey(kxs.local_dsa_key.getPublicKey());
                }

                try {
                    kxs.H = kxs.dhx.calculateH(csh.getClientString(), csh.getServerString(),
                            kxs.remoteKEX.getPayload(), kxs.localKEX.getPayload(), hostKey);
                }
                catch(IllegalArgumentException e) {
                    throw new IOException("KEX error.", e);
                }

                kxs.K = kxs.dhx.getK();

                byte[] signature = null;

                if(kxs.np.server_host_key_algo.equals("ssh-rsa")) {
                    RSASignature rs = RSASHA1Verify.generateSignature(kxs.H, kxs.local_rsa_key);
                    signature = RSASHA1Verify.encodeSSHRSASignature(rs);
                }

                if(kxs.np.server_host_key_algo.equals("ssh-dss")) {
                    DSASignature ds = DSASHA1Verify.generateSignature(kxs.H, kxs.local_dsa_key, rnd);
                    signature = DSASHA1Verify.encodeSSHDSASignature(ds);
                }

                PacketKexDHReply dhr = new PacketKexDHReply(hostKey, kxs.dhx.getF(), signature);
                tm.sendKexMessage(dhr.getPayload());

                finishKex(false);
                kxs.state = -1;

                if(authenticationStarted == false) {
                    authenticationStarted = true;
                    state.am = new ServerAuthenticationManager(state);
                }

                return;
            }
        }
        throw new IllegalStateException(String.format("Unknown KEX method %s", kxs.np.kex_algo));
    }
}
