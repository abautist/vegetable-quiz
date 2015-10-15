var gameboard = $('.gameboard');
var header = $('header');
var prompt = $('#prompt');
var h1 = $('#h1-hd');
var playButton = $('#play');
var blueTeam = $('#choice-one');
var redTeam = $('#choice-two');
var playerOneIcon = $('#player1icon');
var playerTwoIcon = $('#player2icon');
var buttonSwitch = $('#firstRd');
var rdOneButton = $('#rd-1');
var jerseys = $('.jerseys');
var count = 0;
var images = $('.images');
var keystroke = $('.keystroke');
var answerForm = $('#answer');
var submit = $('.submit'); 
var typedGuess = $('#rd-1-ans');
var roundCount = 0;
var plyrOne = $('#player1score');
var plyrTwo = $('#player2score');
var score1 = 0;
var score2 = 0;
var oneBuzz = $('#one-buzz');
var twoBuzz = $('#two-buzz');
var buzzedInOne = false;
var scoreBoard = $('.scoreboard');
var answerInput = $('.answerInput');
var counterInterval;
var blinker;
var instructions = $('#mid-margin');
var clickable = false;
var redClickable = false;

var roundOneArray = [
{photo: 'Vegetables/romanesco.jpg', answer: 'romanesco cauliflower', hint1: 'two words, first word romanesco', hint2: 'ends with cauliflower'},
{photo: 'Vegetables/kohlrabi.jpg', answer: 'kohlrabi', hint1: 'starts with a "K" ends with an "I"', hint2: 'rhymes with pohlrabi'},
{photo: 'Vegetables/artichoke.jpg', answer: 'artichoke', hint1: 'starts with an "A"', hint2: 'ends with choke'},
{photo: 'Vegetables/garlic.jpg', answer: 'garlic', hint1: 'great in pasta sauce', hint2: 'vampires hate it'},
{photo: 'Vegetables/ginger.jpg', answer: 'ginger', hint1: 'starts with a "G"', hint2: 'ends with -inger'},
{photo: 'Vegetables/savoy-cabbage.jpg', answer: 'cabbage', hint1: 'great for coleslaw', hint2: 'something patch kids'},
{photo: 'Vegetables/brussels-sprouts.jpg', answer: 'brussels sprouts', hint1: 'first word is a city', hint2: 'second word - sprouts'},
{photo: 'Vegetables/parsnip.jpg', answer: 'parsnip', hint1: 'starts with a P', hint2: 'ends with -arsnip'},
{photo: 'Vegetables/fennel.jpg', answer: 'fennel', hint1: 'licorice flavor', hint2: 'rhymes with kennel'},
{photo: 'Vegetables/radicchio.jpg', answer: 'radicchio', hint1: 'tough one.. starts with an "R" ends with an "O"', hint2: 'end with -adicchio'},
{photo: 'Vegetables/asparagus.jpg', answer: 'asparagus', hint1: 'do you need a hint?', hint2: 'starts with an "A" ends with an "S"'},
{photo: 'Vegetables/kale.jpg', answer: 'kale', hint1: 'so popular right now', hint2: 'rhymes with fail'},
{photo: 'Vegetables/tomatoes.jpg', answer: 'tomato', hint1: ' do you need a hint?', hint2: 'do you really need a hint?'},
{photo: 'Vegetables/basil.jpg', answer: 'basil', hint1: 'mmm... pesto', hint2: 'a popular Italian herb'},
{photo: 'Vegetables/onions.jpg', answer: 'onion', hint1: 'makes you cry', hint2: 'starts with an O'},
{photo: 'Vegetables/carrot.jpg', answer: 'carrot', hint1: 'do you really need a hint?', hint2: 'do you really need a hint?'},
{photo: 'Vegetables/broccoli.jpg', answer: 'broccoli', hint1: 'do you need a hint?', hint2: 'a head of ?'},
];

//Shuffle the images using the Fisher-Yates method
var shuffle = function (array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

//Display hint
var displayHint = function (roundCount) {
		images.append('<img class="img-rd-1" src='+roundOneArray[roundCount].photo+' />');
	};

//Display vegetable image
var displayImage = function (roundCount) {		
		images.append('<img class="img-rd-1" src='+roundOneArray[roundCount].photo+' />');
	};

//Question prompt flashes
var showBlinker = function () {	
	 blinker = setInterval(function () {
		    prompt.fadeOut(500);
		   prompt.fadeIn(500);
		}, 1000);
};

//Countdown timer + hint display timing + timer turns red with 5 seconds left
var showTimer = function() {
  var counter = 21;
  
  counterInterval = setInterval(function() {
    counter--;
    if (counter >= 10) {
      $('#timer').text('00:'+counter);
    }
    if (counter >= 0 && counter < 10) {
      $('#timer').text('00:0'+counter);
    }
    if (counter === 12) { 
      $('.hint').append('<li>'+roundOneArray[roundCount].hint1+'</li>');
    }
    if (counter === 7) {
      $('.hint').append('<li>'+roundOneArray[roundCount].hint2+'</li>');
    }
    if (counter <= 5) {
      $('#timer').css({'color':'red'});
    }
    if (counter === 0) {
       answerForm.hide();
       plyrOne.html(score1);
	   plyrTwo.html(score2);
	   roundCount++;
	   images.empty();
	   rdOneButton.text('NEXT');
	   rdOneButton.show();
	   buzzedInOne = false;
	   oneBuzz.empty();
	   clearInterval(counterInterval);
	   clearInterval(blinker);
	   swal("Uh oh...", "Your time has run out.", "error");

    }
    
  }, 1000);
    
};

//Winner 
var winner = function(score1,score2) {
	if (score1 === 5) {
			swal({   title: "Congratulations!",
			text: "Player 1 is the winner. Play again?",
			imageUrl: "images/crown.png"
		});
	} else if (score2 === 5) {
			swal({   title: 'Congratulations!',
			text: "Player 2 is the winner. Play again?",
			imageUrl: "images/crown.png"
		});
	} else {
		return;
	}
	resetGame();
};

//Reset and start new game
var resetGame = function () {
	shuffle(roundOneArray);
	console.log(roundOneArray);
	gameboard.hide();
	scoreBoard.hide();
	answerForm.hide();
	keystroke.hide();
	answerForm.hide();
	plyrOne.empty();
	plyrTwo.empty();
	score1 = 0;
	score2 = 0;
	playerOneIcon.empty();
	playerTwoIcon.empty();
	rdOneButton.text('GO');
	clickable = false;
	redClickable = false;
	playButton.show();
};

$(document).ready(function() {
	shuffle(roundOneArray);
	console.log(roundOneArray);
	gameboard.hide();
	answerForm.hide();
	scoreBoard.hide();
	plyrOne.html(score1);
	plyrTwo.html(score2);
	prompt.hide();

//Establishes buzzers	
	$(document).bind('keydown', function(e) {
		if (e.keyCode == 81 && buzzedInOne == false) {
			e.preventDefault();
			buzzedInOne = true;
			answerForm.fadeIn();
			typedGuess.focus();
			oneBuzz.text('PLAYER ONE BUZZED IN!!!');
		}
	});

	$(document).bind('keydown', function(e) {
		if (e.keyCode == 80 && buzzedInOne == false) {
			e.preventDefault();
			buzzedInOne = true;
			answerForm.fadeIn();
			typedGuess.focus();
			oneBuzz.text('PLAYER TWO BUZZED IN!!!');
		}
	});

//How to Play
	instructions.click(function() {
		swal("INSTRUCTIONS", "It's the classic guess that vegetable game. A photo will appear and each player must race against the clock to buzz in and type in your answer. Player 1\'s buzzer is the key Q and Player 2\'s buzzer is the key P. Watch for the hints. First to five wins!");
	})

//Play button
	playButton.click(function() {
		playButton.hide();
		gameboard.fadeIn();
		scoreBoard.fadeIn();
		jerseys.fadeIn();
		rdOneButton.hide();

	});

//Select teams
	jerseys.click(function() {
		if (playerOneIcon.html() != '' && playerTwoIcon.html() != '') {
    		rdOneButton.fadeIn('slow');
		}
	});

	blueTeam.click(function() {
		if (clickable === false) {
			if (playerOneIcon.html() != '' && playerTwoIcon.html() != '') {
				return;			
			} else if (playerOneIcon.html() == '') {
				playerOneIcon.append('<img src="pictures/blue.png" />');
				$('img').css({'width': '50px', 'height': '50px'});
			} else {
				playerTwoIcon.append('<img src="pictures/blue.png" />');
				$('img').css({'width': '50px', 'height': '50px'});
			}
			clickable = true;
		};
	});

	redTeam.click(function() {
		if (redClickable === false) {
			if (playerOneIcon.html() != '' && playerTwoIcon.html() != '') {
				return;	
			} else if (playerOneIcon.html() == '') {
				playerOneIcon.append('<img src="pictures/red.png" />');
				$('img').css({'width': '50px', 'height': '50px'});
			} else {
				playerTwoIcon.append('<img src="pictures/red.png" />');
				$('img').css({'width': '50px', 'height': '50px'});
			}
			redClickable = true;	
		};
	});

//Starts the round	
	rdOneButton.click(function() {
		$('#timer').css({'color':'white'});
		rdOneButton.hide();
		jerseys.hide();
		displayImage(roundCount);
		keystroke.show();
		prompt.show();
		showBlinker();
		showTimer();
		$('.hint').empty();
	});

//Type in answer and execute solution submit function
	submit.click(function (event) {
		clearInterval(counterInterval);
		clearInterval(blinker);
		prompt.hide();
		event.preventDefault();
		buzzedInOne = false;
		answerForm.hide();
		var playerSubmission = typedGuess.val();
		typedGuess.val('');
		
		if (playerSubmission.toLowerCase() === roundOneArray[roundCount].answer && oneBuzz.text() === 'PLAYER ONE BUZZED IN!!!') {
			console.log('true');
			score1++;
			plyrOne.html(score1);
			plyrTwo.html(score2);
			roundCount++;
			swal('Nice One!', 'Are you ready for the next one?', 'success');
			images.empty();
			rdOneButton.text('NEXT');
			rdOneButton.show();

		} else if (playerSubmission.toLowerCase() === roundOneArray[roundCount].answer && oneBuzz.text() === 'PLAYER TWO BUZZED IN!!!') {
			console.log('player2')
			score2++;
			plyrOne.html(score1);
			plyrTwo.html(score2);
			roundCount++;
			swal('Nice One!', 'Are you ready for the next one?', 'success');
			images.empty();
			rdOneButton.text('NEXT');
			rdOneButton.show();

		} else {
			console.log('false');
			swal("Sorry, that\'s incorrect", "The correct answer was "+roundOneArray[roundCount].answer, "error");
			plyrOne.html(score1);
			plyrTwo.html(score2);
			roundCount++;
			images.empty();
			rdOneButton.text('NEXT');
			rdOneButton.show();
		}
	
		winner(score1, score2);
		oneBuzz.empty();		
		
	});

});
