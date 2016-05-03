/*
	Base class for NPC and Players. Handles attributes,
	disposition, etc.
*/
class Character {
	constructor(game) {
		this.game = game;
		this.attr = {
			name: "",
			profession: "",
			charisma: 0,
			luck: 0,
			intelligence: 0,
			strength: 0,
			age: 0
		};
	}

	update() {
		
	}

	toString() { return this.attr.name; }

	// Mutators
	get name() { return this.attr.name; }
	get profession() { return this.attr.profession; }
	get charisma() { return this.attr.charisma; }
	get luck() { return this.attr.luck; }
	get intelligence() { return this.attr.intelligence; }
	get strength() { return this.attr.strength; }
	get age() { return this.attr.age; }
}
class Player extends Character{
	constructor(game) {
		super(game);
	}
}

class NPC extends Character{
	constructor(game) {
		super(game);
	}
}