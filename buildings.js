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
		fluffText: "<p>Every Deep Stone Mine will automatically produce 20 stone per second.</p><p>Upgradeable.</p><p>The deep stone deposits are safe from wind and atmospheric erosion, making them a very valuable resource.</p>"	,
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
		fluffText: "<p>Every Seabed Mine will automatically produce 500 stone per second.</p><p>Seabed rock and mineral deposits have endured unimaginable pressures for aeons. They are compressed beyond measure.</p>",
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
			science: 0
		},
		stuffPerTick: {
			minerals: 0,
			steel: 0,
			oil: 200,
			plastics: 0,
			circuits: 0,
			science: 0
		},
		fluffText: "<p>Every Seabed Mine will automatically produce 500 stone per second.</p><p>Seabed rock and mineral deposits have endured unimaginable pressures for aeons. They are compressed beyond measure.</p>",
		totalAmount: 0,
		codeName: "pumpJack",
		tickSpeed: 7500
	}
]

