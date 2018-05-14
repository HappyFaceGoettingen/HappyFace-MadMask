/*
 * Copyright (c) 2011 David Kocher. All rights reserved.
 * Please refer to the LICENSE.txt for licensing details.
 */
package ch.ethz.ssh2;

/**
 * @version $Id: PacketListener.java 151 2014-04-28 10:03:39Z dkocher@sudo.ch $
 */
public interface PacketListener {
    void read(String packet);

    void write(String packet);
}
