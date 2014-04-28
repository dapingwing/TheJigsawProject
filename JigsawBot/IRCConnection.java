import java.util.*;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintStream;
import java.net.Socket;
import java.net.UnknownHostException;


public class IRCConnection {
	 private String server;
	 private String nick;
	 private String login;
	 private int port; 
	 private BufferedWriter writer;
	 private BufferedReader reader;
	 
	 public IRCConnection(String server, String nick, String login) throws UnknownHostException, IOException {
		 this.server = server;
		 this.nick = nick;
		 this.login = login;
		 this.port = 6667;
		 Socket socket = new Socket(server, 6667);
	     writer = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream( )));
	     reader = new BufferedReader(new InputStreamReader(socket.getInputStream( )));
	        
	 }
	 public IRCConnection(String server, String nick, String login, int port) throws UnknownHostException, IOException {
		 this.server = server;
		 this.nick = nick;
		 this.login = login;
		 this.port = port;
		 Socket socket = new Socket(server, port);
	     writer = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream( )));
	     reader = new BufferedReader(new InputStreamReader(socket.getInputStream( )));
	 }
	 
	 public void connect() throws IOException {
		 writer.write("NICK " + nick + "\r\n");
	     writer.write("USER " + login + " 8 * : Jigsaw Bot\r\n");
	     writer.flush();
	     String line = null;
	     while ((line = reader.readLine( )) != null) {
	         if (line.indexOf("004") >= 0) {
	             // We are now logged in.
	             break;
	         }
	         else if (line.indexOf("433") >= 0) {
	            System.out.println("Nickname is already in use.");
	            return;
	         }
	     }
	 }
	 
	 public Channel getChannel(String channel) throws IOException {
		 return new Channel(channel, this);
	 }
	 
	 public String readLine() throws IOException {
		 return reader.readLine();
	 }
	 
	 public void write(String mess) throws IOException {
		 writer.write(mess);
	 }
	 
	 public void flush() throws IOException {
		 writer.flush();
	 }
	 
}
