/*
	Manages the group itself, what the group possesses,
	and what the group knows.
*/
class Group {
	constructor(game, lh) {
		this.game = game;
		this.lh = lh;

		this.currentLocation = lh.getStartingLocation();
		this.knownLocations = [];

		this.player;
		this.NPCs = [];

		// Current Inventory
		this.inv = cloneObj(invTemplate);
		// Current Stats
		this.stats = cloneObj(statsTemplate);
	}

	update() {
		this.updateInventory(this.currentLocation);
		this.updateStats(this.currentLocation);
	}

	//Handle applying modifiers to inventory and stats each tick
	updateInventory(CL) {
		//NPC modifiers
		//Location modifiers
		for(var key in CL.invMods) {
			if(this.inv.hasOwnProperty(key)) {
				this.inv[key] += CL.invMods[key];
			}else {
				console.log("Group - No key in inventory - key: " + key);
				console.log(this.inv);
			}
		}
	}
	updateStats(CL) {
		var statMods = cloneObj(statsTemplate);
		//NPC modifiers
		//Location modifiers
		for(var key in CL.statMods) {
			statMods[key] += CL.statMods[key];
		}
		this.stats = statMods;
	}

	/*
		Used when moving to a new location. Takes all of
		Location's inv and gives it to the Group.
	*/
	transferInventory(CL) {
		for(var key in CL.inv) {
			this.inv[key] += CL.inv[key];
			CL.inv[key] = 0;
		}
	}
	/*
		Used when leaving a location. Leaves a percentage of
		each item at the previous location.
	*/
	abandonInventory(CL) {

	}

	// Mutators

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
}

/*
	Handles generating new Locations, the current location,
	and known locations.
*/

class LocationHandler {
	constructor(game) {
		this.game = game;
		this.currentLocation;
	}

	update() {
		//console.log("LocationHandler - updating")
		this.currentLocation.update();
	}
	getStartingLocation() {
		this.currentLocation = this.getLocation(randRange(0,1));
		return this.currentLocation;
	}

	getLocation(index) {
		switch(index) {
			case 0:
				return new Prison(this);
				break;
			case 1:
				return new GolfCourse(this);
				break;
		}
	}
}

/*
	Controls selecting and carrying out current and new
	Events. Called by the Game based on luck attr of
	Player.
*/
class EventHandler {
	constructor(game) {
		this.game = game;
	}

	update() {

	}
}

/*
	Controls timing and update calls.
*/
class GameClock {
	constructor(game) {
		this.game = game;
		this.attr = {
			// tick is ms/update
			tick: 1000,
			// dpt = days per tick
			dpt: 1,
			// .5/s, 1/s, 2/s, 4/s, 8/s
			defTicks: [2000, 1000, 500, 250, 125],
			tickIndex: 1
		};

		this.gameLoop;
		this.start();
	}

	start() {
		console.log("GameClock - Starting");
		var self = this;
		this.gameLoop = setInterval(function() { self.game.update() }, this.tick);
	}

	pause() {
		console.log("GameClock - Paused")
		clearInterval(this.gameLoop);
	}

	changeTick(index) {
		// Check index value
		if(index < 0 || index >= this.defTicks.length) {
			console.log(`GameClock - Invalid index recieved - ${index}`)
			console.log(this);
		}else {
			/*
				This needs to be looked into. Could allow players to repetitively
				switch speeds which would delay the next update indefinitely.
				Possibly need to call update once whenever changeTick is called.
			*/
			// Clear the interval, set new tick, set the interval.
			this.pause();
			this.tick = this.defTicks[index];
			this.tickIndex = index;
			this.start();
		}
	}

	// Mutators
	get tick() { return this.attr.tick; }
	set tick(speed) { this.attr.tick = speed; }
	get defTicks() { return this.attr.defTicks; }
	get tickIndex() { return this.attr.tickIndex; }
	set tickIndex(index) { this.attr.tickIndex = index; }
}

class Game {
	constructor() {
		//this.eh = new EventHandler(this);
		this.lh = new LocationHandler(this);
		//this.player = new Player(this);
		this.group = new Group(this, this.lh);

		this.gc = new GameClock(this);
	}

	update() {
		console.log("Game - updating");
		// Order not set in stone
		//this.eh.update();
		this.lh.update();
		//this.player.update();
		this.group.update();
	}
}