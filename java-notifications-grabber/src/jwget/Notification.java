package jwget;

public class Notification {
	public Integer id;
	public String type;
	public String info;
	public String url;
	
	public Notification(Integer id, String type, String info, String url) {
		this.id = id;
		this.type = type;
		this.info = info;
		this.url = url;
	}
	
	public String toString() {
		return id.toString() + "\n" + type + "\n" + info + "\n" + url + "\n"; 
	}
}
