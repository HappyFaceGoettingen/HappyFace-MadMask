package ch.ethz.ssh2.compression;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Kenny Root
 * @version $Id: CompressionFactory.java 156 2014-04-29 12:02:35Z dkocher@sudo.ch $
 */
public class CompressionFactory {
    static class CompressorEntry {
        String type;
        String compressorClass;

        public CompressorEntry(String type, String compressorClass) {
            this.type = type;
            this.compressorClass = compressorClass;
        }
    }

    private static final List<CompressorEntry> compressors
            = new ArrayList<CompressorEntry>();

    static {
        // Higher priority first
        compressors.add(new CompressorEntry("none", null));
    }

    public static String[] getDefaultCompressorList() {
        String list[] = new String[compressors.size()];
        for(int i = 0; i < compressors.size(); i++) {
            CompressorEntry ce = compressors.get(i);
            list[i] = ce.type;
        }
        return list;
    }

    public static void checkCompressorList(String[] list) {
        for(final String candidate : list) {
            getEntry(candidate);
        }
    }

    public static Compressor createCompressor(String type) {
        try {
            CompressorEntry ce = getEntry(type);
            if(null == ce.compressorClass) {
                return null;
            }
            Class<?> cc = Class.forName(ce.compressorClass);
            return (Compressor) cc.newInstance();
        }
        catch(Exception e) {
            throw new IllegalArgumentException("Cannot instantiate " + type);
        }
    }

    private static CompressorEntry getEntry(String type) {
        for(CompressorEntry ce : compressors) {
            if(ce.type.equals(type)) {
                return ce;
            }
        }
        throw new IllegalArgumentException("Unknown algorithm " + type);
    }
}