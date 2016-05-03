class Location {
	constructor(lh) {
		this.lh = lh;

		// Current Inventory
		this.inv = {
			wood: 0,
			metal: 0,
			food: 0,
			medicine: 0,
			arableLand: 0
		};
		// Current Stats
		this.stats = {
			security: 0
		};
		// Structure Flags
		this.structures = {
			walls: false,
			infirmary: false,
			armory: false,
			comms: false
		};
		// invMods stores how much each inventory item should grow or shrink each tick.
		// May want to combine with inv...
		this.invMods = {
			wood: .5,
			metal: .5,
			food: 1.5,
			medicine: 0,
			arableLand: 0	
		};
	}

	update() {
		//console.log("Location - updating");
		for(var key in this.inv) {
			this.inv[key] += this.invMods[key];
		}
	}

	// Add modifiers to inventory mod
	addInvMod(key, mod) {
		if(this.inv.hasOwnProperty(key)) {
			this.invMods[key] += mod;
			return true;
		}else {
			console.log(`Location - Invalid key given - key: ${key}, mod: ${mod}`);
			console.log(this);
			return false;
		}
	}

	// Create or destroy structure 
	modStructure(key, mod) {
		if(this.structures.hasOwnProperty(key)) {
			this.structures[key] = mod;
			return true;
		}else {
			console.log(`Location - Invalid key given - key: ${key}, mod: ${mod}`);
			console.log(this);
			return false;
		}
	}
}