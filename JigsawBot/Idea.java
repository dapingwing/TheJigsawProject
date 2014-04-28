
public class Idea {
	private String category;
	private String name;
	private String description;
	
	public Idea(String category, String name, String description) {
		this.category = category;
		this.name = name;
		this.description = description;
	}
	
	public String getCategory() {return category;}
	public String getName() {return name;}
	public String getDescription() {return description;}
	public boolean equals(Idea idea) {
		if (this.getName().equals(idea.getName()) &&
				this.getDescription().equals(idea.getDescription()) &&
				this.getCategory().equals(idea.getCategory()))
			return true;
		else
			return false;
	}
}
