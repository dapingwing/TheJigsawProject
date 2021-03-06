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
		try {
			Thread.sleep(500);
		} catch (InterruptedException ie) {
			System.out.println("The sleep was interrupted");
		}
	}
	
	public void getOp(String nick) throws IOException {
		con.write("MODE #PKAAE +o " + nick + "\r\n");
	}
}	
