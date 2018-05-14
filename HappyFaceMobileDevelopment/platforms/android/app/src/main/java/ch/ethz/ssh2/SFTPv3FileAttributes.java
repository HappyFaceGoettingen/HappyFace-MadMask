/*
 * Copyright (c) 2006-2011 Christian Plattner. All rights reserved.
 * Please refer to the LICENSE.txt for licensing details.
 */
package ch.ethz.ssh2;

import java.io.IOException;

import ch.ethz.ssh2.packets.TypesReader;
import ch.ethz.ssh2.packets.TypesWriter;
import ch.ethz.ssh2.sftp.AttribFlags;

/**
 * A <code>SFTPv3FileAttributes</code> object represents detail information
 * about a file on the server. Not all fields may/must be present.
 *
 * @author Christian Plattner, plattner@inf.ethz.ch
 * @version $Id: SFTPv3FileAttributes.java 133 2014-04-14 12:26:29Z dkocher@sudo.ch $
 */
public class SFTPv3FileAttributes implements SFTPFileAttributes {
    /**
     * The SIZE attribute. <code>NULL</code> if not present.
     */
    public Long size = null;

    /**
     * The UID attribute. <code>NULL</code> if not present.
     */
    public Integer uid = null;

    /**
     * The GID attribute. <code>NULL</code> if not present.
     */
    public Integer gid = null;

    /**
     * The POSIX permissions. <code>NULL</code> if not present.
     * <p/>
     * Here is a list:
     * <p/>
     * <pre>Note: these numbers are all OCTAL.
     * <p/>
     *  S_IFMT     0170000   bitmask for the file type bitfields
     *  S_IFSOCK   0140000   socket
     *  S_IFLNK    0120000   symbolic link
     *  S_IFREG    0100000   regular file
     *  S_IFBLK    0060000   block device
     *  S_IFDIR    0040000   directory
     *  S_IFCHR    0020000   character device
     *  S_IFIFO    0010000   fifo
     *  S_ISUID    0004000   set UID bit
     *  S_ISGID    0002000   set GID bit
     *  S_ISVTX    0001000   sticky bit
     * <p/>
     *  S_IRWXU    00700     mask for file owner permissions
     *  S_IRUSR    00400     owner has read permission
     *  S_IWUSR    00200     owner has write permission
     *  S_IXUSR    00100     owner has execute permission
     *  S_IRWXG    00070     mask for group permissions
     *  S_IRGRP    00040     group has read permission
     *  S_IWGRP    00020     group has write permission
     *  S_IXGRP    00010     group has execute permission
     *  S_IRWXO    00007     mask for permissions for others (not in group)
     *  S_IROTH    00004     others have read permission
     *  S_IWOTH    00002     others have write permisson
     *  S_IXOTH    00001     others have execute permission
     * </pre>
     */
    public Integer permissions = null;

    /**
     * Last access time of the file.
     * <p/>
     * The atime attribute. Represented as seconds from Jan 1, 1970 in UTC.
     * <code>NULL</code> if not present.
     */
    public Integer atime = null;

    /**
     * The mtime attribute. Represented as seconds from Jan 1, 1970 in UTC.
     * <code>NULL</code> if not present.
     */
    public Integer mtime = null;

    /**
     * Checks if this entry is a directory.
     *
     * @return Returns true if permissions are available and they indicate
     * that this entry represents a directory.
     */
    @Override
    public boolean isDirectory() {
        if(permissions == null) {
            return false;
        }
        return ((permissions & 0040000) == 0040000);
    }

    /**
     * Checks if this entry is a regular file.
     *
     * @return Returns true if permissions are available and they indicate
     * that this entry represents a regular file.
     */
    @Override
    public boolean isRegularFile() {
        if(permissions == null) {
            return false;
        }
        return ((permissions & 0100000) == 0100000);
    }

    /**
     * Checks if this entry is a a symlink.
     *
     * @return Returns true if permissions are available and they indicate
     * that this entry represents a symlink.
     */
    @Override
    public boolean isSymlink() {
        if(permissions == null) {
            return false;
        }
        return ((permissions & 0120000) == 0120000);
    }

    /**
     * Turn the POSIX permissions into a 7 digit octal representation.
     * Note: the returned value is first masked with <code>0177777</code>.
     *
     * @return <code>NULL</code> if permissions are not available.
     */
    public String getOctalPermissions() {
        if(permissions == null) {
            return null;
        }
        String res = Integer.toString(permissions.intValue() & 0177777, 8);

        StringBuilder sb = new StringBuilder();

        int leadingZeros = 7 - res.length();

        while(leadingZeros > 0) {
            sb.append('0');
            leadingZeros--;
        }

        sb.append(res);

        return sb.toString();
    }

    public SFTPv3FileAttributes() {
        //
    }

    /**
     * uint32   valid-attribute-flags
     * byte     type                   always present
     * uint64   size                   if flag SIZE
     * uint64   allocation-size        if flag ALLOCATION_SIZE
     * string   owner                  if flag OWNERGROUP
     * string   group                  if flag OWNERGROUP
     * uint32   permissions            if flag PERMISSIONS
     * int64    atime                  if flag ACCESSTIME
     * uint32   atime-nseconds            if flag SUBSECOND_TIMES
     * int64    createtime             if flag CREATETIME
     * uint32   createtime-nseconds       if flag SUBSECOND_TIMES
     * int64    mtime                  if flag MODIFYTIME
     * uint32   mtime-nseconds            if flag SUBSECOND_TIMES
     * int64    ctime                  if flag CTIME
     * uint32   ctime-nseconds            if flag SUBSECOND_TIMES
     * string   acl                    if flag ACL
     * uint32   attrib-bits            if flag BITS
     * uint32   attrib-bits-valid      if flag BITS
     * byte     text-hint              if flag TEXT_HINT
     * string   mime-type              if flag MIME_TYPE
     * uint32   link-count             if flag LINK_COUNT
     * string   untranslated-name      if flag UNTRANSLATED_NAME
     * uint32   extended-count         if flag EXTENDED
     * extension-pair extensions
     */
    public SFTPv3FileAttributes(final TypesReader tr) throws IOException {
        int flags = tr.readUINT32();
        if((flags & AttribFlags.SSH_FILEXFER_ATTR_SIZE) != 0) {
            this.size = tr.readUINT64();
        }
        if((flags & AttribFlags.SSH_FILEXFER_ATTR_V3_UIDGID) != 0) {
            this.uid = tr.readUINT32();
            this.gid = tr.readUINT32();
        }
        if((flags & AttribFlags.SSH_FILEXFER_ATTR_PERMISSIONS) != 0) {
            this.permissions = tr.readUINT32();
        }
        if((flags & AttribFlags.SSH_FILEXFER_ATTR_V3_ACMODTIME) != 0) {
            this.atime = tr.readUINT32();
            this.mtime = tr.readUINT32();

        }
        if((flags & AttribFlags.SSH_FILEXFER_ATTR_EXTENDED) != 0) {
            int count = tr.readUINT32();
            // Read it anyway to detect corrupt packets
            while(count > 0) {
                tr.readByteString();
                tr.readByteString();
                count--;
            }
        }
    }

    /**
     * The same encoding is used both when returning file
     * attributes from the server and when sending file attributes to the
     * server.
     *
     * @return Encoded attributes
     */
    @Override
    public byte[] toBytes() {
        TypesWriter tw = new TypesWriter();
        int attrFlags = 0;
        if(this.size != null) {
            attrFlags = attrFlags | AttribFlags.SSH_FILEXFER_ATTR_SIZE;
        }
        if((this.uid != null) && (this.gid != null)) {
            attrFlags = attrFlags | AttribFlags.SSH_FILEXFER_ATTR_V3_UIDGID;
        }
        if(this.permissions != null) {
            attrFlags = attrFlags | AttribFlags.SSH_FILEXFER_ATTR_PERMISSIONS;
        }
        if((this.atime != null) && (this.mtime != null)) {
            attrFlags = attrFlags | AttribFlags.SSH_FILEXFER_ATTR_V3_ACMODTIME;
        }
        tw.writeUINT32(attrFlags);
        if(this.size != null) {
            tw.writeUINT64(this.size);
        }

        if((this.uid != null) && (this.gid != null)) {
            tw.writeUINT32(this.uid);
            tw.writeUINT32(this.gid);
        }

        if(this.permissions != null) {
            tw.writeUINT32(this.permissions);
        }

        if((this.atime != null) && (this.mtime != null)) {
            tw.writeUINT32(this.atime);
            tw.writeUINT32(this.mtime);
        }
        return tw.getBytes();
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("SFTPv3FileAttributes{");
        sb.append("size=").append(size);
        sb.append(", uid=").append(uid);
        sb.append(", gid=").append(gid);
        sb.append(", permissions=").append(permissions);
        sb.append(", atime=").append(atime);
        sb.append(", mtime=").append(mtime);
        sb.append('}');
        return sb.toString();
    }
}