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

var roundOneArray = [
{photo: 'Vegetables/romanesco.jpg', answer: 'romanesco cauliflower'},
{photo: 'Vegetables/kohlrabi.jpg', answer: 'kohlrabi'},
{photo: 'Vegetables/artichoke.jpg', answer: 'artichoke'},
{photo: 'Vegetables/garlic.jpg', answer: 'garlic'},
{photo: 'Vegetables/ginger.jpg', answer: 'ginger'},
{photo: 'Vegetables/savoy-cabbage.jpg', answer: 'cabbage'},
{photo: 'Vegetables/brussels-sprouts.jpg', answer: 'brussels sprouts'},
{photo: 'Vegetables/parsnip.jpg', answer: 'parsnip'},
{photo: 'Vegetables/fennel.jpg', answer: 'fennel'},
{photo: 'Vegetables/radicchio.jpg', answer: 'radicchio'},
{photo: 'Vegetables/asparagus.jpg', answer: 'asparagus'},
{photo: 'Vegetables/kale.jpg', answer: 'kale'},
{photo: 'Vegetables/tomatoes.jpg', answer: 'tomato'},
{photo: 'Vegetables/basil.jpg', answer: 'basil'},
{photo: 'Vegetables/onions.jpg', answer: 'onion'},
{photo: 'Vegetables/carrot.jpg', answer: 'carrot'},
{photo: 'Vegetables/broccoli.jpg', answer: 'broccoli'},
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

var displayImage = function (roundCount) {
// add loop to the shuffled array
		
		images.append('<img class="img-rd-1" src='+roundOneArray[roundCount].photo+' />');
	};

var showTimer = function() {
  var counter = 41;
// above doesn't work and timer stops at 5 seconds - still need to fix the buzzer

  setInterval(function() {
    counter--;
    if (counter > 0) {
      $('#timer').text('00:'+counter);
    }
    // // if (counter > 0 && oneBuzz.html('PLAYER ONE BUZZED IN!')) {
    // //   clearInterval(counter);

    // }
    if (counter === 0) {
       $('#timer').css({'color':'red'});
       answerForm.hide();
       plyrOne.html(score1);
	   plyrTwo.html(score2);
	   roundCount++;
	   images.empty();
	   rdOneButton.text('NEXT');
	   rdOneButton.show();
	   buzzedInOne = false;
	   keystroke.empty();
	   clearInterval(counter);
	   alert('Time\'s Up!');

    }
    
  }, 1000);
    
};

//determine winner
var winner = function(score1,score2) {
	if (score1 === 3) {
			swal({   title: 'Player 1 is the winner!',
			text: "XXX"})
	} else if (score2 === 3) {
			swal({   title: 'Player 2 is the winner!',
			text: "XXX"});
	} else {
		return;
	}
	reset();
};

var reset = function () {
	shuffle(roundOneArray);
	console.log(roundOneArray);
	gameboard.hide();
	answerForm.hide();
	keystroke.hide();
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
	

	$(document).bind('keydown', function(e) {
		if (e.keyCode == 81 && buzzedInOne == false) {
			buzzedInOne = true;
			answerForm.fadeIn();
			// keystroke.empty();
			keystroke.append('<p id="one-buzz">PLAYER ONE BUZZED IN!</p>');
		}
	});

	$(document).bind('keydown', function(e) {
		if (e.keyCode == 80 && buzzedInOne == false) {
			buzzedInOne = true;
			answerForm.fadeIn();
			// keystroke.empty();
			keystroke.append('<p id="two-buzz">PLAYER TWO BUZZED IN!</p>');
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
		showTimer();
	});

	// nextRound.click(function() {

	// })


//set the value of the typedGuess - typedGuess.val('') is messing up the function

	submit.click(function (event) {
		event.preventDefault();
		buzzedInOne = false;
		keystroke.empty();
		var playerSubmission = typedGuess.val();
		// if (typedGuess.val('')) {
		// 	alert('You have to enter something!')
		// } else 

		if (playerSubmission.toLowerCase() == roundOneArray[roundCount].answer && oneBuzz.html('PLAYER ONE BUZZED IN!')) {
			console.log('true');
			
			score1++;
			plyrOne.html(score1);
			plyrTwo.html(score2);
			roundCount++;
			alert('CORRECT!');
			images.empty();
			rdOneButton.text('NEXT');
			rdOneButton.show();
			//change to sweet alert
			//add alternate answer and a you're pretty close alert
		} else if (playerSubmission.toLowerCase() == roundOneArray[roundCount].answer && twoBuzz.html('PLAYER TWO BUZZED IN!')) {
			score2++;
			plyrOne.html(score1);
			plyrTwo.html(score2);
			roundCount++;
			alert('CORRECT!');
			images.empty();
			rdOneButton.text('NEXT');
			rdOneButton.show();

		} else {
			console.log('false');
			alert('Sorry, that\'s incorrect');
			plyrOne.html(score1);
			plyrTwo.html(score2);
			roundCount++;
			images.empty();
			rdOneButton.text('NEXT');
			rdOneButton.show();
		}
	
		winner(score1, score2);		

	});

});


//Host appears with speech bubble with div inside. Please choose your team! Host and speech bubble hides

/*

/buzzer function
	onclick -
	show answer input container
		hover
		blinking cursor
	if P1 button clicked -
		text input = right answer {
		p1 score++
		sweet alert good job
		} else
		{alert sorry; p1 score--}
	if P2 button clicked -
		text input = right answer {
		p2 score++
		}	

/In between round 1 and 2; show current score and text - now onto round 2

/Round 2






/scoreboard + timer
show scoreboard div with colored sweater icon
show timer container - if timer hits 0 then answer input container becomes disabled


*/