
public class User {
	private String name;
	private String knownversion;
	public boolean online;
	
	public User(String name, String knownversion) {
		this.name = name;
		this.knownversion = knownversion;
		this.online = false;
	}
	public User(String name, String knownversion, boolean online) {
		this.name = name;
		this.knownversion = knownversion;
		this.online = online;
	}
	
	public String getName() {return name;}
	public String getKnownVersion() {return knownversion;}
	public void setKnownVersion(String version) {knownversion = version;}
	
	public boolean equals(User user) {
		if (this.getName().equals(user.getName()) &&
				this.getKnownVersion().equals(user.getKnownVersion()))
			return true;
		else
			return false;
	}
}
