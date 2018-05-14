/*
 * Copyright (c) 2006-2011 Christian Plattner. All rights reserved.
 * Please refer to the LICENSE.txt for licensing details.
 */
package ch.ethz.ssh2.transport;

import java.io.IOException;

/**
 * @author Christian Plattner
 * @version $Id: MessageHandler.java 160 2014-05-01 14:30:26Z dkocher@sudo.ch $
 */
public interface MessageHandler {
    public void handleMessage(byte[] msg) throws IOException;

    public void handleFailure(IOException failure);
}
