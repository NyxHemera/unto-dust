function randRange(min, max) {
	return Math.floor(Math.random() * (max-min+1)) + min;
}

function cloneObj(obj) {
	return (JSON.parse(JSON.stringify(obj)));
}

// Template Objects

var invTemplate = {
			wood: 0,
			metal: 0,
			food: 0,
			water: 0,
			medicine: 0,
			land: 0
		};

var structuresTemplate = {
			walls: false,
			infirmary: false,
			armory: false,
			comms: false
		};

var statsTemplate = {
			security: 0,
			morale: 0
		};