/*
 * Copyright (c) 2006-2011 Christian Plattner. All rights reserved.
 * Please refer to the LICENSE.txt for licensing details.
 */
package ch.ethz.ssh2.packets;

import java.io.IOException;

import ch.ethz.ssh2.PacketTypeException;

/**
 * @author Christian Plattner
 * @version $Id: PacketIgnore.java 160 2014-05-01 14:30:26Z dkocher@sudo.ch $
 */
public final class PacketIgnore {
    private final byte[] payload;

    public PacketIgnore(byte[] data) {
        TypesWriter tw = new TypesWriter();
        tw.writeByte(Packets.SSH_MSG_IGNORE);

        if(data != null) {
            tw.writeString(data, 0, data.length);
        }
        else {
            tw.writeString("");
        }
        payload = tw.getBytes();
    }

    public byte[] getPayload() {
        return payload;
    }
}
