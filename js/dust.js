/*
	Handles generating new Locations, the current location,
	and known locations.
*/

class LocationHandler {
	constructor(game) {
		this.game = game;
		this.currentLocation = new Location(this);
	}

	update() {
		//console.log("LocationHandler - updating")
		this.currentLocation.update();
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
		this.gc = new GameClock(this);
		//this.player = new Player(this);
	}

	update() {
		console.log("Game - updating");
		// Order not set in stone
		//this.eh.update();
		this.lh.update();
		//this.player.update();
	}
}