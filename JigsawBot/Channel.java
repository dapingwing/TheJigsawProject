import java.io.IOException;
import java.io.PrintStream;


public class Channel {
	private String channel;
	private IRCConnection con;
	
	public Channel(String channel, IRCConnection con) throws IOException {
		this.channel = channel;
		this.con = con;
		con.write("JOIN " + channel + "\r\n");
        con.flush( );
	}
	
	public void sendMessage(String message) throws IOException {
		con.write("PRIVMSG " + channel + " :" + message + "\r\n");
		con.flush();
	}
}	
