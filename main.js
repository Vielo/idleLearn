var currencyList = {
	minerals: 0,
	steel: 0,
	oil: 0,
	plastics: 0,
	circuits: 0,
	science: 0,
};

var currenciesPerSec = {
	minerals: 0,
	steel: 0,
	oil: 0,
	plastics: 0,
	circuits: 0,
	science: 0,
};

var consumptionPerSec = {
	minerals: 0,
	steel: 0,
	oil: 0,
	plastics: 0,
	circuits: 0,
	science: 0
}

var playerState = {
	buildingCostPower: 1.1
}

var intervalStoneExtractor;
var intervalDeepMine;
var intervalSeabedMine;
var intervalPumpJack;
var intervalLaboratory;
var intervalSteelMill;
var intervalChemicalPlant;
var intervalElectronicsPlant;


function abbrNum(number, decPlaces) { 		//abbreviates numbers for display, courtesy of Jeff B (https://stackoverflow.com/users/179216/jeff-b0)
    // 2 decimal places => 100, 3 => 1000, etc
    decPlaces = Math.pow(10,decPlaces);

    // Enumerate number abbreviations
	var abbrev = [ "K", "M", "B", "T", "Qa", "Qi"];		//more if ever needed: , "Sx", "Sp", "Oc", "No", "Dc", "UnD", "DoD", "TrD", "QaD", "QiD"

    // Go through the array backwards, so we do the largest first
	if (number < 1000) {
		number = Number(Math.round(number+'e2')+'e-2').toFixed(2); // takes care of numbers below 1000, so they don't display ridiculous decimal places
	}
	else {
		for (var i=abbrev.length-1; i>=0; i--) {

			// Convert array index to "1000", "1000000", etc
			var size = Math.pow(10,(i+1)*3);
	
			// If the number is bigger or equal do the abbreviation
			if(size <= number) {
				 // Here, we multiply by decPlaces, round, and then divide by decPlaces.
				 // This gives us nice rounding to a particular decimal place.
				 number = Math.round(number*decPlaces/size)/decPlaces;
	
				 // Handle special case where we round up to the next abbreviation
				 if((number == 1000) && (i < abbrev.length - 1)) {
					 number = 1;
					 i++;
				 }
	
				 // Add the letter for the abbreviation
				 number += abbrev[i];
	
				 // We are done... stop
				 break;
			}
		}
	}


    return number;
}



function tooltipCreation(list, item) {
	if (list == buildingsList) {
		if (list[item].stuffPerTick.minerals > 0) {
			document.getElementById(list[item].codeName + "Fluff").innerHTML = "Each " + list[item].name + " produces " + "<strong>" + list[item].stuffPerTick.minerals + " minerals</strong> every " + "<strong>" + list[item].tickSpeed / 1000 + " seconds.</strong>" + "<p>You have " + list[item].totalAmount + " " + list[item].namePlural + " producing " + abbrNum((list[item].stuffPerTick.minerals * list[item].totalAmount), 2) + " minerals every " + list[item].tickSpeed / 1000 + " seconds, which translates to " + abbrNum((list[item].stuffPerTick.minerals * list[item].totalAmount) / list[item].tickSpeed * 1000, 2) + "/s and constitutes " + Math.round((((list[item].stuffPerTick.minerals * list[item].totalAmount) / list[item].tickSpeed * 1000) / currenciesPerSec.minerals) * 100) + "% of your total minerals production.</p>" + "<p><em>" + list[item].fluffText + "</em></p>";
		}
		if (list[item].stuffPerTick.oil > 0) {
			document.getElementById(list[item].codeName + "Fluff").innerHTML = "Each " + list[item].name + " produces " + "<strong>" + list[item].stuffPerTick.oil + " oil</strong> every " + "<strong>" + list[item].tickSpeed / 1000 + " seconds.</strong>" + "<p>You have " + list[item].totalAmount + " " + list[item].namePlural + " producing " + abbrNum((list[item].stuffPerTick.oil * list[item].totalAmount), 2) + " oil every " + list[item].tickSpeed / 1000 + " seconds, which translates to " + abbrNum((list[item].stuffPerTick.oil * list[item].totalAmount) / list[item].tickSpeed * 1000, 2) + "/s." + "<p><em>" + list[item].fluffText + "</em></p>"
		}
		if (list[item].stuffPerTick.science > 0) {
			document.getElementById(list[item].codeName + "Fluff").innerHTML = "Each " + list[item].name + " produces " + "<strong>" + list[item].stuffPerTick.science + " science</strong> every " + "<strong>" + list[item].tickSpeed / 1000 + " seconds.</strong>" + "<p>You have " + list[item].totalAmount + " " + list[item].namePlural + " producing " + abbrNum((list[item].stuffPerTick.science * list[item].totalAmount), 2) + " science every " + list[item].tickSpeed / 1000 + " seconds, which translates to " + abbrNum((list[item].stuffPerTick.science * list[item].totalAmount) / list[item].tickSpeed * 1000, 2) + "/s." + "<p><em>" + list[item].fluffText + "</em></p>"
		}
		if (list[item].stuffPerTick.steel > 0) {
			document.getElementById(list[item].codeName + "Fluff").innerHTML = "Each " + list[item].name + " uses " + list[item].consumptionPerTick.minerals + " minerals" + " to produce " + "<strong>" + list[item].stuffPerTick.steel + " steel</strong> every " + "<strong>" + list[item].tickSpeed / 1000 + " seconds.</strong>" + "<p>You have " + list[item].totalAmount + " " + list[item].namePlural + " consuming " + abbrNum((list[item].consumptionPerTick.minerals * list[item].totalAmount), 2) + " minerals " + " to produce " + abbrNum((list[item].stuffPerTick.steel * list[item].totalAmount), 2) + " steel every " + list[item].tickSpeed / 1000 + " seconds, which translates to " + abbrNum((list[item].stuffPerTick.steel * list[item].totalAmount) / list[item].tickSpeed * 1000, 2) + "/s." + "<p><em>" + list[item].fluffText + "</em></p>"
		}
		if (list[item].stuffPerTick.plastics > 0) {
			document.getElementById(list[item].codeName + "Fluff").innerHTML = "Each " + list[item].name + " uses " + list[item].consumptionPerTick.oil + " oil" + " to produce " + "<strong>" + list[item].stuffPerTick.plastics + " plastics</strong> every " + "<strong>" + list[item].tickSpeed / 1000 + " seconds.</strong>" + "<p>You have " + list[item].totalAmount + " " + list[item].namePlural + " consuming " + abbrNum((list[item].consumptionPerTick.oil * list[item].totalAmount), 2) + " oil " + "to produce " + abbrNum((list[item].stuffPerTick.plastics * list[item].totalAmount), 2) + " plastics every " + list[item].tickSpeed / 1000 + " seconds, which translates to " + abbrNum((list[item].stuffPerTick.plastics * list[item].totalAmount) / list[item].tickSpeed * 1000, 2) + "/s." + "<p><em>" + list[item].fluffText + "</em></p>"
		}
		if (list[item].stuffPerTick.circuits > 0) {
			document.getElementById(list[item].codeName + "Fluff").innerHTML = "Each " + list[item].name + " uses " + list[item].consumptionPerTick.minerals + " minerals, " + list[item].consumptionPerTick.steel + " steel " + "and " + list[item].consumptionPerTick.plastics + " plastics" + " to produce " + "<strong>" + list[item].stuffPerTick.circuits + " circuits</strong> every " + "<strong>" + list[item].tickSpeed / 1000 + " seconds.</strong>" + "<p>You have " + list[item].totalAmount + " " + list[item].namePlural + " consuming " + abbrNum((list[item].consumptionPerTick.minerals * list[item].totalAmount), 2) + " minerals, " + abbrNum((list[item].consumptionPerTick.steel * list[item].totalAmount), 2) + " steel" + " and " + abbrNum((list[item].consumptionPerTick.plastics * list[item].totalAmount), 2) + " plastics" + " to produce " + abbrNum((list[item].stuffPerTick.circuits * list[item].totalAmount), 2) + " circuits every " + list[item].tickSpeed / 1000 + " seconds, which translates to " + abbrNum((list[item].stuffPerTick.circuits * list[item].totalAmount) / list[item].tickSpeed * 1000, 2) + "/s." + "<p><em>" + list[item].fluffText + "</em></p>"
		}
		
		
		
	}
	if (list == "resourceTooltips") {
		if (item == "minerals") {
			if (buildingsList[5].totalAmount > 0) {
				document.getElementById("minerals-tooltip").innerHTML = "<p>Current: " + abbrNum((currenciesPerSec.minerals - consumptionPerSec.minerals), 2) + "/s</p>" + "<p>Production: +" + abbrNum(currenciesPerSec.minerals, 2) + "/s</p>" + "<p>Consumption: -" + abbrNum(consumptionPerSec.minerals, 2) + "/s</p>"
			}
			else {
				document.getElementById("minerals-tooltip").innerHTML = "Some crap here.";
			}
			
		}
	}

	else if (list == researchTierOneList) {
		document.getElementById(researchTierOneList[item].codeName + "Fluff").innerHTML = "<h1>" + researchTierOneList[item].name + "</h1>" + researchTierOneList[item].fluffText;
	}
	
}

function tooltipRemoval(list, item) {
	if (list == buildingsList) {
		document.getElementById(buildingsList[item].codeName + "Fluff").innerHTML = "";
	}
	else if (list == researchTierOneList){
		document.getElementById(researchTierOneList[item].codeName + "Fluff").innerHTML = "";
	}
}

function stoneClick(number) {
	currencyList.minerals = currencyList.minerals + number;
	document.getElementById("minerals").innerHTML = abbrNum(currencyList.minerals, 2);
	if (currencyList.minerals > 10 && document.getElementById("card-quarry").style.display == "none") {
		document.getElementById("card-quarry").style.display = "flex";
	}
};

function checkForMaxPossible(itemMax) {		//checks how many buildings of a certain type the player can buy and their cost
	var tempCostForMaxBuildingsBefore = {
		minerals: 0,
		steel: 0,
		oil: 0,
		plastics: 0,
		circuits: 0,
		science: 0,
	};
	var tempCostForMaxBuildingsAfter = {
		minerals: Math.floor(buildingsList[itemMax].initialCost.minerals * Math.pow(playerState.buildingCostPower, buildingsList[itemMax].totalAmount)),
		steel: Math.floor(buildingsList[itemMax].initialCost.steel * Math.pow(playerState.buildingCostPower, buildingsList[itemMax].totalAmount)),
		oil: Math.floor(buildingsList[itemMax].initialCost.oil * Math.pow(playerState.buildingCostPower, buildingsList[itemMax].totalAmount)),
		plastics: Math.floor(buildingsList[itemMax].initialCost.plastics * Math.pow(playerState.buildingCostPower, buildingsList[itemMax].totalAmount)),
		circuits: Math.floor(buildingsList[itemMax].initialCost.circuits * Math.pow(playerState.buildingCostPower, buildingsList[itemMax].totalAmount)),
		science: Math.floor(buildingsList[itemMax].initialCost.science * Math.pow(playerState.buildingCostPower, buildingsList[itemMax].totalAmount)),	
	}
	var tempTotalAmountOfBuildings = buildingsList[itemMax].totalAmount;
	var buildingsToBuy = 0;
	while (tempCostForMaxBuildingsAfter.minerals <= currencyList.minerals && tempCostForMaxBuildingsAfter.steel <= currencyList.steel && tempCostForMaxBuildingsAfter.oil <= currencyList.oil && tempCostForMaxBuildingsAfter.plastics <= currencyList.plastics && tempCostForMaxBuildingsAfter.circuits <= currencyList.circuits && tempCostForMaxBuildingsAfter.science <= currencyList.science) {
		tempCostForMaxBuildingsBefore.minerals = tempCostForMaxBuildingsBefore.minerals + Math.floor(buildingsList[itemMax].initialCost.minerals * Math.pow(playerState.buildingCostPower, tempTotalAmountOfBuildings));
		tempCostForMaxBuildingsBefore.steel = tempCostForMaxBuildingsBefore.steel + Math.floor(buildingsList[itemMax].initialCost.steel * Math.pow(playerState.buildingCostPower, tempTotalAmountOfBuildings));
		tempCostForMaxBuildingsBefore.oil = tempCostForMaxBuildingsBefore.oil + Math.floor(buildingsList[itemMax].initialCost.oil * Math.pow(playerState.buildingCostPower, tempTotalAmountOfBuildings));
		tempCostForMaxBuildingsBefore.plastics = tempCostForMaxBuildingsBefore.plastics + Math.floor(buildingsList[itemMax].initialCost.plastics * Math.pow(playerState.buildingCostPower, tempTotalAmountOfBuildings));
		tempCostForMaxBuildingsBefore.circuits = tempCostForMaxBuildingsBefore.circuits + Math.floor(buildingsList[itemMax].initialCost.circuits * Math.pow(playerState.buildingCostPower, tempTotalAmountOfBuildings));
		tempCostForMaxBuildingsBefore.science = tempCostForMaxBuildingsBefore.science + Math.floor(buildingsList[itemMax].initialCost.science * Math.pow(playerState.buildingCostPower, tempTotalAmountOfBuildings));

		tempCostForMaxBuildingsAfter.minerals = tempCostForMaxBuildingsAfter.minerals + Math.floor(buildingsList[itemMax].initialCost.minerals * Math.pow(playerState.buildingCostPower, (tempTotalAmountOfBuildings + 1)));
		tempCostForMaxBuildingsAfter.steel = tempCostForMaxBuildingsAfter.steel + Math.floor(buildingsList[itemMax].initialCost.steel * Math.pow(playerState.buildingCostPower, (tempTotalAmountOfBuildings + 1)));
		tempCostForMaxBuildingsAfter.oil = tempCostForMaxBuildingsAfter.oil + Math.floor(buildingsList[itemMax].initialCost.oil * Math.pow(playerState.buildingCostPower, (tempTotalAmountOfBuildings + 1)));
		tempCostForMaxBuildingsAfter.plastics = tempCostForMaxBuildingsAfter.plastics + Math.floor(buildingsList[itemMax].initialCost.plastics * Math.pow(playerState.buildingCostPower, (tempTotalAmountOfBuildings + 1)));
		tempCostForMaxBuildingsAfter.circuits = tempCostForMaxBuildingsAfter.circuits + Math.floor(buildingsList[itemMax].initialCost.circuits * Math.pow(playerState.buildingCostPower, (tempTotalAmountOfBuildings + 1)));
		tempCostForMaxBuildingsAfter.science = tempCostForMaxBuildingsAfter.science + Math.floor(buildingsList[itemMax].initialCost.science * Math.pow(playerState.buildingCostPower, (tempTotalAmountOfBuildings + 1)));
		tempTotalAmountOfBuildings++;
		buildingsToBuy++;
		
	}
	return {
		priceForBuyMax: tempCostForMaxBuildingsBefore,
		buildingsAmountForBuyMax: buildingsToBuy
	};
};


function pricePredictionForButtonTitle(building, amount) {		//return a value for the cost of  buying multiple buildings at the same time in the following increments: 25, 5, 1
	for (var item = 0; item < buildingsList.length; item++) {
		if (building == buildingsList[item].codeName) {
			if (amount == 25) {
				var tempCostForTwentyFiveBuildings = {
					minerals: 0,
					steel: 0,
					oil: 0,
					plastics: 0,
					circuits: 0,
					science: 0,
				};
				var tempTotalAmountOfBuildings = buildingsList[item].totalAmount;
				for (i = 0; i < 25; i++) {
					tempCostForTwentyFiveBuildings.minerals = tempCostForTwentyFiveBuildings.minerals + Math.floor(buildingsList[item].initialCost.minerals * Math.pow(playerState.buildingCostPower, tempTotalAmountOfBuildings));
					tempCostForTwentyFiveBuildings.steel = tempCostForTwentyFiveBuildings.steel + Math.floor(buildingsList[item].initialCost.steel * Math.pow(playerState.buildingCostPower, tempTotalAmountOfBuildings));
					tempCostForTwentyFiveBuildings.oil = tempCostForTwentyFiveBuildings.oil + Math.floor(buildingsList[item].initialCost.oil * Math.pow(playerState.buildingCostPower, tempTotalAmountOfBuildings));
					tempCostForTwentyFiveBuildings.plastics = tempCostForTwentyFiveBuildings.plastics + Math.floor(buildingsList[item].initialCost.plastics * Math.pow(playerState.buildingCostPower, tempTotalAmountOfBuildings));
					tempCostForTwentyFiveBuildings.circuits = tempCostForTwentyFiveBuildings.circuits + Math.floor(buildingsList[item].initialCost.circuits * Math.pow(playerState.buildingCostPower, tempTotalAmountOfBuildings));
					tempCostForTwentyFiveBuildings.science = tempCostForTwentyFiveBuildings.science + Math.floor(buildingsList[item].initialCost.science * Math.pow(playerState.buildingCostPower, tempTotalAmountOfBuildings));
					tempTotalAmountOfBuildings = tempTotalAmountOfBuildings + 1
				}
				return tempCostForTwentyFiveBuildings

			}
			if (amount == 5) {
				var tempCostForFiveBuildings = {
					minerals: 0,
					steel: 0,
					oil: 0,
					plastics: 0,
					circuits: 0,
					science: 0,
				};
				var tempTotalAmountOfBuildings = buildingsList[item].totalAmount;
				for (i = 0; i < 5; i++) {
					tempCostForFiveBuildings.minerals = tempCostForFiveBuildings.minerals + Math.floor(buildingsList[item].initialCost.minerals * Math.pow(playerState.buildingCostPower, tempTotalAmountOfBuildings));
					tempCostForFiveBuildings.steel = tempCostForFiveBuildings.steel + Math.floor(buildingsList[item].initialCost.steel * Math.pow(playerState.buildingCostPower, tempTotalAmountOfBuildings));
					tempCostForFiveBuildings.oil = tempCostForFiveBuildings.oil + Math.floor(buildingsList[item].initialCost.oil * Math.pow(playerState.buildingCostPower, tempTotalAmountOfBuildings));
					tempCostForFiveBuildings.plastics = tempCostForFiveBuildings.plastics + Math.floor(buildingsList[item].initialCost.plastics * Math.pow(playerState.buildingCostPower, tempTotalAmountOfBuildings));
					tempCostForFiveBuildings.circuits = tempCostForFiveBuildings.circuits + Math.floor(buildingsList[item].initialCost.circuits * Math.pow(playerState.buildingCostPower, tempTotalAmountOfBuildings));
					tempCostForFiveBuildings.science = tempCostForFiveBuildings.science + Math.floor(buildingsList[item].initialCost.science * Math.pow(playerState.buildingCostPower, tempTotalAmountOfBuildings));
					tempTotalAmountOfBuildings = tempTotalAmountOfBuildings + 1
				}
				return tempCostForFiveBuildings

			}
			if (amount == 1) {
				var tempCostForOneBuilding = {
					minerals: 0,
					steel: 0,
					oil: 0,
					plastics: 0,
					circuits: 0,
					science: 0,
				};
				tempCostForOneBuilding.minerals = Math.floor(buildingsList[item].initialCost.minerals * Math.pow(playerState.buildingCostPower, buildingsList[item].totalAmount));
				tempCostForOneBuilding.steel = Math.floor(buildingsList[item].initialCost.steel * Math.pow(playerState.buildingCostPower, buildingsList[item].totalAmount));
				tempCostForOneBuilding.oil = Math.floor(buildingsList[item].initialCost.oil * Math.pow(playerState.buildingCostPower, buildingsList[item].totalAmount));
				tempCostForOneBuilding.plastics = Math.floor(buildingsList[item].initialCost.plastics * Math.pow(playerState.buildingCostPower, buildingsList[item].totalAmount));
				tempCostForOneBuilding.circuits = Math.floor(buildingsList[item].initialCost.circuits * Math.pow(playerState.buildingCostPower, buildingsList[item].totalAmount));
				tempCostForOneBuilding.science = Math.floor(buildingsList[item].initialCost.science * Math.pow(playerState.buildingCostPower, buildingsList[item].totalAmount));
				return tempCostForOneBuilding;
				
			}
		}
	}
}

function unlockNewBuilding(research) {
	if (research == "res_laboratory" && document.getElementById("card-laboratory").style.display == "none") {
		document.getElementById("card-laboratory").style.display="flex";
	}
	if (research == "res_oil_extraction" && document.getElementById("card-pumpJack").style.display == "none") {
		document.getElementById("card-pumpJack").style.display="flex";
	}
	if (research == "res_deep_mining" && document.getElementById("card-deep-stone-mine").style.display == "none") {
		document.getElementById("card-deep-stone-mine").style.display="flex";
	}
	if (research == "res_underwater_mining" && document.getElementById("card-seabed-mine").style.display == "none") {
		document.getElementById("card-seabed-mine").style.display="flex";
	}
	if (research == "res_steel" && document.getElementById("card-steel-mill").style.display == "none") {
		document.getElementById("card-steel-mill").style.display="flex";
	}
	if (research == "res_plastics" && document.getElementById("card-chemical-plant").style.display == "none") {
		document.getElementById("card-chemical-plant").style.display="flex";
	}
	if (research == "res_circuits" && document.getElementById("card-electronics-plant").style.display == "none") {
		document.getElementById("card-electronics-plant").style.display="flex";
	}
}
var proceedIfTrue = true;		// switches between false and true to make sure the user cannot start multiple pieces of research simultaneously
function buyResearchTierOne(research){	// used to start and process all the research projects in the game
	for (var item = 0; item < researchTierOneList.length; item++) {
		if (research == researchTierOneList[item].codeName) {
			if (currencyList.science >= researchTierOneList[item].cost && proceedIfTrue == true) {
				proceedIfTrue = false;
				currencyList.science = currencyList.science - researchTierOneList[item].cost;
				document.getElementById("tab-research").className="";
				document.getElementById("current-research-title").setAttribute("class", "chalk-underline");
				document.getElementById("research-completed-mark").setAttribute("style", "visibility:hidden");
				/* Removes the completed research indicators */

				document.getElementById(researchTierOneList[item].codeName + "-div").removeAttribute("onClick");
				document.getElementById("science").innerHTML= abbrNum(currencyList.science, 2);
				document.getElementById("science-progress").setAttribute("max", researchTierOneList[item].duration);
				document.getElementById("science-progress").setAttribute("value", 0)
				document.getElementById("current-research-name").innerHTML=researchTierOneList[item].name;
				document.getElementById("research-current-image").setAttribute("src", researchTierOneList[item].icon);
				
				fillResearchProgressBar(researchTierOneList[item].duration);
				
				(function(item) {
					setTimeout(function() {
						tempResearch = researchTierOneList[item];
						tempResearch.unlocked = true;
						document.getElementById("research-completed-mark").setAttribute("style", "visibility:visible");
						document.getElementById("current-research-title").innerHTML="Finished research: ";
						document.getElementById("current-research-title").setAttribute("class", "current-research-animated chalk-underline");
						document.getElementById(tempResearch.codeName + "-div").setAttribute("style", "order: 2");
						document.getElementById(tempResearch.codeName + "-div").setAttribute("class", "research-completed tooltip");
						document.getElementById(tempResearch.codeName + "-div").removeAttribute("onClick");
						document.getElementById("tab-research").className="glowing-research";
						unlockNewBuilding(research);
						proceedIfTrue = true;
					}, researchTierOneList[item].duration);
				})(item);
			}
		}
	}
}

function buyBuilding(building, amount){ // used to increase the amount of buildings, update their costs and resource generation per sec. Should work with any building and amount in the following increments: 1, 5, 25, maximum possible.
    for (var item = 0; item < buildingsList.length; item++) {
		if (building == buildingsList[item].codeName) {
			if (amount == 1) {
				var currentCost = {
					minerals: Math.floor(buildingsList[item].initialCost.minerals * Math.pow(playerState.buildingCostPower,buildingsList[item].totalAmount)),
					steel: Math.floor(buildingsList[item].initialCost.steel * Math.pow(playerState.buildingCostPower,buildingsList[item].totalAmount)),
					oil: Math.floor(buildingsList[item].initialCost.oil * Math.pow(playerState.buildingCostPower,buildingsList[item].totalAmount)),
					plastics: Math.floor(buildingsList[item].initialCost.plastics * Math.pow(playerState.buildingCostPower,buildingsList[item].totalAmount)),
					circuits: Math.floor(buildingsList[item].initialCost.circuits * Math.pow(playerState.buildingCostPower,buildingsList[item].totalAmount)),
					science: Math.floor(buildingsList[item].initialCost.science * Math.pow(playerState.buildingCostPower,buildingsList[item].totalAmount))	
				     }     //works out the cost of the next building.
				if (currencyList.minerals >= currentCost.minerals && currencyList.steel >= currentCost.steel && currencyList.oil >= currentCost.oil && currencyList.plastics >= currentCost.plastics && currencyList.circuits >= currentCost.circuits && currencyList.science >= currentCost.science){                                   //checks whether the player can afford the building
					if (buildingsList[item].totalAmount == 0) {
						initiateInterval(item);
					}
					buildingsList[item].totalAmount = buildingsList[item].totalAmount + 1;                                   //increases number of the building by 1
					removeSpentResources(currentCost.minerals, currentCost.steel, currentCost.oil, currentCost.plastics, currentCost.circuits, currentCost.science);  //removes minerals spent AND updates the displayed amount of total resources              
					document.getElementById(buildingsList[item].codeName + 'TotalAmount').innerHTML = buildingsList[item].totalAmount;  //updates the number of buildings that is displayed
					
				}
			}
			else if (amount == 5) {
				// buys 5 buildings
				var tempCostForFiveBuildings = {
					minerals: 0,
					steel: 0,
					oil: 0,
					plastics: 0,
					circuits: 0,
					science: 0
				};
				var tempTotalAmountOfBuildings = buildingsList[item].totalAmount;
				for (i = 0; i < 5; i++) {
					tempCostForFiveBuildings = {
						minerals: tempCostForFiveBuildings.minerals + Math.floor(buildingsList[item].initialCost.minerals * Math.pow(playerState.buildingCostPower, tempTotalAmountOfBuildings)),
						steel: tempCostForFiveBuildings.steel + Math.floor(buildingsList[item].initialCost.steel * Math.pow(playerState.buildingCostPower, tempTotalAmountOfBuildings)),
						oil: tempCostForFiveBuildings.oil + Math.floor(buildingsList[item].initialCost.oil * Math.pow(playerState.buildingCostPower, tempTotalAmountOfBuildings)),
						plastics: tempCostForFiveBuildings.plastics + Math.floor(buildingsList[item].initialCost.plastics * Math.pow(playerState.buildingCostPower, tempTotalAmountOfBuildings)),
						circuits: tempCostForFiveBuildings.circuits + Math.floor(buildingsList[item].initialCost.circuits * Math.pow(playerState.buildingCostPower, tempTotalAmountOfBuildings)),
						science: tempCostForFiveBuildings.science + Math.floor(buildingsList[item].initialCost.science * Math.pow(playerState.buildingCostPower, tempTotalAmountOfBuildings))
					}
					tempTotalAmountOfBuildings = tempTotalAmountOfBuildings + 1
					console.log(tempTotalAmountOfBuildings);	
				}
				if (currencyList.minerals >= tempCostForFiveBuildings.minerals && currencyList.steel >= tempCostForFiveBuildings.steel && currencyList.oil >= tempCostForFiveBuildings.oil && currencyList.plastics >= tempCostForFiveBuildings.plastics && currencyList.circuits >= tempCostForFiveBuildings.circuits && currencyList.science >= tempCostForFiveBuildings.science) {
					if (buildingsList[item].totalAmount == 0) {
						initiateInterval(item);
					}
					buildingsList[item].totalAmount = buildingsList[item].totalAmount + 5;	//increases the amount of buildings by 5
					
					removeSpentResources(tempCostForFiveBuildings.minerals, tempCostForFiveBuildings.steel, tempCostForFiveBuildings.oil, tempCostForFiveBuildings.plastics, tempCostForFiveBuildings.circuits, tempCostForFiveBuildings.science);
					document.getElementById(buildingsList[item].codeName + 'TotalAmount').innerHTML = buildingsList[item].totalAmount;	//updates the amount of buildings to be displayed
				}
			}
			
			else if (amount == 25) {
				var tempCostForTwentyFiveBuildings = {
					minerals: 0,
					steel: 0,
					oil: 0,
					plastics: 0,
					circuits: 0,
					science: 0
				};
				var tempTotalAmountOfBuildings = buildingsList[item].totalAmount;
				for (i = 0; i < 25; i++) {
					tempCostForTwentyFiveBuildings = {
						minerals: tempCostForTwentyFiveBuildings.minerals + Math.floor(buildingsList[item].initialCost.minerals * Math.pow(playerState.buildingCostPower, tempTotalAmountOfBuildings)),
						steel: tempCostForTwentyFiveBuildings.steel + Math.floor(buildingsList[item].initialCost.steel * Math.pow(playerState.buildingCostPower, tempTotalAmountOfBuildings)),
						oil: tempCostForTwentyFiveBuildings.oil + Math.floor(buildingsList[item].initialCost.oil * Math.pow(playerState.buildingCostPower, tempTotalAmountOfBuildings)),
						plastics: tempCostForTwentyFiveBuildings.plastics + Math.floor(buildingsList[item].initialCost.plastics * Math.pow(playerState.buildingCostPower, tempTotalAmountOfBuildings)),
						circuits: tempCostForTwentyFiveBuildings.circuits + Math.floor(buildingsList[item].initialCost.circuits * Math.pow(playerState.buildingCostPower, tempTotalAmountOfBuildings)),
						science: tempCostForTwentyFiveBuildings.science + Math.floor(buildingsList[item].initialCost.science * Math.pow(playerState.buildingCostPower, tempTotalAmountOfBuildings))
					}
					
					tempTotalAmountOfBuildings = tempTotalAmountOfBuildings + 1
					console.log(tempTotalAmountOfBuildings);	
				}
				if (currencyList.minerals >= tempCostForTwentyFiveBuildings.minerals && currencyList.steel >= tempCostForTwentyFiveBuildings.steel && currencyList.oil >= tempCostForTwentyFiveBuildings.oil && currencyList.plastics >= tempCostForTwentyFiveBuildings.plastics && currencyList.circuits >= tempCostForTwentyFiveBuildings.circuits && currencyList.science >= tempCostForTwentyFiveBuildings.science) {
					if (buildingsList[item].totalAmount == 0) {
						initiateInterval(item);
					}
					buildingsList[item].totalAmount = buildingsList[item].totalAmount + 25;	//increases the amount of buildings by 25
					removeSpentResources(tempCostForTwentyFiveBuildings.minerals, tempCostForTwentyFiveBuildings.steel, tempCostForTwentyFiveBuildings.oil, tempCostForTwentyFiveBuildings.plastics, tempCostForTwentyFiveBuildings.circuits, tempCostForTwentyFiveBuildings.science);
					document.getElementById(buildingsList[item].codeName + 'TotalAmount').innerHTML = buildingsList[item].totalAmount;	//updates the amount of buildings to be displayed
				}
			}
			
			else  {
				// buys maximum possible amount of buildings
				var maxBuyStuff = checkForMaxPossible(item);
				if (currencyList.minerals >= maxBuyStuff.priceForBuyMax.minerals && currencyList.steel >= maxBuyStuff.priceForBuyMax.steel && currencyList.oil >= maxBuyStuff.priceForBuyMax.oil && currencyList.plastics >= maxBuyStuff.priceForBuyMax.plastics && currencyList.circuits >= maxBuyStuff.priceForBuyMax.circuits && currencyList.science >= maxBuyStuff.priceForBuyMax.science) {
					if (buildingsList[item].totalAmount == 0) {
						initiateInterval(item);
					}
					
					buildingsList[item].totalAmount = buildingsList[item].totalAmount + maxBuyStuff.buildingsAmountForBuyMax;
					removeSpentResources(maxBuyStuff.priceForBuyMax.minerals, maxBuyStuff.priceForBuyMax.steel, maxBuyStuff.priceForBuyMax.oil, maxBuyStuff.priceForBuyMax.plastics, maxBuyStuff.priceForBuyMax.circuits, maxBuyStuff.priceForBuyMax.science);
					document.getElementById(buildingsList[item].codeName + 'TotalAmount').innerHTML = buildingsList[item].totalAmount;
				}
			}
			if ((buildingsList[item].totalAmount * buildingsList[item].stuffPerTick.minerals / buildingsList[item].tickSpeed * 1000) > 0) {
				document.getElementById(buildingsList[item].codeName + 'StonePerSec').innerHTML = abbrNum(Number((buildingsList[item].totalAmount * buildingsList[item].stuffPerTick.minerals) / buildingsList[item].tickSpeed * 1000), 2);
			}
			else if ((buildingsList[item].totalAmount * buildingsList[item].stuffPerTick.steel / buildingsList[item].tickSpeed * 1000) > 0) {
				document.getElementById(buildingsList[item].codeName + 'StonePerSec').innerHTML = abbrNum(Number((buildingsList[item].totalAmount * buildingsList[item].stuffPerTick.steel) / buildingsList[item].tickSpeed * 1000), 2);
			}
			else if ((buildingsList[item].totalAmount * buildingsList[item].stuffPerTick.oil / buildingsList[item].tickSpeed * 1000) > 0) {
				document.getElementById(buildingsList[item].codeName + 'StonePerSec').innerHTML = abbrNum(Number((buildingsList[item].totalAmount * buildingsList[item].stuffPerTick.oil) / buildingsList[item].tickSpeed * 1000), 2);
			}
			else if ((buildingsList[item].totalAmount * buildingsList[item].stuffPerTick.plastics / buildingsList[item].tickSpeed * 1000) > 0) {
				document.getElementById(buildingsList[item].codeName + 'StonePerSec').innerHTML = abbrNum(Number((buildingsList[item].totalAmount * buildingsList[item].stuffPerTick.plastics) / buildingsList[item].tickSpeed * 1000), 2);
			}
			else if ((buildingsList[item].totalAmount * buildingsList[item].stuffPerTick.circuits / buildingsList[item].tickSpeed * 1000) > 0) {
				document.getElementById(buildingsList[item].codeName + 'StonePerSec').innerHTML = abbrNum(Number((buildingsList[item].totalAmount * buildingsList[item].stuffPerTick.circuits) / buildingsList[item].tickSpeed * 1000), 2);
			}
			else if ((buildingsList[item].totalAmount * buildingsList[item].stuffPerTick.science / buildingsList[item].tickSpeed * 1000) > 0) {
				document.getElementById(buildingsList[item].codeName + 'StonePerSec').innerHTML = abbrNum(Number((buildingsList[item].totalAmount * buildingsList[item].stuffPerTick.science) / buildingsList[item].tickSpeed * 1000), 2);
			};
			
			//updates the building production per second displayed
			var nextCost = Math.floor(buildingsList[item].initialCost.minerals * Math.pow(playerState.buildingCostPower,buildingsList[item].totalAmount));       //works out the cost of the next building for the player to see
			document.getElementById(buildingsList[item].codeName + 'Cost').innerHTML = abbrNum(nextCost, 2);  //updates the building cost to be displayed
		}
		updateButtonTitles(item);
	}
};

function fillProgressBar(building, tickLength) {
	
	var elem = document.getElementById(building + "ProgressBar");
	var width = 1;
	var id = setInterval(frame, (tickLength / 100));
	function frame() {
		if (width >= 100) {
			elem.style.width = "0%";
			clearInterval(id);
		}
		else {
			width++;
			elem.style.width = width + '%';
		}
	}
}

function remainingTimeTransformation(duration) {
	var seconds = Math.floor(duration / 1000); // takes the duration in ms and converts it to seconds
	var minutes = Math.floor(seconds / 60); // converts seconds into minutes
	var hours = Math.floor(minutes / 60);
	
	hours = (hours >=10) ? hours : "0" + hours;
	minutes = minutes - (hours * 60);
	minutes = (minutes >= 10) ? minutes : "0" + minutes;
	
	seconds = Math.floor(seconds % 60);
	seconds = (seconds >= 10) ? seconds : "0" + seconds;
	
	return hours + ":" + minutes + ":" + seconds;

}

function fillResearchProgressBar(duration) {	//fills the research progress bar
	var elem = document.getElementById("science-progress");
	var id = setInterval(frame, (1000));
	var tempMax = Number(elem.getAttribute("max"));
	var tempValue = Number(elem.getAttribute("value"));
	function frame() {
		if (tempValue >= tempMax) {
			clearInterval(id);
		}
		else {
			tempValue = tempValue + 1000;
			elem.setAttribute("value", tempValue);
			document.getElementById("research-time-left").innerHTML = (remainingTimeTransformation(tempMax - tempValue));
			
		}
	
	}
}

function removeSpentResources(minerals, steel, oil, plastics, circuits, science) {		//function to remove (both from actual values AND displayed) minerals spent while buying a building, ONLY use with buildings/advanced buildings!
	if (minerals > 0) {
		currencyList.minerals = currencyList.minerals - minerals;
		document.getElementById('minerals').innerHTML = abbrNum(currencyList.minerals, 2)
	};
	if (steel > 0) {
		currencyList.steel = currencyList.steel - steel;
		document.getElementById('steel').innerHTML = abbrNum(currencyList.steel, 2)
	};
	if (oil > 0) {
		currencyList.oil = currencyList.oil - oil;
		document.getElementById('oil').innerHTML = abbrNum(currencyList.oil, 2)
	};
	if (plastics > 0) {
		currencyList.plastics = currencyList.plastics - plastics;
		document.getElementById('plastics').innerHTML = abbrNum(currencyList.plastics, 2)
	};
	if (circuits > 0) {
		currencyList.circuits = currencyList.circuits - circuits;
		document.getElementById('circuits').innerHTML = abbrNum(currencyList.circuits, 2)
	};
	if (science > 0) {
		currencyList.science = currencyList.science - science;
		document.getElementById('science').innerHTML = abbrNum(currencyList.science, 2)
	};
}

function intervalAddResources(minerals, steel, oil, plastics, circuits, science, building) {		//used by the buy/create resource generation interval function to determine how much of each resource should be added per building production tick
	if (minerals > 0) {
		currencyList.minerals = currencyList.minerals + minerals;
		document.getElementById('minerals').innerHTML = abbrNum(currencyList.minerals, 2)		
	};
	if (steel > 0) {
		if (currencyList.minerals >= buildingsList[building].consumptionPerTick.minerals * buildingsList[building].totalAmount) {
			currencyList.steel = currencyList.steel + steel;
			currencyList.minerals = currencyList.minerals - buildingsList[building].consumptionPerTick.minerals * buildingsList[building].totalAmount;
			document.getElementById('steel').innerHTML = abbrNum(currencyList.steel, 2)
			document.getElementById('minerals').innerHTML = abbrNum(currencyList.minerals, 2)
		}
		else {
			document.getElementById("insufficient-minerals").style.display="inline";
			document.getElementById("insufficient-minerals").style.opacity=1;
			setTimeout(function(){ 
                document.getElementById("insufficient-minerals").style.opacity=0;
                document.getElementById("insufficient-minerals").style.display="none"; 
            }, 1000);
		};
	};
	if (oil > 0) {
		currencyList.oil = currencyList.oil + oil;
		document.getElementById('oil').innerHTML = abbrNum(currencyList.oil, 2)
	};
	if (plastics > 0) {
		if (currencyList.oil >= buildingsList[building].consumptionPerTick.oil * buildingsList[building].totalAmount) {
			currencyList.plastics = currencyList.plastics + plastics;
			currencyList.oil = currencyList.oil - buildingsList[building].consumptionPerTick.oil * buildingsList[building].totalAmount;
			document.getElementById('oil').innerHTML = abbrNum(currencyList.oil, 2)
			document.getElementById('plastics').innerHTML = abbrNum(currencyList.plastics, 2)
		}
		else {
			document.getElementById("insufficient-oil").style.display="inline";
			document.getElementById("insufficient-oil").style.opacity=1;
			setTimeout(function(){ 
                document.getElementById("insufficient-oil").style.opacity=0;
                document.getElementById("insufficient-oil").style.display="none"; 
            }, 1000);
		};
	};
	if (circuits > 0) {
		if (currencyList.minerals >= buildingsList[building].consumptionPerTick.minerals * buildingsList[building].totalAmount && currencyList.plastics >= buildingsList[building].consumptionPerTick.plastics * buildingsList[building].totalAmount && currencyList.steel >= buildingsList[building].consumptionPerTick.steel * buildingsList[building].totalAmount) {
			currencyList.circuits = currencyList.circuits + circuits;
			currencyList.minerals = currencyList.minerals - buildingsList[building].consumptionPerTick.minerals * buildingsList[building].totalAmount;
			currencyList.plastics = currencyList.plastics - buildingsList[building].consumptionPerTick.plastics * buildingsList[building].totalAmount;
			currencyList.steel = currencyList.steel - buildingsList[building].consumptionPerTick.steel * buildingsList[building].totalAmount;
			document.getElementById('circuits').innerHTML = abbrNum(currencyList.circuits, 2);
			document.getElementById('minerals').innerHTML = abbrNum(currencyList.minerals, 2);
			document.getElementById('steel').innerHTML = abbrNum(currencyList.steel, 2);
		}
		else  {
			document.getElementById("insufficient-resources").style.display="inline";
			document.getElementById("insufficient-resources").style.opacity=1;
			setTimeout(function(){ 
                document.getElementById("insufficient-resources").style.opacity=0;
                document.getElementById("insufficient-resources").style.display="none"; 
            }, 1000);
		}
	};
	if (science > 0) {
		currencyList.science = currencyList.science + science;
		document.getElementById('science').innerHTML = abbrNum(currencyList.science, 2)
	};
}


function resetStones(){
	currencyList.minerals = 0;
	currencyList.steel = 0;
	currencyList.oil = 0;
	currencyList.plastics = 0;
	currencyList.circuits = 0;
	document.getElementById("minerals").innerHTML = abbrNum(currencyList.minerals, 2);
	document.getElementById("steel").innerHTML = abbrNum(currencyList.steel, 2);
	document.getElementById("oil").innerHTML = abbrNum(currencyList.oil, 2);
	document.getElementById("plastics").innerHTML = abbrNum(currencyList.plastics, 2);
	document.getElementById("circuits").innerHTML = abbrNum(currencyList.circuits, 2);
};

function cheat5000() {
	currencyList.minerals = currencyList.minerals + 5000;
	currencyList.steel = currencyList.steel + 5000;
	currencyList.oil = currencyList.oil + 5000;
	currencyList.plastics = currencyList.plastics + 5000;
	currencyList.circuits = currencyList.circuits + 5000;
	document.getElementById("minerals").innerHTML = abbrNum(currencyList.minerals, 2);
	document.getElementById("steel").innerHTML = abbrNum(currencyList.steel, 2);
	document.getElementById("oil").innerHTML = abbrNum(currencyList.oil, 2);
	document.getElementById("plastics").innerHTML = abbrNum(currencyList.plastics, 2);
	document.getElementById("circuits").innerHTML = abbrNum(currencyList.circuits, 2);
}

function cheatQi() {
	currencyList.minerals = currencyList.minerals + 5000000000000000000;
	currencyList.steel = currencyList.steel + 5000000000000000000;
	currencyList.oil = currencyList.oil + 5000000000000000000;
	currencyList.plastics = currencyList.plastics + 5000000000000000000;
	currencyList.circuits = currencyList.circuits + 5000000000000000000;
	document.getElementById("minerals").innerHTML = abbrNum(currencyList.minerals, 2);
	document.getElementById("steel").innerHTML = abbrNum(currencyList.steel, 2);
	document.getElementById("oil").innerHTML = abbrNum(currencyList.oil, 2);
	document.getElementById("plastics").innerHTML = abbrNum(currencyList.plastics, 2);
	document.getElementById("circuits").innerHTML = abbrNum(currencyList.circuits, 2);
}

function cheatScience() {
	currencyList.science = currencyList.science + 5000;
	document.getElementById("science").innerHTML = abbrNum(currencyList.science, 2);
}

function openTab(evt, tabName) { // Navigation tab logic
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabContent" and hide them
    tabContent = document.getElementsByClassName("tabContent");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function updateButtonTitles(item) {		// updates button titles for all production buildings, takes in the array number to determine which building from buildingsList it should process
	document.getElementById(buildingsList[item].codeName + "ButtonBuyFive").setAttribute("title", "Cost: " + abbrNum(Number(pricePredictionForButtonTitle(buildingsList[item].codeName, 5).minerals), 2) + " minerals" + ", " + abbrNum(Number(pricePredictionForButtonTitle(buildingsList[item].codeName, 5).steel), 2) + " steel" + ", " + abbrNum(Number(pricePredictionForButtonTitle(buildingsList[item].codeName, 5).oil), 2) + " oil" + ", " + abbrNum(Number(pricePredictionForButtonTitle(buildingsList[item].codeName, 5).plastics), 2) + " plastics" + ", " + abbrNum(Number(pricePredictionForButtonTitle(buildingsList[item].codeName, 5).circuits), 2) + " circuits" + ", " + abbrNum(Number(pricePredictionForButtonTitle(buildingsList[item].codeName, 5).science), 2) + " science");
	document.getElementById(buildingsList[item].codeName + "ButtonBuyOne").setAttribute("title", "Cost: " + abbrNum(Number(pricePredictionForButtonTitle(buildingsList[item].codeName, 1).minerals), 2) + " minerals" + ", " + abbrNum(Number(pricePredictionForButtonTitle(buildingsList[item].codeName, 1).steel), 2) + " steel" + ", " + abbrNum(Number(pricePredictionForButtonTitle(buildingsList[item].codeName, 1).oil), 2) + " oil" + ", " + abbrNum(Number(pricePredictionForButtonTitle(buildingsList[item].codeName, 1).plastics), 2) + " plastics" + ", " + abbrNum(Number(pricePredictionForButtonTitle(buildingsList[item].codeName, 1).circuits), 2) + " circuits" + ", " + abbrNum(Number(pricePredictionForButtonTitle(buildingsList[item].codeName, 1).science), 2) + " science");
	document.getElementById(buildingsList[item].codeName + "ButtonBuyTwentyFive").setAttribute("title", "Cost: " + abbrNum(Number(pricePredictionForButtonTitle(buildingsList[item].codeName, 25).minerals), 2) + " minerals" + ", " + abbrNum(Number(pricePredictionForButtonTitle(buildingsList[item].codeName, 25).steel), 2) + " steel" + ", " + abbrNum(Number(pricePredictionForButtonTitle(buildingsList[item].codeName, 25).oil), 2) + " oil" + ", " + abbrNum(Number(pricePredictionForButtonTitle(buildingsList[item].codeName, 25).plastics), 2) + " plastics" + ", " + abbrNum(Number(pricePredictionForButtonTitle(buildingsList[item].codeName, 25).circuits), 2) + " circuits" + ", " + abbrNum(Number(pricePredictionForButtonTitle(buildingsList[item].codeName, 25).science), 2) + " science");
}

function initiateInterval(item) {		// initiates the resorce generation intervals
	fillProgressBar(buildingsList[item].codeName, buildingsList[item].tickSpeed);
	(function(item) {
		if (buildingsList[item].codeName == "stoneExtractor") {
			intervalStoneExtractor = window.setInterval(function() {	//fills the progress bar and adds produced resource for the building every tickSpeed/1000 seconds 
				intervalAddResources(buildingsList[item].stuffPerTick.minerals * buildingsList[item].totalAmount, buildingsList[item].stuffPerTick.steel * buildingsList[item].totalAmount, buildingsList[item].stuffPerTick.oil * buildingsList[item].totalAmount, buildingsList[item].stuffPerTick.plastics * buildingsList[item].totalAmount, buildingsList[item].stuffPerTick.circuits * buildingsList[item].totalAmount, buildingsList[item].stuffPerTick.science * buildingsList[item].totalAmount, item);
				fillProgressBar(buildingsList[item].codeName, buildingsList[item].tickSpeed);
			}, buildingsList[item].tickSpeed);
		};
		if (buildingsList[item].codeName == "deepStoneMine") {
			intervalDeepMine = window.setInterval(function() {	//fills the progress bar and adds produced resource for the building every tickSpeed/1000 seconds 
				intervalAddResources(buildingsList[item].stuffPerTick.minerals * buildingsList[item].totalAmount, buildingsList[item].stuffPerTick.steel * buildingsList[item].totalAmount, buildingsList[item].stuffPerTick.oil * buildingsList[item].totalAmount, buildingsList[item].stuffPerTick.plastics * buildingsList[item].totalAmount, buildingsList[item].stuffPerTick.circuits * buildingsList[item].totalAmount, buildingsList[item].stuffPerTick.science * buildingsList[item].totalAmount, item);
				fillProgressBar(buildingsList[item].codeName, buildingsList[item].tickSpeed);
			}, buildingsList[item].tickSpeed);
		};
		if (buildingsList[item].codeName == "seabedMine") {
			intervalSeabedMine = window.setInterval(function() {	//fills the progress bar and adds produced resource for the building every tickSpeed/1000 seconds 
				intervalAddResources(buildingsList[item].stuffPerTick.minerals * buildingsList[item].totalAmount, buildingsList[item].stuffPerTick.steel * buildingsList[item].totalAmount, buildingsList[item].stuffPerTick.oil * buildingsList[item].totalAmount, buildingsList[item].stuffPerTick.plastics * buildingsList[item].totalAmount, buildingsList[item].stuffPerTick.circuits * buildingsList[item].totalAmount, buildingsList[item].stuffPerTick.science * buildingsList[item].totalAmount, item);
				fillProgressBar(buildingsList[item].codeName, buildingsList[item].tickSpeed);
			}, buildingsList[item].tickSpeed);
		};
		if (buildingsList[item].codeName == "pumpJack") {
			intervalPumpJack = window.setInterval(function() {	//fills the progress bar and adds produced resource for the building every tickSpeed/1000 seconds 
				intervalAddResources(buildingsList[item].stuffPerTick.minerals * buildingsList[item].totalAmount, buildingsList[item].stuffPerTick.steel * buildingsList[item].totalAmount, buildingsList[item].stuffPerTick.oil * buildingsList[item].totalAmount, buildingsList[item].stuffPerTick.plastics * buildingsList[item].totalAmount, buildingsList[item].stuffPerTick.circuits * buildingsList[item].totalAmount, buildingsList[item].stuffPerTick.science * buildingsList[item].totalAmount, item);
				fillProgressBar(buildingsList[item].codeName, buildingsList[item].tickSpeed);
			}, buildingsList[item].tickSpeed);
		};
		if (buildingsList[item].codeName == "laboratory") {
			intervalLaboratory = window.setInterval(function() {	//fills the progress bar and adds produced resource for the building every tickSpeed/1000 seconds 
				intervalAddResources(buildingsList[item].stuffPerTick.minerals * buildingsList[item].totalAmount, buildingsList[item].stuffPerTick.steel * buildingsList[item].totalAmount, buildingsList[item].stuffPerTick.oil * buildingsList[item].totalAmount, buildingsList[item].stuffPerTick.plastics * buildingsList[item].totalAmount, buildingsList[item].stuffPerTick.circuits * buildingsList[item].totalAmount, buildingsList[item].stuffPerTick.science * buildingsList[item].totalAmount, item);
				fillProgressBar(buildingsList[item].codeName, buildingsList[item].tickSpeed);
			}, buildingsList[item].tickSpeed);
		};
		if (buildingsList[item].codeName == "steelMill") {
			intervalSteelMill = window.setInterval(function() {	//fills the progress bar and adds produced resource for the building every tickSpeed/1000 seconds 
				intervalAddResources(buildingsList[item].stuffPerTick.minerals * buildingsList[item].totalAmount, buildingsList[item].stuffPerTick.steel * buildingsList[item].totalAmount, buildingsList[item].stuffPerTick.oil * buildingsList[item].totalAmount, buildingsList[item].stuffPerTick.plastics * buildingsList[item].totalAmount, buildingsList[item].stuffPerTick.circuits * buildingsList[item].totalAmount, buildingsList[item].stuffPerTick.science * buildingsList[item].totalAmount, item);
				fillProgressBar(buildingsList[item].codeName, buildingsList[item].tickSpeed);
			}, buildingsList[item].tickSpeed);
		};
		if (buildingsList[item].codeName == "chemicalPlant") {
			intervalChemicalPlant = window.setInterval(function() {	//fills the progress bar and adds produced resource for the building every tickSpeed/1000 seconds 
				intervalAddResources(buildingsList[item].stuffPerTick.minerals * buildingsList[item].totalAmount, buildingsList[item].stuffPerTick.steel * buildingsList[item].totalAmount, buildingsList[item].stuffPerTick.oil * buildingsList[item].totalAmount, buildingsList[item].stuffPerTick.plastics * buildingsList[item].totalAmount, buildingsList[item].stuffPerTick.circuits * buildingsList[item].totalAmount, buildingsList[item].stuffPerTick.science * buildingsList[item].totalAmount, item);
				fillProgressBar(buildingsList[item].codeName, buildingsList[item].tickSpeed);
			}, buildingsList[item].tickSpeed);
		};
		if (buildingsList[item].codeName == "electronicsPlant") {
			intervalElectronicsPlant = window.setInterval(function() {	//fills the progress bar and adds produced resource for the building every tickSpeed/1000 seconds 
				intervalAddResources(buildingsList[item].stuffPerTick.minerals * buildingsList[item].totalAmount, buildingsList[item].stuffPerTick.steel * buildingsList[item].totalAmount, buildingsList[item].stuffPerTick.oil * buildingsList[item].totalAmount, buildingsList[item].stuffPerTick.plastics * buildingsList[item].totalAmount, buildingsList[item].stuffPerTick.circuits * buildingsList[item].totalAmount, buildingsList[item].stuffPerTick.science * buildingsList[item].totalAmount, item);
				fillProgressBar(buildingsList[item].codeName, buildingsList[item].tickSpeed);
			}, buildingsList[item].tickSpeed);
		}
	})(item);
}

window.setInterval(function() {  // checking every 0.3 sec to enable or disable buttons
	for (var itemButton = 0; itemButton < buildingsList.length; itemButton++) {
		if (pricePredictionForButtonTitle(buildingsList[itemButton].codeName, 25).minerals <= currencyList.minerals && pricePredictionForButtonTitle(buildingsList[itemButton].codeName, 25).steel <= currencyList.steel && pricePredictionForButtonTitle(buildingsList[itemButton].codeName, 25).oil <= currencyList.oil && pricePredictionForButtonTitle(buildingsList[itemButton].codeName, 25).plastics <= currencyList.plastics && pricePredictionForButtonTitle(buildingsList[itemButton].codeName, 25).circuits <= currencyList.circuits && pricePredictionForButtonTitle(buildingsList[itemButton].codeName, 25).science <= currencyList.science) {
			document.getElementById(buildingsList[itemButton].codeName + "ButtonBuyTwentyFive").disabled = false;
			document.getElementById(buildingsList[itemButton].codeName + "ButtonBuyFive").disabled = false;
			document.getElementById(buildingsList[itemButton].codeName + "ButtonBuyOne").disabled = false;
			document.getElementById(buildingsList[itemButton].codeName + "ButtonBuyMax").disabled = false;
		}
		else if (pricePredictionForButtonTitle(buildingsList[itemButton].codeName, 5).minerals <= currencyList.minerals && pricePredictionForButtonTitle(buildingsList[itemButton].codeName, 5).steel <= currencyList.steel && pricePredictionForButtonTitle(buildingsList[itemButton].codeName, 5).oil <= currencyList.oil && pricePredictionForButtonTitle(buildingsList[itemButton].codeName, 5).plastics <= currencyList.plastics && pricePredictionForButtonTitle(buildingsList[itemButton].codeName, 5).circuits <= currencyList.circuits && pricePredictionForButtonTitle(buildingsList[itemButton].codeName, 5).science <= currencyList.science) {
			document.getElementById(buildingsList[itemButton].codeName + "ButtonBuyFive").disabled = false;
			document.getElementById(buildingsList[itemButton].codeName + "ButtonBuyOne").disabled = false;
			document.getElementById(buildingsList[itemButton].codeName + "ButtonBuyTwentyFive").disabled = true;
			document.getElementById(buildingsList[itemButton].codeName + "ButtonBuyMax").disabled = false;
		}
		else if (pricePredictionForButtonTitle(buildingsList[itemButton].codeName, 1).minerals <= currencyList.minerals && pricePredictionForButtonTitle(buildingsList[itemButton].codeName, 1).steel <= currencyList.steel && pricePredictionForButtonTitle(buildingsList[itemButton].codeName, 1).oil <= currencyList.oil && pricePredictionForButtonTitle(buildingsList[itemButton].codeName, 1).plastics <= currencyList.plastics && pricePredictionForButtonTitle(buildingsList[itemButton].codeName, 1).circuits <= currencyList.circuits && pricePredictionForButtonTitle(buildingsList[itemButton].codeName, 1).science <= currencyList.science) {
			document.getElementById(buildingsList[itemButton].codeName + "ButtonBuyOne").disabled = false;
			document.getElementById(buildingsList[itemButton].codeName + "ButtonBuyFive").disabled = true;
			document.getElementById(buildingsList[itemButton].codeName + "ButtonBuyTwentyFive").disabled = true;
			document.getElementById(buildingsList[itemButton].codeName + "ButtonBuyMax").disabled = false;
		}
		else {
			document.getElementById(buildingsList[itemButton].codeName + "ButtonBuyTwentyFive").disabled = true;
			document.getElementById(buildingsList[itemButton].codeName + "ButtonBuyFive").disabled = true;
			document.getElementById(buildingsList[itemButton].codeName + "ButtonBuyOne").disabled = true;
			document.getElementById(buildingsList[itemButton].codeName + "ButtonBuyMax").disabled = true;
		}
		var maxStuff = checkForMaxPossible(itemButton);
		document.getElementById(buildingsList[itemButton].codeName + "ButtonBuyMax").setAttribute("title", abbrNum(maxStuff.priceForBuyMax.minerals, 2) + " minerals" + ", " + abbrNum(maxStuff.priceForBuyMax.steel, 2) + " steel" + ", " + abbrNum(maxStuff.priceForBuyMax.oil, 2) + " oil" + ", " + abbrNum(maxStuff.priceForBuyMax.plastics, 2) + " plastics" + ", " + abbrNum(maxStuff.priceForBuyMax.circuits, 2) + " circuits" + ", " + abbrNum(maxStuff.priceForBuyMax.science, 2) + " science" + " for " + maxStuff.buildingsAmountForBuyMax + " buildings.");
	}
	//* Counts the resource-per-sec for all resources so that it can be used further to know if there is a deficiency or what is the share of specific resource generation buildings in total production *//
	currenciesPerSec.minerals = ((buildingsList[0].stuffPerTick.minerals * buildingsList[0].totalAmount) / buildingsList[0].tickSpeed * 1000) + ((buildingsList[1].stuffPerTick.minerals * buildingsList[1].totalAmount) / buildingsList[1].tickSpeed * 1000) + ((buildingsList[2].stuffPerTick.minerals * buildingsList[2].totalAmount) / buildingsList[2].tickSpeed * 1000);
	currenciesPerSec.oil = (buildingsList[3].stuffPerTick.oil * buildingsList[3].totalAmount) / buildingsList[3].tickSpeed * 1000;
	currenciesPerSec.science = (buildingsList[4].stuffPerTick.science * buildingsList[4].totalAmount) / buildingsList[4].tickSpeed * 1000;
	currenciesPerSec.steel = (buildingsList[5].stuffPerTick.steel * buildingsList[5].totalAmount) / buildingsList[5].tickSpeed * 1000;
	currenciesPerSec.plastics = (buildingsList[6].stuffPerTick.plastics * buildingsList[6].totalAmount) / buildingsList[6].tickSpeed * 1000;
	currenciesPerSec.circuits = (buildingsList[7].stuffPerTick.circuits * buildingsList[7].totalAmount) / buildingsList[7].tickSpeed * 1000;

	consumptionPerSec.minerals = ((buildingsList[5].consumptionPerTick.minerals * buildingsList[5].totalAmount) / buildingsList[5].tickSpeed * 1000) + ((buildingsList[7].consumptionPerTick.minerals * buildingsList[7].totalAmount) / buildingsList[7].tickSpeed * 1000);
	consumptionPerSec.oil = (buildingsList[6].consumptionPerTick.oil + buildingsList[6].totalAmount) / buildingsList[6].tickSpeed * 1000;
	consumptionPerSec.steel = (buildingsList[7].consumptionPerTick.steel * buildingsList[7].totalAmount) / buildingsList[7].tickSpeed * 1000;
	consumptionPerSec.plastics = (buildingsList[7].consumptionPerTick.plastics * buildingsList[7].totalAmount) / buildingsList[7].tickSpeed * 1000;
}, 300);
