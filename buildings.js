var buildingsList = [
	stoneExtractor = {
		name: "Quarry",
		namePlural: "Quarries",
		initialCost: {
			minerals: 10,
			steel: 0,
			oil: 0,
			plastics: 0,
			circuits: 0,
			science: 0
		},
		stuffPerTick: {
			minerals: 5,
			steel: 0,
			oil: 0,
			plastics: 0,
			circuits: 0,
			science: 0
		},
		consumptionPerTick: {
			minerals: 0,
			steel: 0,
			oil: 0,
			plastics: 0,
			circuits: 0,
			science: 0
		},
		fluffText: "A man without calluses is no man at all.",
		totalAmount: 0,
		codeName: "stoneExtractor",
		tickSpeed: 3500
	},

	deepStoneMine = {
		name: "Deep Stone Mine",
		namePlural: "Deep Stone Mines",
		initialCost: {
			minerals: 1000,
			steel: 0,
			oil: 0,
			plastics: 0,
			circuits: 0,
			science: 0
		},
		stuffPerTick: {
			minerals: 20,
			steel: 0,
			oil: 0,
			plastics: 0,
			circuits: 0,
			science: 0
		},
		consumptionPerTick: {
			minerals: 0,
			steel: 0,
			oil: 0,
			plastics: 0,
			circuits: 0,
			science: 0
		},
		fluffText: "The deep stone deposits are safe from wind and atmospheric erosion, making them a very valuable resource.",
		totalAmount: 0,
		codeName: "deepStoneMine",
		tickSpeed: 8000
	},
	
	seabedMine = {
		name: "Seabed Mine",
		namePlural: "Seabed Mines",
		initialCost: {
			minerals: 15000,
			steel: 0,
			oil: 0,
			plastics: 0,
			circuits: 0,
			science: 0
		},
		stuffPerTick: {
			minerals: 500,
			steel: 0,
			oil: 0,
			plastics: 0,
			circuits: 0,
			science: 0
		},
		consumptionPerTick: {
			minerals: 0,
			steel: 0,
			oil: 0,
			plastics: 0,
			circuits: 0,
			science: 0
		},
		fluffText: "Seabed rock and mineral deposits have endured unimaginable pressures for aeons. They are compressed beyond measure.",
		totalAmount: 0,
		codeName: "seabedMine",
		tickSpeed: 15000
	},

	pumpJack = {
		name: "Pumpjack",
		namePlural: "Pumpjacks",
		initialCost: {
			minerals: 5000,
			steel: 0,
			oil: 0,
			plastics: 0,
			circuits: 0,
			science: 0,
		},
		stuffPerTick: {
			minerals: 0,
			steel: 0,
			oil: 200,
			plastics: 0,
			circuits: 0,
			science: 0,
		},
		consumptionPerTick: {
			minerals: 0,
			steel: 0,
			oil: 0,
			plastics: 0,
			circuits: 0,
			science: 0
		},
		fluffText: "Oil is love, oil is life.",
		totalAmount: 0,
		codeName: "pumpJack",
		tickSpeed: 7500,
	},
	laboratory = {
		name: "Laboratory",
		namePlural: "Laboratories",
		initialCost: {
			minerals: 500,
			steel: 0,
			oil: 100,
			plastics: 0,
			circuits: 0,
			science: 0,
		},
		stuffPerTick: {
			minerals: 0,
			steel: 0,
			oil: 0,
			plastics: 0,
			circuits: 0,
			science: 50,
		},
		consumptionPerTick: {
			minerals: 0,
			steel: 0,
			oil: 0,
			plastics: 0,
			circuits: 0,
			science: 0
		},
		fluffText: "Laboratories are awesome!",
		totalAmount: 0,
		codeName: "laboratory",
		tickSpeed: 10000
	},
	steelMill = {
		name: "Steel Mill",
		namePlural: "Steel Mills",
		initialCost: {
			minerals: 10000,
			steel: 0,
			oil: 1000,
			plastics: 0,
			circuits: 0,
			science: 0,
		},
		stuffPerTick: {
			minerals: 0,
			steel: 500,
			oil: 0,
			plastics: 0,
			circuits: 0,
			science: 0
		},
		consumptionPerTick: {
			minerals: 1000,
			steel: 0,
			oil: 0,
			plastics: 0,
			circuits: 0,
			science: 0
		},
		fluffText: "Steel is amazing (and in a future revision it will fuel the basis of your combat capabilities!).",
		totalAmount: 0,
		codeName: "steelMill",
		tickSpeed: 5000
	},
	chemicalPlant = {
		name: "Chemical Plant",
		namePlural: "Chemical Plants",
		initialCost: {
			minerals: 20000,
			steel: 10000,
			oil: 5000,
			plastics: 0,
			circuits: 0,
			science: 0,
		},
		stuffPerTick: {
			minerals: 0,
			steel: 0,
			oil: 0,
			plastics: 100,
			circuits: 0,
			science: 0
		},
		consumptionPerTick: {
			minerals: 0,
			steel: 0,
			oil: 200,
			plastics: 0,
			circuits: 0,
			science: 0
		},
		fluffText: "Plastic is amazing.",
		totalAmount: 0,
		codeName: "chemicalPlant",
		tickSpeed: 3000
	},
	electronicsPlant = {
		name: "Electronics Plant",
		namePlural: "Electronics Plants",
		initialCost: {
			minerals: 50000,
			steel: 30000,
			oil: 15000,
			plastics: 2000,
			circuits: 0,
			science: 0,
		},
		stuffPerTick: {
			minerals: 0,
			steel: 0,
			oil: 0,
			plastics: 0,
			circuits: 100,
			science: 0
		},
		consumptionPerTick: {
			minerals: 2000,
			steel: 150,
			oil: 0,
			plastics: 300,
			circuits: 0,
			science: 0
		},
		fluffText: "The ultimate resource (at least for now). Make sure you can provide enough stuff!",
		totalAmount: 0,
		codeName: "electronicsPlant",
		tickSpeed: 3000
	}
]

