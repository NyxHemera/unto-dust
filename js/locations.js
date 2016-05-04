class Location {
	constructor(lh) {
		this.lh = lh;

		/*
			Current inventory which can be looted. All is given to
			the Group when they move to this Location. When a group
			leaves, some of their inventory is left behind.
		*/
		this.inv = {
			wood: 0,
			metal: 0,
			food: 0,
			medicine: 0,
			land: 0
		};
		// Structure Flags
		this.structures = {
			walls: false,
			infirmary: false,
			armory: false,
			comms: false
		};

		// Modifiers
		/*
			These contain the sum of the current modifiers
			on each property in their respective categories.
		*/
		this.invMods = {
			wood: 0,
			metal: 0,
			food: 0,
			medicine: 0
		};
		this.statMods = {
			security: 0,
			morale: 0
		}
	}

	update() {
		//console.log("Location - updating");

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