package ch.ethz.ssh2;

import java.io.IOException;

/**
 * @version $Id: PacketFormatException.java 151 2014-04-28 10:03:39Z dkocher@sudo.ch $
 */
public class PacketFormatException extends IOException
{

	public PacketFormatException(String message)
	{
		super(message);
	}
}
