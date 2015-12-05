var btns = document.getElementsByTagName("button");
for (i = 0; i < btns.length; i++) {
	btns[i].addEventListener("click", function() {
		var menuVal = this.getAttribute("data-value");

		var mainTop = document.querySelector(".mainTop");
		mainTop.className = mainTop.className + " out";
		var mainBottom = document.querySelector(".mainBottom");
		mainBottom.className = mainBottom.className + " out";

		if (menuVal != "scores") {
			document.getElementById("level-value").innerHTML = menuVal;
			setTimeout(function(){
				var gameScreen = document.querySelector(".gameScreen");
				gameScreen.className = "gameScreen";

				var gameScreenNav = document.querySelector(".gameScreen nav");
				gameScreenNav.className = "";

				var gameScreenBlocks = document.querySelector(".gameScreen .block-container");
				gameScreenBlocks.className = "block-container";

				var gameScreenBar = document.querySelector(".gameScreen .progressbar");
				gameScreenBar.className = "progressbar";
			}, 300);
		};
	});
}