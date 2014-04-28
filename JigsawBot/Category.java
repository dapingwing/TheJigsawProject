
public class Category {
	private String name;
	private String description;
	
	public Category(String name, String description) {
		this.name = name;
		this.description = description;
	}
	
	public String getName() {return name;}
	public String getDescription() {return description;}
	
	public boolean equals(Category cat) {
		if (this.getName().equals(cat.getName()) &&
				this.getDescription().equals(cat.getDescription()))
			return true;
		else
			return false;
	}
}
