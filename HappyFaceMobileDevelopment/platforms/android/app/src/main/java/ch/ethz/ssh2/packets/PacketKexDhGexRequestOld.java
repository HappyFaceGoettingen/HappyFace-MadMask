/*
 * Copyright (c) 2006-2011 Christian Plattner. All rights reserved.
 * Please refer to the LICENSE.txt for licensing details.
 */
package ch.ethz.ssh2.packets;

import ch.ethz.ssh2.DHGexParameters;

/**
 * @author Christian Plattner
 * @version $Id: PacketKexDhGexRequestOld.java 160 2014-05-01 14:30:26Z dkocher@sudo.ch $
 */
public final class PacketKexDhGexRequestOld {

    private final byte[] payload;

    public PacketKexDhGexRequestOld(DHGexParameters para) {
        TypesWriter tw = new TypesWriter();
        tw.writeByte(Packets.SSH_MSG_KEX_DH_GEX_REQUEST_OLD);
        tw.writeUINT32(para.getPref_group_len());
        payload = tw.getBytes();
    }

    public byte[] getPayload() {
        return payload;
    }
}
