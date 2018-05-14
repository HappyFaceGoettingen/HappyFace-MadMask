/*
 * Copyright (c) 2006-2011 Christian Plattner. All rights reserved.
 * Please refer to the LICENSE.txt for licensing details.
 */
package ch.ethz.ssh2.packets;

import java.math.BigInteger;

/**
 * @author Christian Plattner
 * @version $Id: PacketKexDhGexInit.java 160 2014-05-01 14:30:26Z dkocher@sudo.ch $
 */
public final class PacketKexDhGexInit {

    private final byte[] payload;

    public PacketKexDhGexInit(BigInteger e) {
        TypesWriter tw = new TypesWriter();
        tw.writeByte(Packets.SSH_MSG_KEX_DH_GEX_INIT);
        tw.writeMPInt(e);
        payload = tw.getBytes();
    }

    public byte[] getPayload() {
        return payload;
    }
}
