class Location {
	constructor(lh) {
		this.lh = lh;

		this.maxNPCs = 0;

		/*
			Current inventory which can be looted. All is given to
			the Group when they move to this Location. When a group
			leaves, some of their inventory is left behind.
		*/
		this.inv = cloneObj(invTemplate);
		// Structure Flags
		this.structures = cloneObj(structuresTemplate);

		// Modifiers
		/*
			These contain the sum of the current modifiers
			on each property in their respective categories.
		*/
		this.invMods = cloneObj(invTemplate);
		this.statMods = cloneObj(statsTemplate);
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

	// Takes an array of numbers and assigns initial inv values
	initInv(arr) {
		this.inv.wood = randRange(arr[0], arr[1]);
		this.inv.metal = randRange(arr[2], arr[3]);
		this.inv.food = randRange(arr[4], arr[5]);
		this.inv.water = randRange(arr[6], arr[7]);
		this.inv.medicine = randRange(arr[8], arr[9]);
		this.inv.land = randRange(arr[10], arr[11]);
	}
	// Takes an array of key strings and builds these structures
	initStruct(arr) {
		for(var i=0; i<arr.length; i++) {
			this.modStructure(arr[i], true);
		}
	}
}

class Prison extends Location {
	constructor(lh) {
		super(lh);
		this.initInv([5,10, 80,100, 20,30, 10,25, 3,7, 6,8]);
		this.initStruct(['walls', 'infirmary']);
	}

}

class GolfCourse extends Location {
	constructor(lh) {
		super(lh);
		this.initInv([60,80, 0,10, 5,10, 25,30, 0,2, 15,25]);
		this.initStruct([]);
	}

}
/*
class Mall extends Location {
	constructor(lh) {
		super(lh);
		this.initInv([]);
		this.initStruct([]);
	}

}

class Hospital extends Location {
	constructor(lh) {
		super(lh);
		this.initInv([]);
		this.initStruct([]);
	}

}

class ApartmentComplex extends Location {
	constructor(lh) {
		super(lh);
		this.initInv([]);
		this.initStruct([]);
	}

}

class School extends Location {
	constructor(lh) {
		super(lh);
		this.initInv([]);
		this.initStruct([]);
	}

}

class Warehouse extends Location {
	constructor(lh) {
		super(lh);
		this.initInv([]);
		this.initStruct([]);
	}

}

class Neighborhood extends Location {
	constructor(lh) {
		super(lh);
		this.initInv([]);
		this.initStruct([]);
	}

}

class GatedNeighborhood extends Neighborhood {
	constructor(lh) {
		super(lh);
		this.initInv([]);
		this.initStruct([]);
	}
}
*/