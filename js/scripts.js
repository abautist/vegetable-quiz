var gameboard = $('.gameboard');
var header = $('header');
var h1 = $('#h1-hd');
var playButton = $('#play');
var blueTeam = $('#choice-one');
var redTeam = $('#choice-two');
var blueTeamIcon = "pictures/blue-football-top-md.png";
var redTeamIcon = "pictures/red-t-shirt-icon-hi.png";
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


//When page loads the title enters from the left
//Replace jerseys with colored tags - http://fortawesome.github.io/Font-Awesome/icon/tag/
//add text "Please select your team's jersey"
// possible add it into an accordian + add progress bar

//Shuffle the tiles using the Fisher-Yates method

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

var displayHint = function (roundCount) {

		images.append('<img class="img-rd-1" src='+roundOneArray[roundCount].photo+' />');
	};


var displayImage = function (roundCount) {		
		images.append('<img class="img-rd-1" src='+roundOneArray[roundCount].photo+' />');
	};

var showBlinker = function () {	
	 blinker = setInterval(function () {
		    $('#prompt').fadeOut(500);
		    $('#prompt').fadeIn(500);
		}, 1000);
};




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
      $('.hint').append('<p>'+roundOneArray[roundCount].hint1+'</p>');
    }
    if (counter === 7) {
      $('.hint').append('<p>'+roundOneArray[roundCount].hint2+'</p>');
    }
    if (counter <= 5) {
      $('#timer').css({'color':'red'});
    }
    // // if (counter > 0 && oneBuzz.html('PLAYER ONE BUZZED IN!')) {
    // //   clearInterval(counter);

    // }
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

//determine winner
var winner = function(score1,score2) {
	if (score1 === 3) {
			swal({   title: "Congratulations!",
			text: "Player 1 is the winner. Play again?",
			imageUrl: "images/crown.png"
		});
	} else if (score2 === 3) {
			swal({   title: 'Congratulations!',
			text: "Player 2 is the winner. Play again?",
			imageUrl: "images/crown.png"
		});
	} else {
		return;
	}
	resetGame();
};

var resetGame = function () {
	shuffle(roundOneArray);
	console.log(roundOneArray);
	gameboard.hide();
	answerForm.hide();
	keystroke.hide();
	answerForm.hide();
	plyrOne.html(score1);
	plyrTwo.html(score2);
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
	$('#prompt').hide();
	

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
	


	//make sure you can't activate p buzzer when typing in answer

	// $(function() {
 //    	var BV = new $.BigVideo();
 //    	BV.init();
 //    	BV.show('http://archive.org/download/BrightSkyAndClouds/SkyAndCloudsh264.mp4',{ambient:true});
	// });

	// header.hide();

	playButton.click(function() {
//tried to hide BV with BV.hide() but didn't work
		playButton.hide();
		gameboard.fadeIn();
		scoreBoard.fadeIn();
		rdOneButton.hide();

	});

	jerseys.click(function() {
		if (playerOneIcon.html() != '' && playerTwoIcon.html() != '') {
    		// jerseys.hide();
    		rdOneButton.fadeIn('slow');
		}
//set delay for jersey hide - buggy - will hide
	});

	blueTeam.one('click', function() {
		//can't figure out how to make the 'img' more specific and why the html is '' when i place an image there
		if (playerOneIcon.html() != '' && playerTwoIcon.html() != '') {
			return;			
		} else if (playerOneIcon.html() == '') {
			playerOneIcon.append('<img src="pictures/blue.png" />');
			$('img').css({'width': '50px', 'height': '50px'});
		} else {
			playerTwoIcon.append('<img src="pictures/blue.png" />');
			$('img').css({'width': '50px', 'height': '50px'});
		}
	});

	redTeam.one('click', function() {
		if (playerOneIcon.html() != '' && playerTwoIcon.html() != '') {
			return;	
		} else if (playerOneIcon.html() == '') {
			playerOneIcon.append('<img src="pictures/red.png" />');
			$('img').css({'width': '50px', 'height': '50px'});
		} else {
			playerTwoIcon.append('<img src="pictures/red.png" />');
			$('img').css({'width': '50px', 'height': '50px'});
		}
	});

	
	rdOneButton.click(function() {
		$('#timer').css({'color':'white'});
		rdOneButton.hide();
		jerseys.hide();
		displayImage(roundCount);
		keystroke.show();
		$('#prompt').show();
		showBlinker();
		showTimer();
		$('.hint').empty();
	});

	// nextRound.click(function() {

	// })


//set the value of the typedGuess - typedGuess.val('') is messing up the function

	submit.click(function (event) {
		clearInterval(counterInterval);
		clearInterval(blinker);
		$('#prompt').hide();
		event.preventDefault();
		buzzedInOne = false;
		answerForm.hide();
		var playerSubmission = typedGuess.val();
		typedGuess.val('');
		// if (typedGuess.val('')) {
		// 	alert('You have to enter something!')
		// } else 

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

			//change to sweet alert
			//add alternate answer and a you're pretty close alert

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
