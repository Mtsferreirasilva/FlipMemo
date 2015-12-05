var btns = document.getElementsByTagName("button");
for (i = 0; i < btns.length; i++) {
	btns[i].addEventListener("click", function() {
		var menuVal = this.getAttribute("data-value");

		//Isn't going back
		if (menuVal != "back") {
			var mainTop = document.querySelector(".mainTop");
			mainTop.className = mainTop.className + " out";
			var mainBottom = document.querySelector(".mainBottom");
			mainBottom.className = mainBottom.className + " out";

			//Isn't going Scores screen
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
			}else{
				//Is Scores screen
			};
		}else{
			//Is going back to manu
			var gameScreenNav = document.querySelector(".gameScreen nav");
			gameScreenNav.className = "out";

			var gameScreenBlocks = document.querySelector(".gameScreen .block-container");
			gameScreenBlocks.className = "block-container out";

			var gameScreenBar = document.querySelector(".gameScreen .progressbar");
			gameScreenBar.className = "progressbar out";

			setTimeout(function(){
				var mainTop = document.querySelector(".mainTop");
				mainTop.className = "mainTop";
				var mainBottom = document.querySelector(".mainBottom");
				mainBottom.className = "mainBottom";

				var gameScreen = document.querySelector(".gameScreen");
				gameScreen.className = "gameScreen out";

				//This is forceing the menu to redraw. Avoiding rendering issues
				var forceRedraw = function(element){
					if (!element) { return; }
					var n = document.createTextNode(' ');
					var disp = element.style.display;

					element.appendChild(n);
					element.style.display = 'none';

					setTimeout(function(){
						element.style.display = disp;
						n.parentNode.removeChild(n);
					},20);
				}
				forceRedraw(document.querySelector(".toRedraw"));
			}, 500);
		};
	});
}