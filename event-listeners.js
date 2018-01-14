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