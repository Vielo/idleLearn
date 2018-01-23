var researchTierOneList = [
	laboratory = {
		name: "Laboratory",
		cost: 100,
		unlocked: false,
		codeName: 'res_laboratory',
		fluffText: 'Making your employees do research during breaks and after hours is good and all, but you cannot expect them to match qualified scientists. Research this to begin your journey towards the Rockier Future.',
		icon: 'img/research/icon_res_laboratory.png',
		duration: 6000 // 60 seconds
	},
	researchSpeedI = {
		name: "Research Speed I",
		cost: 500,
		unlocked: false,
		level: 0,
		levelBonus: 0.2,
		codeName: 'res_researchSpeedI',
		fluffText: 'Provides further training to your scientists, allowing them to make progress more swiftly.',
		icon: 'img/research/icon_researchSpeedI.png',
		duration: 120000 // 120 seconds
	}
]

//more: res_oil_extraction (enables pumpjacks), res_deep_mining (allows deep mines), res_underwater_mining (enables seabed mines), res_steel (enables steel mills), res_plastics (enables chemical plants), res_circuits (enables electronics plants)