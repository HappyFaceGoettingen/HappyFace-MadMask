package ch.ethz.ssh2.compression;

import java.io.IOException;

/**
 * @author Kenny Root
 * @version $Id: Compressor.java 151 2014-04-28 10:03:39Z dkocher@sudo.ch $
 */
public interface Compressor {
    int getBufferSize();

    int compress(byte[] buf, int start, int len, byte[] output) throws IOException;

    byte[] uncompress(byte[] buf, int start, int[] len) throws IOException;
}