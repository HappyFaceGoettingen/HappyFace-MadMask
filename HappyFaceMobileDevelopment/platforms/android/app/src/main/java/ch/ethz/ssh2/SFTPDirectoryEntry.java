package ch.ethz.ssh2;

/**
 * @version $Id: SFTPDirectoryEntry.java 151 2014-04-28 10:03:39Z dkocher@sudo.ch $
 */
public interface SFTPDirectoryEntry {

    public String getFilename();

    public SFTPFileAttributes getAttributes();

}
