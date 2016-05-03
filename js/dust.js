/*
	Handles generating new Locations, the current location,
	and known locations.
*/

class LocationHandler {
	constructor(game) {
		this.game = game;
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
}

/*
	Controls timing and update calls.
*/
class GameClock {
	constructor(game) {
		this.game = game;
	}
}

class Game {
	constructor() {
		this.eh = new EventHandler(this);
		this.gc = new GameClock(this);
		this.player = new Player(this);
	}
}