package ch.ethz.ssh2.transport;

import java.io.IOException;

import ch.ethz.ssh2.packets.PacketDisconnect;

/**
 * @version $Id: DisconnectException.java 160 2014-05-01 14:30:26Z dkocher@sudo.ch $
 */
public class DisconnectException extends IOException {

    private PacketDisconnect.Reason reason;

    public DisconnectException(final PacketDisconnect.Reason reason, final String message) {
        super(message);
        this.reason = reason;
    }

    public PacketDisconnect.Reason getReason() {
        return reason;
    }
}
