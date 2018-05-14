package ch.ethz.ssh2.transport;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.LineNumberReader;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.Socket;

import ch.ethz.ssh2.HTTPProxyData;
import ch.ethz.ssh2.HTTPProxyException;
import ch.ethz.ssh2.crypto.Base64;
import ch.ethz.ssh2.util.StringEncoder;

/**
 * @version $Id: HTTPProxyClientTransportManager.java 155 2014-04-28 12:01:19Z dkocher@sudo.ch $
 */
public class HTTPProxyClientTransportManager extends ClientTransportManager {

    /**
     * Used to tell the library that the connection shall be established through a proxy server.
     */

    private HTTPProxyData pd;

    private final Socket sock;

    public HTTPProxyClientTransportManager(final Socket socket, final HTTPProxyData pd) {
        super(socket);
        this.sock = socket;
        this.pd = pd;
    }

    @Override
    protected void connect(final String hostname, final int port, final int connectTimeout) throws IOException {

        sock.connect(new InetSocketAddress(pd.proxyHost, pd.proxyPort), connectTimeout);

        // Tell the proxy where we actually want to connect to
        StringBuilder sb = new StringBuilder();

        sb.append("CONNECT ");
        sb.append(hostname);
        sb.append(':');
        sb.append(port);
        sb.append(" HTTP/1.0\r\n");

        if((pd.proxyUser != null) && (pd.proxyPass != null)) {
            String credentials = pd.proxyUser + ":" + pd.proxyPass;
            char[] encoded = Base64.encode(StringEncoder.GetBytes(credentials));
            sb.append("Proxy-Authorization: Basic ");
            sb.append(encoded);
            sb.append("\r\n");
        }

        if(pd.requestHeaderLines != null) {
            for(int i = 0; i < pd.requestHeaderLines.length; i++) {
                if(pd.requestHeaderLines[i] != null) {
                    sb.append(pd.requestHeaderLines[i]);
                    sb.append("\r\n");
                }
            }
        }

        sb.append("\r\n");

        OutputStream out = sock.getOutputStream();

        out.write(StringEncoder.GetBytes(sb.toString()));
        out.flush();

        // Parse the HTTP response

        InputStream in = sock.getInputStream();

        final LineNumberReader reader = new LineNumberReader(new InputStreamReader(in));
        String httpReponse = reader.readLine();

        if(!httpReponse.startsWith("HTTP/")) {
            throw new IOException("The proxy did not send back a valid HTTP response.");
        }

        // "HTTP/1.X XYZ X" => 14 characters minimum

        if((httpReponse.length() < 14) || (httpReponse.charAt(8) != ' ') || (httpReponse.charAt(12) != ' ')) {
            throw new IOException("The proxy did not send back a valid HTTP response.");
        }

        int errorCode;

        try {
            errorCode = Integer.parseInt(httpReponse.substring(9, 12));
        }
        catch(NumberFormatException ignore) {
            throw new IOException("The proxy did not send back a valid HTTP response.");
        }

        if((errorCode < 0) || (errorCode > 999)) {
            throw new IOException("The proxy did not send back a valid HTTP response.");
        }

        if(errorCode != 200) {
            throw new HTTPProxyException(httpReponse.substring(13), errorCode);
        }

        while(reader.readLine() != null) {
            // Read until empty line
        }
    }
}
