package ch.ethz.ssh2.sftp;

/**
 * @version $Id: AceType.java 151 2014-04-28 10:03:39Z dkocher@sudo.ch $
 */
public final class AceType {

    private AceType() {
    }

    private static final int ACE4_ACCESS_ALLOWED_ACE_TYPE = 0x00000000;
    private static final int ACE4_ACCESS_DENIED_ACE_TYPE = 0x00000001;
    private static final int ACE4_SYSTEM_AUDIT_ACE_TYPE = 0x00000002;
    private static final int ACE4_SYSTEM_ALARM_ACE_TYPE = 0x00000003;

}
