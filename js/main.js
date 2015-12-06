// totalCards = Total of cards for the level
// intervalTime = time for memorizing - (value * 100) miliseconds
// animation = type of animation [all, cascade, checkerboard]

var flipmemo = function(){
	return {
		// Available levels
		fm_levels: {
			1: {"totalCards": 4, "intervalTime": 40, animation: "all"},
			2: {"totalCards": 4, "intervalTime": 40, animation: "all"},
			3: {"totalCards": 6, "intervalTime": 60, animation: "all"},
			4: {"totalCards": 6, "intervalTime": 40, animation: "all"},
			5: {"totalCards": 6, "intervalTime": 40, animation: "checkerboard"}
		},

		// HTML of each block
		fm_blockHTML: '<div class="block-item"><div class="block hover" data-card-number="{card-number}"><figure class="front"><span>{number}</span></figure><figure class="back"><span>Flip Memo</span></figure></div></div>',

		// It says what is the next expected number to be clicked
		fm_nextToBeClicked: 1,

		fm_currentLevel: 1,

		fm_isInspecting: false,

		// Shuffles an array
		fm_shuffle: function(o){
			for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
			return o;
		},

		// Creates a level HTML structure based on level and difficulty
		fm_createLevel: function(level, difficulty){
			this.fm_currentLevel = level;

			var numbers = [];
			for(var i = 1; i <= this.fm_levels[level].totalCards; i++){
				numbers.push(i);
			}
			numbers = this.fm_shuffle(numbers);

			var html_final = '';
			for(var k = 0; k < numbers.length; k++){
				html_final += this.fm_blockHTML.replace('{number}', numbers[k]).replace("{card-number}", numbers[k]);
			}

			document.querySelector(".gameScreen .block-container").innerHTML = html_final;
			setTimeout(function(){
				game.fm_inspectingTime();
			}, 1000);
		},

		fm_inspectingTime: function(){
			var barWidth = 100;
			this.fm_isInspecting = true;

			function loadingBar(){
				barWidth--;
				var bar = document.querySelector(".gameScreen .progressbar .bar");
				bar.style.width = barWidth + '%';
				if (barWidth == 0) {
					clearInterval(decreaseBar);
					game.fm_isInspecting = false;
					game.fm_blockEventListener();
					game.fm_nextToBeClicked = 1;
					bar.className = "bar";
					bar.style.width = 100 + "%";
				};
			}

			var intervalTime = this.fm_levels[this.fm_currentLevel].intervalTime;
			var decreaseBar = setInterval(loadingBar, intervalTime);
			this.fm_animateCards();
		},

		fm_animateCards: function(){
			var animation = this.fm_levels[this.fm_currentLevel].animation;

			if (animation == "all") {
				var allAnimation = setInterval(function(){
					var blocks = document.querySelectorAll(".block");
					for (i = 0; i < blocks.length; i++) {
						if(blocks[i].className == "block"){
							blocks[i].className = blocks[i].className + " hover";
						}else{
							blocks[i].className = "block";
						}
					}
					if (!game.fm_isInspecting) {
						clearInterval(allAnimation);
						for (i = 0; i < blocks.length; i++) {
							blocks[i].className = "block";
						}
					};
				}, 600);
			}else if (animation == "cascade"){

			}else if (animation == "checkerboard"){

			};
		},

		// Creates an event listener for each new block
		fm_blockEventListener: function(){
			var blocks = document.querySelectorAll(".block");

			for (i = 0; i < blocks.length; i++) {
				blocks[i].addEventListener("click", function(){
					this.getAttribute("data-card-number");
					if (this.getAttribute("data-card-number") == game.fm_nextToBeClicked) {
						console.log("clicou correto");
						game.fm_nextToBeClicked++;
					}else{
						console.log("clicou errado, quero o " + game.fm_nextToBeClicked);
					};
				});
			}
		}
	}
};

var game = new flipmemo();

//Listeners for each button
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
				
				//Creating a new array of numbers
				game.fm_createLevel(1, menuVal);

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
