/*
 * Copyright (c) 2006-2011 Christian Plattner. All rights reserved.
 * Please refer to the LICENSE.txt for licensing details.
 */
package ch.ethz.ssh2.packets;

/**
 * @author Christian Plattner
 * @version $Id: PacketSessionStartShell.java 160 2014-05-01 14:30:26Z dkocher@sudo.ch $
 */
public final class PacketSessionStartShell {
    private final byte[] payload;

    public PacketSessionStartShell(int recipientChannelID, boolean wantReply) {
        TypesWriter tw = new TypesWriter();
        tw.writeByte(Packets.SSH_MSG_CHANNEL_REQUEST);
        tw.writeUINT32(recipientChannelID);
        tw.writeString("shell");
        tw.writeBoolean(wantReply);
        payload = tw.getBytes();
    }

    public byte[] getPayload() {
        return payload;
    }
}
