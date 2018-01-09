var buildingsList = [
	stoneExtractor = {
		name: "Quarry",
		namePlural: "Quarries",
		initialCost: 10,
		stonePerTick: 5,
		fluffText: "A man without calluses is no man at all.",
		currentCost: 10,
		totalAmount: 0,
		codeName: "stoneExtractor",
		tickSpeed: 4000
	},

	deepStoneMine = {
		name: "Deep Stone Mine",
		namePlural: "Deep Stone Mines",
		initialCost: 1000,
		stonePerTick: 20,
		fluffText: "<p>Every Deep Stone Mine will automatically produce 20 stone per second.</p><p>Upgradeable.</p><p>The deep stone deposits are safe from wind and atmospheric erosion, making them a very valuable resource.</p>"	,
		currentCost: 1000,
		totalAmount: 0,
		codeName: "deepStoneMine",
		tickSpeed: 10000
	},
	
	seabedMine = {
		name: "Seabed Mine",
		namePlural: "Seabed Mines",
		initialCost: 25000,
		stonePerTick: 500,
		fluffText: "<p>Every Seabed Mine will automatically produce 500 stone per second.</p><p>Seabed rock and mineral deposits have endured unimaginable pressures for aeons. They are compressed beyond measure.</p>",
		currentCost: 25000,
		totalAmount: 0,
		codeName: "seabedMine",
		tickSpeed: 20000
	}
]

