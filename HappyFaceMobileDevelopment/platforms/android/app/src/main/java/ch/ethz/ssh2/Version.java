package ch.ethz.ssh2;

/**
 * Provides version information from the manifest.
 *
 * @version $Id: Version.java 140 2014-04-15 13:16:25Z dkocher@sudo.ch $
 */
public class Version
{
	public static String getSpecification()
	{
		Package pkg = Version.class.getPackage();
        return (pkg == null) ? "SNAPSHOT" : pkg.getSpecificationVersion() == null ? "SNAPSHOT" : pkg.getSpecificationVersion();
    }

	public static String getImplementation()
	{
		Package pkg = Version.class.getPackage();
        return (pkg == null) ? "SNAPSHOT" : pkg.getImplementationVersion() == null ? "SNAPSHOT" : pkg.getImplementationVersion();
    }

	/**
	 * A simple main method that prints the version and exits
	 */
	public static void main(String[] args)
	{
		System.out.println("Version: " + getSpecification());
		System.out.println("Implementation: " + getImplementation());
	}
}
