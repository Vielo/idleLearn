var stone = 0;
var stonePerSec = 0;
var tempItem = undefined;
var stoneTest= 0;
var science = 0;
var basicResearchSpeed = 1000;

function tooltipCreation(list, item) {
	if (list == buildingsList) {
		document.getElementById(buildingsList[item].codeName + "Fluff").innerHTML = buildingsList[item].fluffText;
	}
	else if (list == researchKnowledgeList) {
		document.getElementById(researchKnowledgeList[item].codeName + "Fluff").innerHTML = "<h1>" + researchKnowledgeList[item].name + "</h1>" + researchKnowledgeList[item].fluffText;
	}
	
}

function tooltipRemoval(list, item) {
	if (list == buildingsList) {
		document.getElementById(buildingsList[item].codeName + "Fluff").innerHTML = "";
	}
	else if (list == researchKnowledgeList){
		document.getElementById(researchKnowledgeList[item].codeName + "Fluff").innerHTML = "";
	}
}
function researchSpeed() {
	var bonusLevelI = researchKnowledgeList[0].level * researchKnowledgeList[0].levelBonus;
	return basicResearchSpeed + (bonusLevelI * basicResearchSpeed);
}

function stoneClick(number) {
	stone = stone + number;
	document.getElementById("stone").innerHTML = stone;
};

var deepStoneMines = 0;
var deepStoneMineCost = Math.floor(1000 * Math.pow(1.1,deepStoneMines ));

function updateStonePerSecond() {  		//updates the stonePerSec variable and the amount displayed for the user according to the production of all built buildings
	var tempTotalStonePerSec = 0;
	for (var item = 0; item < buildingsList.length; item++) {
		tempTotalStonePerSec = tempTotalStonePerSec + buildingsList[item].stonePerTick * buildingsList[item].totalAmount
	}
	stonePerSec = tempTotalStonePerSec;
	document.getElementById('stonePerSec').innerHTML = stonePerSec
}

function checkForMaxPossible(itemMax) {		//checks how many buildings of a certain type the player can buy and their cost
	var tempCostForMaxBuildingsBefore = 0;
	var tempCostForMaxBuildingsAfter = Math.floor(buildingsList[itemMax].initialCost * Math.pow(1.1, buildingsList[itemMax].totalAmount))
	var tempTotalAmountOfBuildings = buildingsList[itemMax].totalAmount;
	var buildingsToBuy = 0;
	while (tempCostForMaxBuildingsAfter <= stone) {
		tempCostForMaxBuildingsBefore = tempCostForMaxBuildingsBefore + Math.floor(buildingsList[itemMax].initialCost * Math.pow(1.1, tempTotalAmountOfBuildings))
		tempCostForMaxBuildingsAfter = tempCostForMaxBuildingsAfter + Math.floor(buildingsList[itemMax].initialCost * Math.pow(1.1, (tempTotalAmountOfBuildings + 1)))
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
					tempCostForTwentyFiveBuildings = tempCostForTwentyFiveBuildings + Math.floor(buildingsList[item].initialCost * Math.pow(1.1, tempTotalAmountOfBuildings))
					tempTotalAmountOfBuildings = tempTotalAmountOfBuildings + 1
				}
				return tempCostForTwentyFiveBuildings

			}
			if (amount == 5) {
				var tempCostForFiveBuildings = 0;
				var tempTotalAmountOfBuildings = buildingsList[item].totalAmount;
				for (i = 0; i < 5; i++) {
					tempCostForFiveBuildings = tempCostForFiveBuildings + (Math.floor(buildingsList[item].initialCost * Math.pow(1.1, tempTotalAmountOfBuildings)))
					tempTotalAmountOfBuildings = tempTotalAmountOfBuildings + 1
				}
				return tempCostForFiveBuildings

			}
			if (amount == 1) {
				var tempCostForOneBuilding = 0;
				tempCostForOneBuilding = Math.floor(buildingsList[item].initialCost * Math.pow(1.1, buildingsList[item].totalAmount));
				return tempCostForOneBuilding;

			}
		}
	}
}

function buyResearchKnowledge(research){	// used to start and process all the research projects in the game
	for (var item = 0; item < researchKnowledgeList.length; item++) {
		if (research == researchKnowledgeList[item].codeName) {
			if (science > researchKnowledgeList[item].cost) {
				science = science - researchKnowledgeList[item].cost;
				document.getElementById("science").innerHTML=science;
				document.getElementById("science-progress").setAttribute("max", researchKnowledgeList[item].duration);
				document.getElementById("science-progress").setAttribute("value", 0)
				document.getElementById("current-research-name").innerHTML=researchKnowledgeList[item].name;
				document.getElementById("research-current-image").setAttribute("src", researchKnowledgeList[item].icon);
				
				fillResearchProgressBar(researchKnowledgeList[item].duration);
				
				(function(item) {
					setTimeout(function() {
						tempResearch = researchKnowledgeList[item];
						tempResearch.unlocked = true;
						tempResearch.icon = 'img/research/icon_' + tempResearch.codeName + '_unlocked.png';
						document.getElementById("research-current-image").setAttribute("src", tempResearch.icon);
						document.getElementById(tempResearch.codeName).setAttribute("src", tempResearch.icon);
						document.getElementById("current-research-title").innerHTML="Finished research: ";
						document.getElementById("current-research-title").setAttribute("class", "current-research-animated chalk-underline");
						document.getElementById(tempResearch.codeName + "-div").setAttribute("style", "order: 2");
						document.getElementById(tempResearch.codeName + "-div").setAttribute("class", "research-completed tooltip");
						document.getElementById(tempResearch.codeName + "-div").removeAttribute("onClick");
					}, researchKnowledgeList[item].duration);
				})(item);
			}
		}
	}
}

function buyBuilding(building, amount){ // used to increase the amount of buildings, update their costs and resource generation per sec. Should work with any building and amount in the following increments: 1, 5, 25, maximum possible.
    for (var item = 0; item < buildingsList.length; item++) {
		if (building == buildingsList[item].codeName) {
			if (amount == 1) {
				buildingsList[item].currentCost = Math.floor(buildingsList[item].initialCost * Math.pow(1.1,buildingsList[item].totalAmount));     //works out the cost of the next building.
				if (stone >= buildingsList[item].currentCost){                                   //checks whether the player can afford the building
					if (buildingsList[item].totalAmount == 0) {
						fillProgressBar(buildingsList[item].codeName, buildingsList[item].tickSpeed);
						(function(item) {
							window.setInterval(function() {	//fills the progress bar and adds produced resource for the building every tickSpeed/1000 seconds 
								stone = stone + (buildingsList[item].stonePerTick * buildingsList[item].totalAmount);
								document.getElementById('stone').innerHTML = stone;
								fillProgressBar(buildingsList[item].codeName, buildingsList[item].tickSpeed);
							}, buildingsList[item].tickSpeed);
						})(item);
					}
					buildingsList[item].totalAmount = buildingsList[item].totalAmount + 1;                                   //increases number of the building by 1
					stone = stone - buildingsList[item].currentCost;                          //removes stone spent
					document.getElementById(buildingsList[item].codeName + 'TotalAmount').innerHTML = buildingsList[item].totalAmount;  //updates the number of buildings that is displayed
					document.getElementById('stone').innerHTML = stone;  //updates the number of stone that is displayed
					
				}
			}
			else if (amount == 5) {
				// buys 5 buildings
				var tempCostForFiveBuildings = 0;
				var tempTotalAmountOfBuildings = buildingsList[item].totalAmount;
				for (i = 0; i < 5; i++) {
					tempCostForFiveBuildings = tempCostForFiveBuildings + Math.floor(buildingsList[item].initialCost * Math.pow(1.1, tempTotalAmountOfBuildings))
					tempTotalAmountOfBuildings = tempTotalAmountOfBuildings + 1
					console.log(tempTotalAmountOfBuildings);	
				}
				if (stone >= tempCostForFiveBuildings) {
					if (buildingsList[item].totalAmount == 0) {
						fillProgressBar(buildingsList[item].codeName, buildingsList[item].tickSpeed);
						(function(item) {
							window.setInterval(function() {	//fills the progress bar and adds produced resource for the building every tickSpeed/1000 seconds 
								stone = stone + (buildingsList[item].stonePerTick * buildingsList[item].totalAmount);
								document.getElementById('stone').innerHTML = stone;
								fillProgressBar(buildingsList[item].codeName, buildingsList[item].tickSpeed);
							}, buildingsList[item].tickSpeed);
						})(item);
					}
					buildingsList[item].totalAmount = buildingsList[item].totalAmount + 5;	//increases the amount of buildings by 5
					stone = stone - tempCostForFiveBuildings;
					document.getElementById(buildingsList[item].codeName + 'TotalAmount').innerHTML = buildingsList[item].totalAmount;	//updates the amount of buildings to be displayed
					document.getElementById('stone').innerHTML = stone;	//updates the amount of stone that is displayed
				}
			}
			
			else if (amount == 25) {
				var tempCostForTwentyFiveBuildings = 0;
				var tempTotalAmountOfBuildings = buildingsList[item].totalAmount;
				for (i = 0; i < 25; i++) {
					tempCostForTwentyFiveBuildings = tempCostForTwentyFiveBuildings + Math.floor(buildingsList[item].initialCost * Math.pow(1.1, tempTotalAmountOfBuildings))
					tempTotalAmountOfBuildings = tempTotalAmountOfBuildings + 1
					console.log(tempTotalAmountOfBuildings);	
				}
				if (stone >= tempCostForTwentyFiveBuildings) {
					if (buildingsList[item].totalAmount == 0) {
						fillProgressBar(buildingsList[item].codeName, buildingsList[item].tickSpeed);
						(function(item) {
							window.setInterval(function() {	//fills the progress bar and adds produced resource for the building every tickSpeed/1000 seconds 
								stone = stone + (buildingsList[item].stonePerTick * buildingsList[item].totalAmount);
								document.getElementById('stone').innerHTML = stone;
								fillProgressBar(buildingsList[item].codeName, buildingsList[item].tickSpeed);
							}, buildingsList[item].tickSpeed);
						})(item);
					}
					buildingsList[item].totalAmount = buildingsList[item].totalAmount + 25;	//increases the amount of buildings by 25
					stone = stone - tempCostForTwentyFiveBuildings;
					document.getElementById(buildingsList[item].codeName + 'TotalAmount').innerHTML = buildingsList[item].totalAmount;	//updates the amount of buildings to be displayed
					document.getElementById('stone').innerHTML = stone;	//updates the amount of stone that is displayed
				}
			}
			
			else  {
				// buys maximum possible amount of buildings
				var maxBuyStuff = checkForMaxPossible(item);
				if (stone >= maxBuyStuff.priceForBuyMax) {
					if (buildingsList[item].totalAmount == 0) {
						fillProgressBar(buildingsList[item].codeName, buildingsList[item].tickSpeed);
						(function(item) {
							window.setInterval(function() {	//fills the progress bar and adds produced resource for the building every tickSpeed/1000 seconds 
								stone = stone + (buildingsList[item].stonePerTick * buildingsList[item].totalAmount);
								document.getElementById('stone').innerHTML = stone;
								fillProgressBar(buildingsList[item].codeName, buildingsList[item].tickSpeed);
							}, buildingsList[item].tickSpeed);
						})(item);
					}
					
					buildingsList[item].totalAmount = buildingsList[item].totalAmount + maxBuyStuff.buildingsAmountForBuyMax;
					stone = stone - maxBuyStuff.priceForBuyMax;
					document.getElementById(buildingsList[item].codeName + 'TotalAmount').innerHTML = buildingsList[item].totalAmount;
					document.getElementById('stone').innerHTML = stone;
				}
			}
			document.getElementById(buildingsList[item].codeName + 'StonePerSec').innerHTML = buildingsList[item].totalAmount * buildingsList[item].stonePerTick;		//updates the building production displayed
			var nextCost = Math.floor(buildingsList[item].initialCost * Math.pow(1.1,buildingsList[item].totalAmount));       //works out the cost of the next building for the player to see
			document.getElementById(buildingsList[item].codeName + 'Cost').innerHTML = nextCost;  //updates the Deep Stone Mine cost that is displayed
		}
		document.getElementById(buildingsList[item].codeName + "ButtonBuyFive").setAttribute("title", "Cost: " +  pricePredictionForButtonTitle(buildingsList[item].codeName, 5));
		document.getElementById(buildingsList[item].codeName + "ButtonBuyOne").setAttribute("title", "Cost: " +  pricePredictionForButtonTitle(buildingsList[item].codeName, 1));
		document.getElementById(buildingsList[item].codeName + "ButtonBuyTwentyFive").setAttribute("title", "Cost: " +  pricePredictionForButtonTitle(buildingsList[item].codeName, 25))
		
	}
	updateStonePerSecond()	//updates the stonePerSec variable 
	
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

function resetStones(){
	stone = 0;
	stoneTest = 0;
	document.getElementById('stone').innerHTML = stone;
	document.getElementById('stoneTest').innerHTML = stoneTest;
};

function cheat5000() {
	stone = stone + 5000;
	document.getElementById("stone").innerHTML = stone;
}

function cheatScience() {
	science = science + 5000;
	document.getElementById("science").innerHTML = science;
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

/** window.setInterval(function(){	//updates the stonePerSec and total stone amounts every 0.1 sec
	updateStonePerSecond();
	stone = stone + stonePerSec;
	document.getElementById('stone').innerHTML = stone;
}, 100);

**/
/**window.setInterval(function() { // tests to see if the amount of resources generated with progress bars is the same as if it would be if they all shared the same timer
	for (var item = 0; item < buildingsList.length; item++) {
		var stoneTestPerSecTemp = (buildingsList[item].stonePerTick / (buildingsList[item].tickSpeed / 1000)) * buildingsList[item].totalAmount;
		stoneTest = stoneTest + stoneTestPerSecTemp;
		document.getElementById('stoneTest').innerHTML = stoneTest; 
	}
}, 1000);
**/

window.setInterval(function() {  // checking every 0.2 sec to enable or disable buttons
	for (var itemButton = 0; itemButton < buildingsList.length; itemButton++) {
		if (pricePredictionForButtonTitle(buildingsList[itemButton].codeName, 25) <= stone) {
			document.getElementById(buildingsList[itemButton].codeName + "ButtonBuyTwentyFive").disabled = false;
			document.getElementById(buildingsList[itemButton].codeName + "ButtonBuyFive").disabled = false;
			document.getElementById(buildingsList[itemButton].codeName + "ButtonBuyOne").disabled = false;
			document.getElementById(buildingsList[itemButton].codeName + "ButtonBuyMax").disabled = false;
		}
		else if (pricePredictionForButtonTitle(buildingsList[itemButton].codeName, 5) <= stone) {
			document.getElementById(buildingsList[itemButton].codeName + "ButtonBuyFive").disabled = false;
			document.getElementById(buildingsList[itemButton].codeName + "ButtonBuyOne").disabled = false;
			document.getElementById(buildingsList[itemButton].codeName + "ButtonBuyTwentyFive").disabled = true;
			document.getElementById(buildingsList[itemButton].codeName + "ButtonBuyMax").disabled = false;
		}
		else if (pricePredictionForButtonTitle(buildingsList[itemButton].codeName, 1) <= stone) {
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

window.setInterval(function() { // updating the cost of all buildings and logging that into console every 1 second
	deepStoneMineCost = Math.floor(1000 * Math.pow(1.1,deepStoneMines ));
	console.log(deepStoneMineCost);
}, 1000);