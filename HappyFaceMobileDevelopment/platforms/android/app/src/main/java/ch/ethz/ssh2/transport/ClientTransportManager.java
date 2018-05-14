package ch.ethz.ssh2.transport;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.security.SecureRandom;

import ch.ethz.ssh2.DHGexParameters;
import ch.ethz.ssh2.ServerHostKeyVerifier;
import ch.ethz.ssh2.crypto.CryptoWishList;

/**
 * @version $Id: ClientTransportManager.java 151 2014-04-28 10:03:39Z dkocher@sudo.ch $
 */
public class ClientTransportManager extends TransportManager {

    private final Socket sock;

    public ClientTransportManager(final Socket socket) {
        super(socket);
        this.sock = socket;
    }

    public void setTcpNoDelay(boolean state) throws IOException {
        sock.setTcpNoDelay(state);
    }

    public void setSoTimeout(int timeout) throws IOException {
        sock.setSoTimeout(timeout);
    }

    public void connect(String hostname, int port, String softwareversion, CryptoWishList cwl,
                        ServerHostKeyVerifier verifier, DHGexParameters dhgex, int connectTimeout, SecureRandom rnd)
            throws IOException {
        // Establish the TCP connection to the SSH-2 server
        this.connect(hostname, port, connectTimeout);

        // Parse the server line and say hello - important: this information is later needed for the
        // key exchange (to stop man-in-the-middle attacks) - that is why we wrap it into an object
        // for later use.

        ClientServerHello csh = ClientServerHello.clientHello(softwareversion, sock.getInputStream(),
                sock.getOutputStream());

        TransportConnection tc = new TransportConnection(sock.getInputStream(), sock.getOutputStream(), rnd);

        KexManager km = new ClientKexManager(this, csh, cwl, hostname, port, verifier, rnd);
        super.init(tc, km);

        km.initiateKEX(cwl, dhgex, null, null);

        this.startReceiver();
    }

    protected void connect(String hostname, int port, int connectTimeout)
            throws IOException {
        sock.connect(new InetSocketAddress(hostname, port), connectTimeout);
    }
}