var currencyList = {
	minerals: 0,
	steel: 0,
	oil: 0,
	plastics: 0,
	circuits: 0,
	science: 0,
};

var playerState = {
	buildingCostPower: 1.1
}


function abbrNum(number, decPlaces) { 		//abbreviates numbers for display, courtesy of Jeff B (https://stackoverflow.com/users/179216/jeff-b0)
    // 2 decimal places => 100, 3 => 1000, etc
    decPlaces = Math.pow(10,decPlaces);

    // Enumerate number abbreviations
	var abbrev = [ "K", "M", "B", "T", "Qa", "Qi"];		//more if ever needed: , "Sx", "Sp", "Oc", "No", "Dc", "UnD", "DoD", "TrD", "QaD", "QiD"

    // Go through the array backwards, so we do the largest first
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

    return number;
}


var tempItem = undefined;
var stoneTest= 0;
var science = 0;
var basicResearchSpeed = 1000;

function tooltipCreation(list, item) {
	if (list == buildingsList) {
		document.getElementById(buildingsList[item].codeName + "Fluff").innerHTML = buildingsList[item].fluffText;
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

function hoverMineBarCreation(list, item) {
	doc
}

function researchSpeed() {
	var bonusLevelI = researchTierOneList[0].level * researchTierOneList[0].levelBonus;
	return basicResearchSpeed + (bonusLevelI * basicResearchSpeed);
}

function stoneClick(number) {
	currencyList.minerals = currencyList.minerals + number;
	document.getElementById("minerals").innerHTML = abbrNum(currencyList.minerals, 2);
};

function checkForMaxPossible(itemMax) {		//checks how many buildings of a certain type the player can buy and their cost
	var tempCostForMaxBuildingsBefore = 0;
	var tempCostForMaxBuildingsAfter = Math.floor(buildingsList[itemMax].initialCost.minerals * Math.pow(playerState.buildingCostPower, buildingsList[itemMax].totalAmount))
	var tempTotalAmountOfBuildings = buildingsList[itemMax].totalAmount;
	var buildingsToBuy = 0;
	while (tempCostForMaxBuildingsAfter <= currencyList.minerals) {
		tempCostForMaxBuildingsBefore = tempCostForMaxBuildingsBefore + Math.floor(buildingsList[itemMax].initialCost.minerals * Math.pow(playerState.buildingCostPower, tempTotalAmountOfBuildings))
		tempCostForMaxBuildingsAfter = tempCostForMaxBuildingsAfter + Math.floor(buildingsList[itemMax].initialCost.minerals * Math.pow(playerState.buildingCostPower, (tempTotalAmountOfBuildings + 1)))
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
				var tempCostForTwentyFiveBuildings = 0;
				var tempTotalAmountOfBuildings = buildingsList[item].totalAmount;
				for (i = 0; i < 25; i++) {
					tempCostForTwentyFiveBuildings = tempCostForTwentyFiveBuildings + Math.floor(buildingsList[item].initialCost.minerals * Math.pow(playerState.buildingCostPower, tempTotalAmountOfBuildings))
					tempTotalAmountOfBuildings = tempTotalAmountOfBuildings + 1
				}
				return tempCostForTwentyFiveBuildings

			}
			if (amount == 5) {
				var tempCostForFiveBuildings = 0;
				var tempTotalAmountOfBuildings = buildingsList[item].totalAmount;
				for (i = 0; i < 5; i++) {
					tempCostForFiveBuildings = tempCostForFiveBuildings + (Math.floor(buildingsList[item].initialCost.minerals * Math.pow(playerState.buildingCostPower, tempTotalAmountOfBuildings)))
					tempTotalAmountOfBuildings = tempTotalAmountOfBuildings + 1
				}
				return tempCostForFiveBuildings

			}
			if (amount == 1) {
				var tempCostForOneBuilding = 0;
				tempCostForOneBuilding = Math.floor(buildingsList[item].initialCost.minerals * Math.pow(playerState.buildingCostPower, buildingsList[item].totalAmount));
				return tempCostForOneBuilding;

			}
		}
	}
}

function buyResearchTierOne(research){	// used to start and process all the research projects in the game
	for (var item = 0; item < researchTierOneList.length; item++) {
		if (research == researchTierOneList[item].codeName) {
			if (currencyList.science > researchTierOneList[item].cost) {
				currencyList.science = currencyList.science - researchTierOneList[item].cost;
				document.getElementById(researchTierOneList[item].codeName + "-div").removeAttribute("onClick");
				document.getElementById("science").innerHTML=currencyList.science;
				document.getElementById("science-progress").setAttribute("max", researchTierOneList[item].duration);
				document.getElementById("science-progress").setAttribute("value", 0)
				document.getElementById("current-research-name").innerHTML=researchTierOneList[item].name;
				document.getElementById("research-current-image").setAttribute("src", researchTierOneList[item].icon);
				
				fillResearchProgressBar(researchTierOneList[item].duration);
				
				(function(item) {
					setTimeout(function() {
						tempResearch = researchTierOneList[item];
						tempResearch.unlocked = true;
						tempResearch.icon = 'img/research/icon_' + tempResearch.codeName + '_unlocked.png';
						document.getElementById("research-current-image").setAttribute("src", tempResearch.icon);
						document.getElementById(tempResearch.codeName).setAttribute("src", tempResearch.icon);
						document.getElementById("current-research-title").innerHTML="Finished research: ";
						document.getElementById("current-research-title").setAttribute("class", "current-research-animated chalk-underline");
						document.getElementById(tempResearch.codeName + "-div").setAttribute("style", "order: 2");
						document.getElementById(tempResearch.codeName + "-div").setAttribute("class", "research-completed tooltip");
						document.getElementById(tempResearch.codeName + "-div").removeAttribute("onClick");
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
					steel: 0,
					oil: 0,
					plastics: 0,
					circuits: 0,
					science: 0	
				     }     //works out the cost of the next building.
				if (currencyList.minerals >= currentCost.minerals && currencyList.steel >= currentCost.steel && currencyList.oil >= currentCost.oil && currencyList.plastics >= currentCost.plastics && currencyList.circuits >= currentCost.circuits && currencyList.science >= currentCost.science){                                   //checks whether the player can afford the building
					if (buildingsList[item].totalAmount == 0) {
						fillProgressBar(buildingsList[item].codeName, buildingsList[item].tickSpeed);
						(function(item) {
							window.setInterval(function() {	//fills the progress bar and adds produced resource for the building every tickSpeed/1000 seconds 
								currencyList.minerals = currencyList.minerals + (buildingsList[item].stuffPerTick.minerals * buildingsList[item].totalAmount);
								document.getElementById('minerals').innerHTML = abbrNum(currencyList.minerals, 2);
								fillProgressBar(buildingsList[item].codeName, buildingsList[item].tickSpeed);
							}, buildingsList[item].tickSpeed);
						})(item);
					}
					buildingsList[item].totalAmount = buildingsList[item].totalAmount + 1;                                   //increases number of the building by 1
					removeSpentResources(currentCost.minerals, currentCost.steel, currentCost.oil, currentCost.plastics, currentCost.circuits, currentCost.science)  //removes minerals spent AND updates the displayed amount of total resources              
					document.getElementById(buildingsList[item].codeName + 'TotalAmount').innerHTML = buildingsList[item].totalAmount;  //updates the number of buildings that is displayed
					
				}
			}
			else if (amount == 5) {
				// buys 5 buildings
				var tempCostForFiveBuildings = 0;
				var tempTotalAmountOfBuildings = buildingsList[item].totalAmount;
				for (i = 0; i < 5; i++) {
					tempCostForFiveBuildings = tempCostForFiveBuildings + Math.floor(buildingsList[item].initialCost.minerals * Math.pow(playerState.buildingCostPower, tempTotalAmountOfBuildings))
					tempTotalAmountOfBuildings = tempTotalAmountOfBuildings + 1
					console.log(tempTotalAmountOfBuildings);	
				}
				if (currencyList.minerals >= tempCostForFiveBuildings) {
					if (buildingsList[item].totalAmount == 0) {
						fillProgressBar(buildingsList[item].codeName, buildingsList[item].tickSpeed);
						(function(item) {
							window.setInterval(function() {	//fills the progress bar and adds produced resource for the building every tickSpeed/1000 seconds 
								currencyList.minerals = currencyList.minerals + (buildingsList[item].stuffPerTick.minerals * buildingsList[item].totalAmount);
								document.getElementById('minerals').innerHTML = abbrNum(currencyList.minerals, 2);
								fillProgressBar(buildingsList[item].codeName, buildingsList[item].tickSpeed);
							}, buildingsList[item].tickSpeed);
						})(item);
					}
					buildingsList[item].totalAmount = buildingsList[item].totalAmount + 5;	//increases the amount of buildings by 5
					currencyList.minerals = currencyList.minerals - tempCostForFiveBuildings;
					document.getElementById(buildingsList[item].codeName + 'TotalAmount').innerHTML = buildingsList[item].totalAmount;	//updates the amount of buildings to be displayed
					document.getElementById('minerals').innerHTML = abbrNum(currencyList.minerals, 2);	//updates the amount of stone that is displayed
				}
			}
			
			else if (amount == 25) {
				var tempCostForTwentyFiveBuildings = 0;
				var tempTotalAmountOfBuildings = buildingsList[item].totalAmount;
				for (i = 0; i < 25; i++) {
					tempCostForTwentyFiveBuildings = tempCostForTwentyFiveBuildings + Math.floor(buildingsList[item].initialCost.minerals * Math.pow(playerState.buildingCostPower, tempTotalAmountOfBuildings))
					tempTotalAmountOfBuildings = tempTotalAmountOfBuildings + 1
					console.log(tempTotalAmountOfBuildings);	
				}
				if (currencyList.minerals >= tempCostForTwentyFiveBuildings) {
					if (buildingsList[item].totalAmount == 0) {
						fillProgressBar(buildingsList[item].codeName, buildingsList[item].tickSpeed);
						(function(item) {
							window.setInterval(function() {	//fills the progress bar and adds produced resource for the building every tickSpeed/1000 seconds 
								currencyList.minerals = currencyList.minerals + (buildingsList[item].stuffPerTick.minerals * buildingsList[item].totalAmount);
								document.getElementById('minerals').innerHTML = abbrNum(currencyList.minerals, 2);
								fillProgressBar(buildingsList[item].codeName, buildingsList[item].tickSpeed);
							}, buildingsList[item].tickSpeed);
						})(item);
					}
					buildingsList[item].totalAmount = buildingsList[item].totalAmount + 25;	//increases the amount of buildings by 25
					currencyList.minerals = currencyList.minerals - tempCostForTwentyFiveBuildings;
					document.getElementById(buildingsList[item].codeName + 'TotalAmount').innerHTML = buildingsList[item].totalAmount;	//updates the amount of buildings to be displayed
					document.getElementById('minerals').innerHTML = abbrNum(currencyList.minerals, 2);	//updates the amount of stone that is displayed
				}
			}
			
			else  {
				// buys maximum possible amount of buildings
				var maxBuyStuff = checkForMaxPossible(item);
				if (currencyList.minerals >= maxBuyStuff.priceForBuyMax) {
					if (buildingsList[item].totalAmount == 0) {
						fillProgressBar(buildingsList[item].codeName, buildingsList[item].tickSpeed);
						(function(item) {
							window.setInterval(function() {	//fills the progress bar and adds produced resource for the building every tickSpeed/1000 seconds 
								currencyList.minerals = currencyList.minerals + (buildingsList[item].stuffPerTick.minerals * buildingsList[item].totalAmount);
								document.getElementById('minerals').innerHTML = abbrNum(currencyList.minerals, 2);
								fillProgressBar(buildingsList[item].codeName, buildingsList[item].tickSpeed);
							}, buildingsList[item].tickSpeed);
						})(item);
					}
					
					buildingsList[item].totalAmount = buildingsList[item].totalAmount + maxBuyStuff.buildingsAmountForBuyMax;
					currencyList.minerals = currencyList.minerals - maxBuyStuff.priceForBuyMax;
					document.getElementById(buildingsList[item].codeName + 'TotalAmount').innerHTML = buildingsList[item].totalAmount;
					document.getElementById('minerals').innerHTML = abbrNum(currencyList.minerals, 2);
				}
			}
			document.getElementById(buildingsList[item].codeName + 'StonePerSec').innerHTML = abbrNum(Number(buildingsList[item].totalAmount * buildingsList[item].stuffPerTick.minerals) / buildingsList[item].tickSpeed * 1000);		//updates the building production per second displayed
			var nextCost = Math.floor(buildingsList[item].initialCost.minerals * Math.pow(playerState.buildingCostPower,buildingsList[item].totalAmount));       //works out the cost of the next building for the player to see
			document.getElementById(buildingsList[item].codeName + 'Cost').innerHTML = abbrNum(nextCost, 2);  //updates the building cost to be displayed
		}
		document.getElementById(buildingsList[item].codeName + "ButtonBuyFive").setAttribute("title", "Cost: " + abbrNum(Number(pricePredictionForButtonTitle(buildingsList[item].codeName, 5)), 2));
		document.getElementById(buildingsList[item].codeName + "ButtonBuyOne").setAttribute("title", "Cost: " +  abbrNum(Number(pricePredictionForButtonTitle(buildingsList[item].codeName, 1)), 2));
		document.getElementById(buildingsList[item].codeName + "ButtonBuyTwentyFive").setAttribute("title", "Cost: " + abbrNum(Number(pricePredictionForButtonTitle(buildingsList[item].codeName, 25)), 2));
		
	}
};

function fillProgressBar(building, tickLength) {
	
	var elem = document.getElementById(building + "ProgressBar");
	var width = 1;
	var id = setInterval(frame, (tickLength / 100));
	function frame() {
		if (width >= 100) {
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

function resetStones(){
	currencyList.minerals = 0;
	document.getElementById('minerals').innerHTML = abbrNum(currencyList.minerals, 2);
};

function cheat5000() {
	currencyList.minerals = currencyList.minerals + 5000;
	document.getElementById("minerals").innerHTML = abbrNum(currencyList.minerals, 2);
}

function cheatQi() {
	currencyList.minerals = currencyList.minerals + 1000000000000000000;
	document.getElementById("minerals").innerHTML = abbrNum(currencyList.minerals, 2);
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

window.setInterval(function() {  // checking every 0.2 sec to enable or disable buttons
	for (var itemButton = 0; itemButton < buildingsList.length; itemButton++) {
		if (pricePredictionForButtonTitle(buildingsList[itemButton].codeName, 25) <= currencyList.minerals) {
			document.getElementById(buildingsList[itemButton].codeName + "ButtonBuyTwentyFive").disabled = false;
			document.getElementById(buildingsList[itemButton].codeName + "ButtonBuyFive").disabled = false;
			document.getElementById(buildingsList[itemButton].codeName + "ButtonBuyOne").disabled = false;
			document.getElementById(buildingsList[itemButton].codeName + "ButtonBuyMax").disabled = false;
		}
		else if (pricePredictionForButtonTitle(buildingsList[itemButton].codeName, 5) <= currencyList.minerals) {
			document.getElementById(buildingsList[itemButton].codeName + "ButtonBuyFive").disabled = false;
			document.getElementById(buildingsList[itemButton].codeName + "ButtonBuyOne").disabled = false;
			document.getElementById(buildingsList[itemButton].codeName + "ButtonBuyTwentyFive").disabled = true;
			document.getElementById(buildingsList[itemButton].codeName + "ButtonBuyMax").disabled = false;
		}
		else if (pricePredictionForButtonTitle(buildingsList[itemButton].codeName, 1) <= currencyList.minerals) {
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
		document.getElementById(buildingsList[itemButton].codeName + "ButtonBuyMax").setAttribute("title", maxStuff.priceForBuyMax + " for " + maxStuff.buildingsAmountForBuyMax + " buildings.")
	}
}, 200);
