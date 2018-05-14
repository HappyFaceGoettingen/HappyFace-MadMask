/*
 * Copyright (c) 2006-2014 Christian Plattner. All rights reserved.
 * Please refer to the LICENSE.txt for licensing details.
 */
package ch.ethz.ssh2.crypto;

import java.io.IOException;

/**
 * @version $Id: PEMDecryptException.java 151 2014-04-28 10:03:39Z dkocher@sudo.ch $
 */
public class PEMDecryptException extends IOException
{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public PEMDecryptException(String message)
	{
		super(message);
	}
}
