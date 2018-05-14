package ch.ethz.ssh2;

/**
 * @version $Id: SFTPFileAttributes.java 151 2014-04-28 10:03:39Z dkocher@sudo.ch $
 */
public interface SFTPFileAttributes {

    boolean isDirectory();

    boolean isRegularFile();

    boolean isSymlink();

    byte[] toBytes();
}
