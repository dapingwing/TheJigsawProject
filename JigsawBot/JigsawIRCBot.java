import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.LinkedList;


public class JigsawIRCBot {
	//Persistent data
	private static LinkedList<Idea> idealist;
	private static LinkedList<Bug> buglist;
	private static LinkedList<Category> catlist;
	private static LinkedList<User> userlist;
	private static String jigver;
	private static final String jigsawname = "Jigsaw-Bot";
	
	private static IRCConnection con;		//IRC Connection
	private static Channel chan;			//IRC Channel

	public static void main(String[] args) throws UnknownHostException, IOException {
		idealist = new LinkedList<Idea>();
		buglist = new LinkedList<Bug>();
		catlist = new LinkedList<Category>();
		userlist = new LinkedList<User>();
		jigver = "0";
		
		//read in jigsaw version
		File file = new File("jigdata.txt"); 
		if (!file.exists())
			file.createNewFile();
		FileReader jigverreader = new FileReader("jigdata.txt");
		BufferedReader reader = new BufferedReader(jigverreader);
		String jd;
		while ((jd = reader.readLine()) != null) {
			jigver = jd;
		}
		reader.close();
		
		//read in Idea, Bug and User lists
		readPersistentLists();
		readUserList();
		
		//establish IRC connection
		con = new IRCConnection("irc.freenode.net", jigsawname, "JBot");
		con.connect();
		
		//connect to channel
		chan = con.getChannel("#PKAAE");
		chan.getOp(jigsawname);
		String line;
		String rline;
		
		//Constantly read in data from socket
		//TO-DO: cut off leading junk on PRIVMSG for speed. Currently no point
		//Check for keywords, parse strings and execute corresponding commands
		while ((rline = con.readLine()) != null) {
			line = rline;
			try {
            if (rline.toUpperCase().startsWith("PING ")) {
                con.write("PONG " + line.substring(5) + "\r\n");
                con.flush();
            } else if (line.contains("353") && !line.contains("PRIVMSG")) {
            	parseUsersOnLogin(line);
            } else if (line.contains("JOIN") && !line.contains("PRIVMSG")) {
            	parseJoin(line);
            	notifyUsers();
            } else if (line.contains("QUIT") && !line.contains("PRIVMSG")) {
            	parseQuit(line);
            } else if (line.contains("NICK") && !line.contains("PRIVMSG")) {
            	parseNick(line);
            } else if (line.contains("!ignore")) {
            	continue;
            } else if (line.contains("!jigver")) {
            	jigver();
            } else if (line.contains("!changever")) {
            	changever(line);
            } else if (line.contains("!help global")) {
            	help (true, line);
            } else if (line.contains("!help")) {
            	help(false, line);
            } else if (line.contains("!idealist")) {
            	idealist();
            } else if (line.contains("!buglist")) {
            	buglist();
            } else if (line.contains("!userlist")) {
            	userlist();
            } else if (line.contains("!ridea")) { 
            	ridea(line);
            } else if (line.contains("!rbug")) { 
            	rbug(line);
        	} else if (line.contains("!idea")) {
            	idea(line);
            } else if (line.contains("!bug")) {
            	bug(line);
            } else if (line.contains("!addcat")) {
            	addCat(line);
            } else if (line.contains("!catlist")) {
            	catlist();
            } else if (line.contains("!rcat")) {
            	rcat(line);
            } else if (line.contains("!P")) {
            	coordLink(line);
            }
            FileWriter logfile = new FileWriter("log.txt", true);
            BufferedWriter log = new BufferedWriter(logfile);
            // Print the raw line received by the bot.
            System.out.println(rline);
            log.write(rline + "\r\n");
            log.close();
            
			} catch (StringIndexOutOfBoundsException e) {
				chan.sendMessage("You made a syntax error, pay more attention!");
			} catch (IOException ex) {
				chan.sendMessage("An IO error occured. This will likely cause data persistence problems");
				System.err.println("An IO error occured: " + ex.getStackTrace());
			}
        }
		
	}
	
	private static void coordLink(String line) throws IOException {
		int i = line.indexOf("!P");
		int j = line.indexOf(" ", i);
		String coord;
		if (j != -1) 
			coord = line.substring(i+1, j);
		else
			coord = line.substring(i+1);
		try {
			int gal;
			int reg;
			int sys;
			int astro;
			
			j = coord.indexOf(":");
			if (j != -1) {
				gal = Integer.parseInt(coord.substring(1, j));
				if (gal > 59 || gal < 0)
					throw new NumberFormatException();
			} else {
				gal = Integer.parseInt(coord.substring(1));
				if (gal > 59 || gal < 0) {
					throw new NumberFormatException();
				} else {
					chan.sendMessage("http://pegasus.astroempires.com/map.aspx?gal=" + coord);
					return;
				}
			}
			i = j+1;
			j = coord.indexOf(":", i);
			if (j != -1) {
				reg = Integer.parseInt(coord.substring(i, j));
				if (reg > 99 || reg < 0)
					throw new NumberFormatException();
			} else {
				reg = Integer.parseInt(coord.substring(i));
				if (reg > 99 || reg < 0) {
					throw new NumberFormatException();
				} else {
					chan.sendMessage("http://pegasus.astroempires.com/map.aspx?loc=" + coord);
					return;
				}
			}
			i = j+1;
			j = coord.indexOf(":", i);
			if (j != -1) {
				sys = Integer.parseInt(coord.substring(i, j));
				if (sys > 99 || sys < 0)
					throw new NumberFormatException();
			} else {
				sys = Integer.parseInt(coord.substring(i));
				if (sys > 99 || sys < 0) {
					throw new NumberFormatException();
				} else {
					chan.sendMessage("http://pegasus.astroempires.com/map.aspx?loc=" + coord);
					return;
				}
			}
			i = j+1;
			astro = Integer.parseInt(coord.substring(i));
			if (astro > 53 || astro < 10) 
				throw new NumberFormatException();
			else
				chan.sendMessage("http://pegasus.astroempires.com/map.aspx?loc=" + coord);
		} catch (StringIndexOutOfBoundsException e) {
			chan.sendMessage("This does not match any coord patterns");
		} catch (NumberFormatException fe) {
			chan.sendMessage("Coords need valid numbers. Got something that didn't match");
		}
	}
	
	//Notfiy all users currently online of a jigsaw change
	private static void notifyUsers() throws IOException {
		for (int i=0; i<userlist.size(); i++) {
			if (userlist.get(i).online && !userlist.get(i).getKnownVersion().equals(jigver)) {
				chan.sendMessage(userlist.get(i).getName() + " The Jigsaw version has changed to " + jigver + " since you were last on");
				userlist.get(i).setKnownVersion(jigver);
			}
		}
		writeUserList();
	}
	
	//Change the jigsaw version, updating everyone currently online
	private static void changever(String line) throws IOException {
		String name = getUserName(line);
		if (!name.equals("MadDutchman") && !name.equals("dapingwing") &&
				!name.equals("@MadDutchman") && !name.equals("@dapingwing")) {
			chan.sendMessage("You don't have permission to do that");
			return;
		}
			
		int i = line.indexOf("!changever");
		i = line.indexOf("\"", i);
		int j = line.indexOf("\"", i+1);
		jigver = line.substring(i+1, j);
		
		FileWriter jigwriter = new FileWriter("jigdata.txt");
		BufferedWriter writer = new BufferedWriter(jigwriter);
		writer.write(jigver);
		chan.sendMessage("Jigsaw Version Changed to: " + jigver);
		for (int k=0; k<userlist.size(); k++) {
			if (userlist.get(k).online)
				userlist.get(k).setKnownVersion(jigver);
		}
		writer.close();
		writeUserList();
	}
	
	//display the jigsaw version
	private static void jigver() throws IOException {
		chan.sendMessage("Current Jigsaw Version: " + jigver);
	}
	
	//When a user quits, set them to offline
	private static void parseQuit(String line) throws IOException {
		String name;
		int i = line.indexOf("!");
		name = line.substring(1, i);
		for (int k=0; k<userlist.size(); k++) {
			if (userlist.get(k).getName().equals(name)) {
				userlist.get(k).online = false;
				break;
			}	
		}
	}
	
	private static void parseNick(String line) throws IOException {
		String name = getUserName(line);
		String newname;
		int i = line.indexOf("NICK");
		i = line.indexOf(":", i);
		newname = line.substring(i+1);
		boolean hasuser = false;
		for (int k=0; k<userlist.size(); k++) {
			if (userlist.get(k).getName().equals(newname)) {
				hasuser = true;
				userlist.get(k).online = true;
			}	
			if (userlist.get(k).getName().equals(name))
				userlist.get(k).online = false;
		}
		if (!hasuser) {
			userlist.add(0, new User(newname, "0"));
			userlist.get(0).online = true;
		}
		writeUserList();
	}
	
	//When a user joins, check to see if they are already on the userlist, and add them if not. 
	private static void parseJoin(String line) throws IOException {
		String name = getUserName(line);
		if (!name.equals(jigsawname)) {
			chan.sendMessage("Welcome " + name + " to the PKA's private IRC channel. For a list of currently supported Bot commands, type" +
				" !help and I will send you a pm with the list.");
			chan.sendMessage("To get the attention of anyone in a channel, simply say their name exactly and most clients will" +
				" give an audible ping to them. ");
		}
		boolean hasuser = false;
		for (int k=0; k<userlist.size(); k++) {
			if (userlist.get(k).getName().equals(name)) {
				hasuser = true;
				userlist.get(k).online = true;
			}	
		}
		if (!hasuser) {
			userlist.add(0, new User(name, "0"));
			userlist.get(0).online = true;
		}
		writeUserList();
	}
	
	//When bot logs on, get the list of currently online users.  
	private static void parseUsersOnLogin(String line) throws IOException {
		String name;
		int i = line.indexOf(":", 1);
		int j = line.indexOf(" ", i);
		while (j != -1) {
			name = line.substring(i+1, j);
			boolean hasuser = false;
			for (int k=0; k<userlist.size(); k++) {
				if (userlist.get(k).getName().equals(name)) {
					hasuser = true;
					userlist.get(k).online = true;
				}	
			}
			if (!hasuser) {
				userlist.add(new User(name, "0", true));
			}
			i = j;
			j = line.indexOf(" ", i+1);
		}
		name = line.substring(i+1);
		boolean hasuser = false;
		for (int k=0; k<userlist.size(); k++) {
			if (userlist.get(k).getName().equals(name)) {
				hasuser = true;
				userlist.get(k).online = true;
			}	
		}
		if (!hasuser) {
			userlist.add(new User(name, "0", true));
		}
		writeUserList();
	}
	
	//Adds a new category
	private static void addCat(String line) throws IOException {
		catlist.add(parseCat(line));
		writePersistentLists();
		chan.sendMessage("New category added");
	}
	
	//adds a new bug
	private static void bug(String line) throws IOException {
		Bug bug = parseBug(line);
		if (bug != null) {
			buglist.add(bug);
			writePersistentLists();
			chan.sendMessage("Bug report recieved");
		} else {
			chan.sendMessage("That category doesn't exist. Add it with !addcat");
		}
	}
	
	//adds a new idea
	private static void idea(String line) throws IOException {
		Idea idea = parseIdea(line);
		if (idea != null) {
			idealist.add(idea);
			writePersistentLists();
			chan.sendMessage("Idea saved.");
		} else {
			chan.sendMessage("That category doesn't exist, Add it with !addcat");
		}
	}
	
	//removes a category. Deletes all dependant ideas/bugs
	private static void rcat(String line) throws IOException {
		String name;
    	boolean removed = false;
    	int i = line.indexOf("\"", 0) + 1;
		int j = line.indexOf("\"", i+1);
		if (i == 0) {
			try {
				i = line.indexOf("!rcat");
				i = line.indexOf(" ", i);
				j = line.indexOf(" ", i+1);
				int index;
				if (j == -1)
					index = Integer.parseInt(line.substring(i+1));
				else 
					index = Integer.parseInt(line.substring(i+1, j));
				for (int x=0; x<idealist.size(); x++) {
					if (idealist.get(x).getCategory().equals(catlist.get(index).getName())) {
						idealist.remove(x);
						//System.out.println("idea removed: " + idealist.size());
					}
				}
				for (int x=0; x<buglist.size(); x++) {
					if (buglist.get(x).getCategory().equals(catlist.get(index).getName()))
						buglist.remove(x);
				}
				catlist.remove(index);
				chan.sendMessage("Category removed at index " + index);
				writePersistentLists();
				return;
				} catch (NumberFormatException | IndexOutOfBoundsException ex) {
					chan.sendMessage("That is not a proper index or name, or the index is out of bounds");
				}
		}
		name = line.substring(i, j);
		for (int k=0; k<catlist.size(); k++) {
			if (catlist.get(k).getName().equals(name)) {
				for (int x=0; x<idealist.size(); x++) {
					if (idealist.get(x).getCategory().equals(catlist.get(k).getName()))
						idealist.remove(x);
				}
				for (int x=0; x<buglist.size(); x++) {
					if (buglist.get(x).getCategory().equals(catlist.get(k).getName()))
						buglist.remove(x);
				}
				catlist.remove(k);
				removed = true;
				chan.sendMessage("Category removed from list");
			}
		}
		if (!removed)
			chan.sendMessage("no categories present with that name");
		writePersistentLists();
	}
	
	//removes a bug
	private static void rbug(String line) throws IOException {
		String name;
    	boolean removed = false;
    	int i = line.indexOf("\"", 0) + 1;
		int j = line.indexOf("\"", i+1);
		if (i == 0) {
			try {
				i = line.indexOf("!rbug");
				i = line.indexOf(" ", i);
				j = line.indexOf(" ", i+1);
				int index;
				if (j == -1)
					index = Integer.parseInt(line.substring(i+1));
				else 
					index = Integer.parseInt(line.substring(i+1, j));
				buglist.remove(index);
				chan.sendMessage("Bug removed at index " + index);
				writePersistentLists();
				return;
				} catch (NumberFormatException | IndexOutOfBoundsException ex) {
					chan.sendMessage("That is not a proper index or name, or the index is out of bounds");
				}
		}
		name = line.substring(i, j);
		for (int k=0; k<buglist.size(); k++) {
			if (buglist.get(k).getName().equals(name)) {
				buglist.remove(k);
				removed = true;
				chan.sendMessage("bug removed from list");
			}
		}
		if (!removed)
			chan.sendMessage("no bugs present with that name");
		writePersistentLists();
	}
	
	//removes an idea
	private static void ridea(String line) throws IOException {
		String name;
    	boolean removed = false;
    	int i = line.indexOf("\"", 0) + 1;
		int j = line.indexOf("\"", i+1);
		if (i == 0) {
			try {
				i = line.indexOf("!ridea");
				i = line.indexOf(" ", i);
				j = line.indexOf(" ", i+1);
				int index;
				if (j == -1)
					index = Integer.parseInt(line.substring(i+1));
				else 
					index = Integer.parseInt(line.substring(i+1, j));
				idealist.remove(index);
				chan.sendMessage("Idea removed at index " + index);
				writePersistentLists();
				return;
				} catch (NumberFormatException | IndexOutOfBoundsException ex) {
					chan.sendMessage("That is not a proper index or name, or the index is out of bounds");
				}
		}
		name = line.substring(i, j);
		for (int k=0; k<idealist.size(); k++) {
			if (idealist.get(k).getName().equals(name)) {
				idealist.remove(k);
				removed = true;
				chan.sendMessage("idea removed from list");
			}
		}
		if (!removed)
			chan.sendMessage("no ideas present with that name");
		writePersistentLists();
	}
	
	//display the list of users and their current known version
	private static void userlist() throws IOException {
		for (int i=0; i<userlist.size(); i++) 
			chan.sendMessage(userlist.get(i).getName() + " Notified Jigsaw Version: " + userlist.get(i).getKnownVersion());
	}
	
	//display the list of categories
	private static void catlist() throws IOException {
		readPersistentLists();
    	if (catlist.size() == 0)
    		chan.sendMessage("There are currently no saved categories");
    	else 
    		for (int i=0; i<catlist.size(); i++) 
    			chan.sendMessage(i + ": " + catlist.get(i).getName() + " | " + catlist.get(i).getDescription());
	}
	
	//display the current list of bugs
	private static void buglist() throws IOException {
		readPersistentLists();
    	if (buglist.size() == 0)
    		chan.sendMessage("There are no bugs reported at this time");
    	else 
    		for (int i=0; i<buglist.size(); i++) 
    			chan.sendMessage(i + ": [" + buglist.get(i).getCategory() + "] | " + buglist.get(i).getName() + " | " + buglist.get(i).getDescription());
	}
	
	//display the current list of ideas
	private static void idealist() throws IOException {
		readPersistentLists();
    	if (idealist.size() == 0)
    		chan.sendMessage("I'm out of ideas!");
    	else
    		for (int i=0; i<idealist.size(); i++) 
    			chan.sendMessage(i + ": [" + idealist.get(i).getCategory() + "] | " + idealist.get(i).getName() + " | " + idealist.get(i).getDescription());
	}
	
	//spams the command list
	private static void help(boolean global, String line) throws IOException {
		if (global) {
			chan.sendMessage("Command List:");
			chan.sendMessage("!help : Prints this help list in pm");
			chan.sendMessage("!help global : Prints this help message in main channel");
			chan.sendMessage("!ignore : ignores any other commands that may be on the line. Useful if all you want to do is talk about them");
			chan.sendMessage("!idea [category] \"name\" \"description\" || !idea index \"name\" \"description\" : Saves an idea with given category, name and description");
			chan.sendMessage("!bug [category] \"name\" \"description\" || !idea index \"name\" \"description\" : Saves a bug report with the given category, name and description");
			chan.sendMessage("!addcat \"name\" \"description\" : Adds a new category");
			chan.sendMessage("!ridea \"name\" || !ridea index : Removes an idea with the given name or integer index");
			chan.sendMessage("!rbug \"name\" || !ridea index : Removes a bug report with the given name or index");
			chan.sendMessage("!rcat \"name\" || !rcat index : Removes a category at specified name or index, and all dependant ideas/bugs");
			chan.sendMessage("!idealist : Prints out the current list of ideas");
			chan.sendMessage("!buglist : Prints out the current list of bugs");
			chan.sendMessage("!catlist : Prints out the current list of idea/bug categories");
			chan.sendMessage("!jigver : The current jigsaw version");
			chan.sendMessage("!changever \"version\" : Change the jigsaw version");
			chan.sendMessage("!Pxx:xx:xx:xx (or other coord combo, should work for any valid) : prints a link to the coords posted"); 
		} else {
			Channel pm = con.getChannel(getUserName(line));
			pm.sendMessage("Command List:");
			pm.sendMessage("!help : Prints this help list");
			pm.sendMessage("!help global : Prints this help message in main channel");
			pm.sendMessage("!Pxx:xx:xx:xx (or other coord combo, should work for any valid) : prints a link to the coords posted"); 
			pm.sendMessage("!ignore : ignores any other commands that may be on the line. Useful if all you want to do is talk about them");
			pm.sendMessage("!idea [category] \"name\" \"description\" || !idea index \"name\" \"description\" : Saves an idea with given category, name and description");
			pm.sendMessage("!bug [category] \"name\" \"description\" || !idea index \"name\" \"description\" : Saves a bug report with the given category, name and description");
			pm.sendMessage("!addcat \"name\" \"description\" : Adds a new category");
			pm.sendMessage("!ridea \"name\" || !ridea index : Removes an idea with the given name or integer index");
			pm.sendMessage("!rbug \"name\" || !ridea index : Removes a bug report with the given name or index");
			pm.sendMessage("!rcat \"name\" || !rcat index : Removes a category at specified name or index, and all dependant ideas/bugs");
			pm.sendMessage("!idealist : Prints out the current list of ideas");
			pm.sendMessage("!buglist : Prints out the current list of bugs");
			pm.sendMessage("!catlist : Prints out the current list of idea/bug categories");
			pm.sendMessage("!jigver : The current jigsaw version");
			pm.sendMessage("!changever \"version\" : Change the jigsaw version");
			
		}
	}
	
	private static String getUserName(String line) {
		return line.substring(1, line.indexOf("!"));
	}
	
	//parse category
	private static Category parseCat(String line) {
		String name;
		String descrp; 
		int i = line.indexOf("\"", 0) + 1;
		int j = line.indexOf("\"", i+1);
		name = line.substring(i, j);
		
		i = line.indexOf("\"", j+1) + 1;
		j = line.indexOf("\"", i+1);
		descrp = line.substring(i, j);
		return new Category(name, descrp);
	}
	
	//parse idea command and saves
	private static Idea parseIdea(String line) throws IOException {
		String name;
		String descrp; 
		String category = "";
		int a = line.indexOf("[");
		try {
		if (a == -1) {
			int c = line.indexOf("!idea");
			c = line.indexOf(" ", c+1);
			int d = line.indexOf(" ", c+1);
			int index = Integer.parseInt(line.substring(c+1, d));
			category = catlist.get(index).getName();
		} else {
			int b = line.indexOf("]");
			category = line.substring(a+1, b);
		}
		} catch (NumberFormatException | IndexOutOfBoundsException ex) {
			chan.sendMessage("That is not a proper index or name, or the index is out of bounds");
		}
		boolean hascat = false;
		for (int x=0; x<catlist.size(); x++) {
			if (catlist.get(x).getName().equals(category)) {
				hascat = true;
				break;
			}
		}
		if (!hascat)
			return null;
		
		int i = line.indexOf("\"", 0) + 1;
		int j = line.indexOf("\"", i+1);
		name = line.substring(i, j);
		
		i = line.indexOf("\"", j+1) + 1;
		j = line.indexOf("\"", i+1);
		descrp = line.substring(i, j);
		return new Idea(category, name, descrp);
	}
	
	//parse bug command and saves
	private static Bug parseBug(String line) throws IOException {
		String name;
		String descrp; 
		String category = "";
		int a = line.indexOf("[");
		try {
			if (a == -1) {
				int c = line.indexOf("!bug");
				c = line.indexOf(" ", c+1);
				int d = line.indexOf(" ", c+1);
				int index = Integer.parseInt(line.substring(c+1, d));
				category = catlist.get(index).getName();
			} else {
				int b = line.indexOf("]");
				category = line.substring(a+1, b);
			}
		} catch (NumberFormatException | IndexOutOfBoundsException ex) {
				chan.sendMessage("That is not a proper index or name, or the index is out of bounds");
		}
		boolean hascat = false;
		for (int x=0; x<catlist.size(); x++) {
			if (catlist.get(x).getName().equals(category)) {
				hascat = true;
				break;
			}
		}
		if (!hascat)
			return null;
		
		int i = line.indexOf("\"", 0) + 1;
		int j = line.indexOf("\"", i+1);
		name = line.substring(i, j);
		
		i = line.indexOf("\"", j+1) + 1;
		j = line.indexOf("\"", i+1);
		descrp = line.substring(i, j);
		return new Bug(category, name, descrp);
	}
	
	//read in the list of users from file
	private static void readUserList() throws IOException {
		String line;
		File file = new File("userlist.txt");
		if (!file.exists()) 
			file.createNewFile();
		
		FileReader userfile = new FileReader("userlist.txt");
		BufferedReader reader = new BufferedReader(userfile);
		
		while ((line = reader.readLine()) != null) {
			int i = line.indexOf(" ");
			String name = line.substring(0, i);
			boolean hasuser = false;
			for (int k=0; k<userlist.size(); k++) {
				if (userlist.get(k).getName().equals(name)) {
					hasuser = true;
					break;
				}	
			}
			if (!hasuser) {
				userlist.add(new User(name, line.substring(i+1)));
			}
		}
		reader.close();
	}
	
	//write out the userlist
	private static void writeUserList() throws IOException {
		FileWriter userwriter = new FileWriter("userlist.txt");
		BufferedWriter writer = new BufferedWriter(userwriter);
		
		for (int i=0; i<userlist.size(); i++) {
			writer.write(userlist.get(i).getName() + " " + userlist.get(i).getKnownVersion() + "\r\n");
		}
		writer.close();
	}
	
	//reades in the idea, user and category lists
	private static void readPersistentLists() throws IOException {
		String line;
		File file = new File("idealist.txt");
		if (!file.exists())
			file.createNewFile();
		file = new File("buglist.txt");
		if (!file.exists())
			file.createNewFile();
		file = new File("catlist.txt");
		if (!file.exists())
			file.createNewFile();
		FileReader ideafile = new FileReader("idealist.txt");
		FileReader bugfile = new FileReader("buglist.txt");
		FileReader catfile = new FileReader ("catlist.txt");
	    BufferedReader reader = new BufferedReader(catfile);
	    while ((line = reader.readLine()) != null) {
	    	Category cat = parseCat(line);
	    	if (!contains(cat))
	    		catlist.add(parseCat(line));
	    }
	    reader.close();
	    reader = new BufferedReader(ideafile);
	    while ((line = reader.readLine()) != null) {
	    	Idea idea = parseIdea(line);
	    	if (!contains(idea))
	    		idealist.add(idea);
	    }
	    reader.close();
	    reader = new BufferedReader(bugfile);
	    while ((line = reader.readLine()) != null) {
	    	Bug bug = parseBug(line);
	    	if (!contains(bug))
	    		buglist.add(parseBug(line));
	    }
	    reader.close();
	    
	}
	
	//writes out the idea, bug and category lists
	private static void writePersistentLists() throws IOException {
		FileWriter ideawriter = new FileWriter("idealist.txt");
	    FileWriter bugwriter = new FileWriter("buglist.txt");
	    FileWriter catwriter = new FileWriter("catlist.txt");
	    BufferedWriter writer = new BufferedWriter(ideawriter);
	    for (int i=0; i<idealist.size(); i++)
	    	writer.write("!idea [" + idealist.get(i).getCategory() + "] \"" + idealist.get(i).getName() + "\" \"" + idealist.get(i).getDescription() + "\"\r\n");
	    writer.close();
	    writer = new BufferedWriter(bugwriter);
	    for (int i=0; i<buglist.size(); i++)
	    	writer.write("!bug [" + buglist.get(i).getCategory() + "] \"" + buglist.get(i).getName() + "\" \"" + buglist.get(i).getDescription() + "\"\r\n");
	    writer.close();
	    writer = new BufferedWriter(catwriter);
	    for (int i=0; i<catlist.size(); i++)
	    	writer.write("!cat \"" + catlist.get(i).getName() + "\" \"" + catlist.get(i).getDescription() + "\"\r\n");
	    writer.close();
	}
	
	//if the idea is contained idealist. safer than using List.contains
	private static boolean contains(Idea idea) {
		for (int i=0; i<idealist.size(); i++) {
			if (idealist.get(i).equals(idea))
				return true;
		}
		return false;
	}
	//checks if bug is in buglist
	private static boolean contains(Bug bug) {
		for (int i=0; i<buglist.size(); i++) {
			if (buglist.get(i).equals(bug))
				return true;
		}
		return false;
	}
	//checks if category is in catlist
	private static boolean contains(Category cat) {
		for (int i=0; i<catlist.size(); i++) {
			if (catlist.get(i).equals(cat))
				return true;
		}
		return false;
	}
}
