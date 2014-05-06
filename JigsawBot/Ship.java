import java.util.ArrayList;


public class Ship {
	private String name;
	private String id;
	private ArrayList<Ship> strongvs;
	private ArrayList<Ship> maystvs;
	private ArrayList<Ship> weakvs;
	
	public Ship(String name, String id) {
		this.name = name;
		this.id = id;
		strongvs = new ArrayList<Ship>();
		maystvs = new ArrayList<Ship>();
		weakvs = new ArrayList<Ship>();
	}
	
	public String getName() {return name;}
	public String getID() {return id;}
	public ArrayList<Ship> getStrengths() {
		if (strongvs.size() != 0)
			return strongvs;
		
		if (this.id.equals("FT")) {
			strongvs.add(new Ship("Bomber", "BO"));
			strongvs.add(new Ship("Heavy Bomber", "HB"));
			strongvs.add(new Ship("Ion Bomber", "IB"));
			strongvs.add(new Ship("Corvette", "CV"));
			strongvs.add(new Ship("Destroyer", "DE"));
			strongvs.add(new Ship("Frigate", "FR"));
			strongvs.add(new Ship("Ion Frigate", "IF"));
		} else if (this.id.equals("BO")) {
			strongvs.add(new Ship("Heavy Bomber", "HB"));
			strongvs.add(new Ship("Ion Bomber", "IB"));
			strongvs.add(new Ship("Corvette", "CV"));
			strongvs.add(new Ship("Destroyer", "DE"));
			strongvs.add(new Ship("Frigate", "FR"));
			strongvs.add(new Ship("Ion Frigate", "IF"));
			strongvs.add(new Ship("Cruiser", "CR"));
		} else if (this.id.equals("HB")) {
			strongvs.add(new Ship("Ion Bomber", "IB"));
			strongvs.add(new Ship("Corvette", "CV"));
			strongvs.add(new Ship("Destroyer", "DE"));
			strongvs.add(new Ship("Frigate", "FR"));
			strongvs.add(new Ship("Ion Frigate", "IF"));
			strongvs.add(new Ship("Cruiser", "CR"));
			strongvs.add(new Ship("Heavy Cruiser", "HC"));
		} else if (this.id.equals("IB")) {
			strongvs.add(new Ship("Battleship", "BS"));
			strongvs.add(new Ship("Dreadnought", "DN"));
			strongvs.add(new Ship("Titan", "TI"));
			strongvs.add(new Ship("Leviathan", "LV"));
			strongvs.add(new Ship("Death Star", "DS"));
		} else if (this.id.equals("CV")) {
			strongvs.add(new Ship("Ion Bomber", "IB"));
			strongvs.add(new Ship("Destroyer", "DE"));
			strongvs.add(new Ship("Frigate", "FR"));
			strongvs.add(new Ship("Ion Frigate", "IF"));
			strongvs.add(new Ship("Cruiser", "CR"));
		} else if (this.id.equals("DE")) {
			strongvs.add(new Ship("Frigate", "FR"));
			strongvs.add(new Ship("Ion Frigate", "IF"));
			strongvs.add(new Ship("Cruiser", "CR"));
			strongvs.add(new Ship("Heavy Cruiser", "HC"));
		} else if (this.id.equals("FR")) {
			strongvs.add(new Ship("Ion Frigate", "IF"));
			strongvs.add(new Ship("Cruiser", "CR"));
			strongvs.add(new Ship("Heavy Cruiser", "HC"));
		} else if (this.id.equals("IF")) {
			strongvs.add(new Ship("Battleship", "BS"));
			strongvs.add(new Ship("Dreadnought", "DN"));
			strongvs.add(new Ship("Titan", "TI"));
			strongvs.add(new Ship("Leviathan", "LV"));
			strongvs.add(new Ship("Death Star", "DS"));
		} else if (this.id.equals("CR")) {
			strongvs.add(new Ship("Ion Frigate", "IF"));
			strongvs.add(new Ship("Heavy Cruiser", "HC"));
			strongvs.add(new Ship("Battleship", "BS"));
		} else if (this.id.equals("HC")) {
			strongvs.add(new Ship("Fighter", "FT"));
			strongvs.add(new Ship("Battleship", "BS"));
			strongvs.add(new Ship("Dreadnought", "DN"));
			strongvs.add(new Ship("Titan", "TI"));
		} else if (this.id.equals("BS")) {
			strongvs.add(new Ship("Fighter", "FT"));
			strongvs.add(new Ship("Bomber", "BO"));
			strongvs.add(new Ship("Heavy Bomber", "HB"));
			strongvs.add(new Ship("Corvette", "CV"));
			strongvs.add(new Ship("Destroyer", "DE"));
			strongvs.add(new Ship("Dreadnought", "DN"));
			strongvs.add(new Ship("Titan", "TI"));
			strongvs.add(new Ship("Leviathan", "LV"));
			strongvs.add(new Ship("Death Star", "DS"));
		} else if (this.id.equals("DN")) {
			strongvs.add(new Ship("Fighter", "FT"));
			strongvs.add(new Ship("Bomber", "BO"));
			strongvs.add(new Ship("Heavy Bomber", "HB"));
			strongvs.add(new Ship("Corvette", "CV"));
			strongvs.add(new Ship("Destroyer", "DE"));
			strongvs.add(new Ship("Frigate", "FR"));
			strongvs.add(new Ship("Titan", "TI"));
			strongvs.add(new Ship("Leviathan", "LV"));
			strongvs.add(new Ship("Death Star", "DS"));
		} else if (this.id.equals("TI")) {
			strongvs.add(new Ship("Fighter", "FT"));
			strongvs.add(new Ship("Bomber", "BO"));
			strongvs.add(new Ship("Heavy Bomber", "HB"));
			strongvs.add(new Ship("Corvette", "CV"));
			strongvs.add(new Ship("Destroyer", "DE"));
			strongvs.add(new Ship("Frigate", "FR"));
			strongvs.add(new Ship("Cruiser", "CR"));
			strongvs.add(new Ship("Leviathan", "LV"));
			strongvs.add(new Ship("Death Star", "DS"));
		} else if (this.id.equals("LV")) {
			strongvs.add(new Ship("Fighter", "FT"));
			strongvs.add(new Ship("Bomber", "BO"));
			strongvs.add(new Ship("Heavy Bomber", "HB"));
			strongvs.add(new Ship("Corvette", "CV"));
			strongvs.add(new Ship("Destroyer", "DE"));
			strongvs.add(new Ship("Frigate", "FR"));
			strongvs.add(new Ship("Cruiser", "CR"));
			strongvs.add(new Ship("Death Star", "DS"));
		} else if (this.id.equals("DS")) {
			strongvs.add(new Ship("Fighter", "FT"));
			strongvs.add(new Ship("Bomber", "BO"));
			strongvs.add(new Ship("Heavy Bomber", "HB"));
			strongvs.add(new Ship("Corvette", "CV"));
			strongvs.add(new Ship("Destroyer", "DE"));
			strongvs.add(new Ship("Frigate", "FR"));
			strongvs.add(new Ship("Cruiser", "CR"));
			strongvs.add(new Ship("Heavy Cruiser", "HC"));
		} else if (this.id.equals("RC") || this.id.equals("SS") || this.id.equals("OS")) {
			strongvs.add(new Ship("Nothing", "NO"));
		}
		return strongvs;
	}
		
	public ArrayList<Ship> getMaybes() {
		if (maystvs.size() != 0) 
			return maystvs;
		
		if (this.id.equals("FT")) {
			maystvs.add(new Ship("Cruiser", "CR"));
		} else if (this.id.equals("BO")) {
			maystvs.add(new Ship("Heavy Cruiser", "HC"));
		} else if (this.id.equals("CV")) {
			maystvs.add(new Ship("Heavy Cruiser", "HC"));
		} else if (this.id.equals("FR")) {
			maystvs.add(new Ship("Battleship", "BS"));
		} else if (this.id.equals("CR")) {
			maystvs.add(new Ship("Fighter", "FT"));
			maystvs.add(new Ship("Dreadnought", "DN"));
		} else if (this.id.equals("HC")) {
			maystvs.add(new Ship("Bomber", "BO"));
			maystvs.add(new Ship("Corvette", "CV"));
			maystvs.add(new Ship("Leviathan", "LV"));
		} else if (this.id.equals("BS")) {
			maystvs.add(new Ship("Frigate", "FR"));
		} else if (this.id.equals("DN")) {
			maystvs.add(new Ship("Cruiser", "CR"));
		} else if (this.id.equals("LV")) {
			maystvs.add(new Ship("Heavy Cruiser", "HC"));
		}
		else if (this.id.equals("HB") ||
				this.id.equals("IB") ||
				this.id.equals("DE") ||
				this.id.equals("IF") ||
				this.id.equals("TI") ||
				this.id.equals("DS") ||
				this.id.equals("RC") ||
				this.id.equals("SS") ||
				this.id.equals("OS")) {
			maystvs.add(new Ship("Nothing", "NO"));
		} 
		
		return maystvs;
	}
	
	public ArrayList<Ship> getWeaknesses() {
		if (weakvs.size() != 0) {
			return weakvs;
		}
		
		if (this.id.equals("FT")) {
			weakvs.add(new Ship("Heavy Cruiser", "HC"));
			weakvs.add(new Ship("Battleship", "BS"));
			weakvs.add(new Ship("Dreadnought", "DN"));
			weakvs.add(new Ship("Titan", "TI"));
			weakvs.add(new Ship("Leviathan", "LV"));
			weakvs.add(new Ship("Death Star", "DS"));
		} else if (this.id.equals("BO")) {
			weakvs.add(new Ship("Fighter", "FT"));
			weakvs.add(new Ship("Battleship", "BS"));
			weakvs.add(new Ship("Dreadnought", "DN"));
			weakvs.add(new Ship("Titan", "TI"));
			weakvs.add(new Ship("Leviathan", "LV"));
			weakvs.add(new Ship("Death Star", "DS"));
		} else if (this.id.equals("HB")) {
			weakvs.add(new Ship("Fighter", "FT"));
			weakvs.add(new Ship("Bomber", "BO"));
			weakvs.add(new Ship("Battleship", "BS"));
			weakvs.add(new Ship("Dreadnought", "DN"));
			weakvs.add(new Ship("Titan", "TI"));
			weakvs.add(new Ship("Leviathan", "LV"));
			weakvs.add(new Ship("Death Star", "DS"));
		} else if (this.id.equals("IB")) {
			weakvs.add(new Ship("Fighter", "FT"));
			weakvs.add(new Ship("Bomber", "BO"));
			weakvs.add(new Ship("Heavy Bomber", "HB"));
			weakvs.add(new Ship("Corvette", "CV"));
		} else if (this.id.equals("CV")) {
			weakvs.add(new Ship("Fighter", "FT"));
			weakvs.add(new Ship("Bomber", "BO"));
			weakvs.add(new Ship("Battleship", "BS"));
			weakvs.add(new Ship("Dreadnought", "DN"));
			weakvs.add(new Ship("Titan", "TI"));
			weakvs.add(new Ship("Leviathan", "LV"));
			weakvs.add(new Ship("Death Star", "DS"));
		} else if (this.id.equals("DE")) {
			weakvs.add(new Ship("Fighter", "FT"));
			weakvs.add(new Ship("Bomber", "BO"));
			weakvs.add(new Ship("Corvette", "CV"));
			weakvs.add(new Ship("Battleship", "BS"));
			weakvs.add(new Ship("Dreadnought", "DN"));
			weakvs.add(new Ship("Titan", "TI"));
			weakvs.add(new Ship("Leviathan", "LV"));
			weakvs.add(new Ship("Death Star", "DS"));
		} else if (this.id.equals("FR")) {
			weakvs.add(new Ship("Fighter", "FT"));
			weakvs.add(new Ship("Bomber", "BO"));
			weakvs.add(new Ship("Corvette", "CV"));
			weakvs.add(new Ship("Destroyer", "DE"));
			weakvs.add(new Ship("Dreadnought", "DN"));
			weakvs.add(new Ship("Titan", "TI"));
			weakvs.add(new Ship("Leviathan", "LV"));
			weakvs.add(new Ship("Death Star", "DS"));
		} else if (this.id.equals("IF")) {
			weakvs.add(new Ship("Fighter", "FT"));
			weakvs.add(new Ship("Bomber", "BO"));
			weakvs.add(new Ship("Heavy Bomber", "HB"));
			weakvs.add(new Ship("Corvette", "CV"));
			weakvs.add(new Ship("Destroyer", "DE"));
			weakvs.add(new Ship("Frigate", "FR"));
			weakvs.add(new Ship("Cruiser", "CR"));
		} else if (this.id.equals("CR")) {
			weakvs.add(new Ship("Bomber", "BO"));
			weakvs.add(new Ship("Heavy Bomber", "HB"));
			weakvs.add(new Ship("Corvette", "CV"));
			weakvs.add(new Ship("Destroyer", "DE"));
			weakvs.add(new Ship("Frigate", "FR"));
			weakvs.add(new Ship("Titan", "TI"));
			weakvs.add(new Ship("Leviathan", "LV"));
			weakvs.add(new Ship("Death Star", "DS"));
		} else if (this.id.equals("HC")) {
			weakvs.add(new Ship("Heavy Bomber", "HB"));
			weakvs.add(new Ship("Destroyer", "DE"));
			weakvs.add(new Ship("Frigate", "FR"));
			weakvs.add(new Ship("Cruiser", "CR"));
			weakvs.add(new Ship("Death Star", "DS"));
		} else if (this.id.equals("BS")) {
			weakvs.add(new Ship("Ion Bombers", "IB"));
			weakvs.add(new Ship("Ion Frigate", "IF"));
			weakvs.add(new Ship("Cruiser", "CR"));
			weakvs.add(new Ship("Heavy Cruiser", "HC"));
		} else if (this.id.equals("DN")) {
			weakvs.add(new Ship("Ion Bombers", "IB"));
			weakvs.add(new Ship("Ion Frigate", "IF"));
			weakvs.add(new Ship("Heavy Cruiser", "HC"));
			weakvs.add(new Ship("Battleship", "BS"));
		} else if (this.id.equals("TI")) {
			weakvs.add(new Ship("Ion Bombers", "IB"));
			weakvs.add(new Ship("Ion Frigate", "IF"));
			weakvs.add(new Ship("Heavy Cruiser", "HC"));
			weakvs.add(new Ship("Battleship", "BS"));
			weakvs.add(new Ship("Dreadnought", "DN"));
		} else if (this.id.equals("LV")) {
			weakvs.add(new Ship("Ion Bombers", "IB"));
			weakvs.add(new Ship("Ion Frigate", "IF"));
			weakvs.add(new Ship("Battleship", "BS"));
			weakvs.add(new Ship("Dreadnought", "DN"));
			weakvs.add(new Ship("Titan", "TI"));
		} else if (this.id.equals("DS")) {
			weakvs.add(new Ship("Ion Bombers", "IB"));
			weakvs.add(new Ship("Ion Frigate", "IF"));
			weakvs.add(new Ship("Battleship", "BS"));
			weakvs.add(new Ship("Dreadnought", "DN"));
			weakvs.add(new Ship("Titan", "TI"));
			weakvs.add(new Ship("Leviathan", "LV"));
		} else if (this.id.equals("RC") || this.id.equals("SS") || this.id.equals("OS")) {
			weakvs.add(new Ship("Everything", "EV"));
		}
		return weakvs;
	}
} 
