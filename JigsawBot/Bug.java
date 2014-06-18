
public class Bug {
	private String category;
	private String name;
	private String description;
	
	public Bug(String category, String name, String description) {
		this.category = category;
		this.name = name;
		this.description = description;
	}
	
	public String getCategory() {return category;}
	public String getName() {return name;}
	public String getDescription() {return description;}
	public boolean equals(Bug bug) {
		if (this.getName().equals(bug.getName()) &&
				this.getDescription().equals(bug.getDescription()) &&
				this.getCategory().equals(bug.getCategory()))
			return true;
		else
			return false;
	}
}
