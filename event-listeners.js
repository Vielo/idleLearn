var timer;
document.getElementById("test-track").addEventListener("mousedown", function(){
	var manualProgress = 0; 
	timer=setInterval(function(){
		if (manualProgress >= 5) {
			currencyList.minerals = currencyList.minerals + 100;
			document.getElementById("minerals").innerHTML = abbrNum(currencyList.minerals, 2)
            console.log("got 100 minerals!");
            document.getElementById("manual-float-stoneExtrator").style.opacity=1;
            document.getElementById("manual-float-stoneExtrator").style.display="flex";
            setTimeout(function(){ 
                document.getElementById("manual-float-stoneExtrator").style.opacity=0;
                document.getElementById("manual-float-stoneExtrator").style.display="none"; 
            }, 1000);
			manualProgress = 0;
		}
		manualProgress++;
		console.log("manual progress increased by 1, " + manualProgress + " total");
     }, 400); // the above code is executed every 400 ms
});
document.getElementById("test-track").addEventListener("mouseup", function(){
    if (timer) clearInterval(timer)
});

document.getElementById("test-track").addEventListener("mouseout", function(){
    if (timer) clearInterval(timer)
});


document.getElementById("stoneExtractorRaze").addEventListener("click", function(){     // checks if the 'raze' button for Quarry is clicked, used to sell buildings
    if (buildingsList[0].totalAmount > 0) { 
        buildingsList[0].totalAmount = buildingsList[0].totalAmount - 1;
        document.getElementById("stoneExtractorTotalAmount").innerHTML=buildingsList[0].totalAmount;
        updateButtonTitles(0);
        if (buildingsList[0].totalAmount == 0) {
            window.clearInterval(intervalStoneExtractor);
        }
    };
});

document.getElementById("deepMineRaze").addEventListener("click", function(){     // checks if the 'raze' button for Deep Mine is clicked, used to sell buildings
    if (buildingsList[1].totalAmount > 0) { 
        buildingsList[1].totalAmount = buildingsList[1].totalAmount - 1;
        document.getElementById("deepStoneMineTotalAmount").innerHTML=buildingsList[1].totalAmount;
        updateButtonTitles(1);
        if (buildingsList[1].totalAmount == 0) {
            window.clearInterval(intervalDeepMine);
        }
    }
});

document.getElementById("seabedMineRaze").addEventListener("click", function(){     // checks if the 'raze' button for Seabed Mine is clicked, used to sell buildings
    if (buildingsList[2].totalAmount > 0) { 
        buildingsList[2].totalAmount = buildingsList[2].totalAmount - 1;
        document.getElementById("seabedMineTotalAmount").innerHTML=buildingsList[2].totalAmount;
        updateButtonTitles(2);
        if (buildingsList[2].totalAmount == 0) {
            window.clearInterval(intervalSeabedMine);
        }
    }
});

document.getElementById("pumpJackRaze").addEventListener("click", function(){     // checks if the 'raze' button for Pumpjack is clicked, used to sell buildings
    if (buildingsList[3].totalAmount > 0) { 
        buildingsList[3].totalAmount = buildingsList[3].totalAmount - 1;
        document.getElementById("pumpJackTotalAmount").innerHTML=buildingsList[3].totalAmount;
        updateButtonTitles(3);
        if (buildingsList[3].totalAmount == 0) {
            window.clearInterval(intervalPumpJack);
        }
    }
});

document.getElementById("laboratoryRaze").addEventListener("click", function(){     // checks if the 'raze' button for Laboratory is clicked, used to sell buildings
    if (buildingsList[4].totalAmount > 0) { 
        buildingsList[4].totalAmount = buildingsList[4].totalAmount - 1;
        document.getElementById("laboratoryTotalAmount").innerHTML=buildingsList[4].totalAmount;
        updateButtonTitles(4);
        if (buildingsList[4].totalAmount == 0) {
            window.clearInterval(intervalLaboratory);
        }
    }
});

document.getElementById("steelMillRaze").addEventListener("click", function(){     // checks if the 'raze' button for Steel Mill is clicked, used to sell buildings
    if (buildingsList[5].totalAmount > 0) { 
        buildingsList[5].totalAmount = buildingsList[5].totalAmount - 1;
        document.getElementById("steelMillTotalAmount").innerHTML=buildingsList[5].totalAmount;
        updateButtonTitles(5);
        if (buildingsList[5].totalAmount == 0) {
            window.clearInterval(intervalSteelMill);
        }
    }
});

document.getElementById("chemicalPlantRaze").addEventListener("click", function(){     // checks if the 'raze' button for Chemical Plant is clicked, used to sell buildings
    if (buildingsList[6].totalAmount > 0) { 
        buildingsList[6].totalAmount = buildingsList[6].totalAmount - 1;
        document.getElementById("chemicalPlantTotalAmount").innerHTML=buildingsList[6].totalAmount;
        updateButtonTitles(6);
        if (buildingsList[6].totalAmount == 0) {
            window.clearInterval(intervalChemicalPlant);
        }
    }
});

document.getElementById("electronicsPlantRaze").addEventListener("click", function(){     // checks if the 'raze' button for Electronics Plant is clicked, used to sell buildings
    if (buildingsList[7].totalAmount > 0) { 
        buildingsList[7].totalAmount = buildingsList[7].totalAmount - 1;
        document.getElementById("electronicsPlantTotalAmount").innerHTML=buildingsList[7].totalAmount;
        updateButtonTitles(7);
        if (buildingsList[7].totalAmount == 0) {
            window.clearInterval(intervalElectronicsPlant);
        }
    }
});