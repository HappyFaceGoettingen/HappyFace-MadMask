/*
 * Copyright (c) 2006-2013 Christian Plattner. All rights reserved.
 * Please refer to the LICENSE.txt for licensing details.
 */

package ch.ethz.ssh2.packets;

/**
 * @author Christian Plattner
 * @version $Id: PacketChannelFailure.java 160 2014-05-01 14:30:26Z dkocher@sudo.ch $
 */
public final class PacketChannelFailure {
    private final byte[] payload;

    public PacketChannelFailure(int recipientChannelID) {
        TypesWriter tw = new TypesWriter();
        tw.writeByte(Packets.SSH_MSG_CHANNEL_FAILURE);
        tw.writeUINT32(recipientChannelID);
        payload = tw.getBytes();
    }

    public byte[] getPayload() {
        return payload;
    }
}
