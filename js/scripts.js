var gameboard = $('.gameboard');
var header = $('header');
var playButton = $('#play');
var blueTeam = $('#choice-one');
var redTeam = $('#choice-two');
var blueTeamIcon = "pictures/blue-football-top-md.png";
var redTeamIcon = "pictures/red-t-shirt-icon-hi.png";
var playerOneIcon = $('#player1icon');
var playerTwoIcon = $('#player2icon');
var rdOneButton = $('#rd-1');
var jerseys = $('.jerseys');
var count = 0;
var images = $('.images');
var keystroke = $('.keystroke');
var answerForm = $('#answer');
var submit = $('.submit');
var roundCount = 0;

var roundOneArray = [
{photo: 'Vegetables/romanesco.jpg', answer: 'romanesco cauliflower'},
{photo: 'Vegetables/kohlrabi.jpg', answer: 'kohlrabi'},
{photo: 'Vegetables/artichoke.jpg', answer: 'artichoke'},
{photo: 'Vegetables/leek.jpg', answer: 'leek'},
{photo: 'Vegetables/ginger.jpg', answer: 'ginger'},
{photo: 'Vegetables/savoy-cabbage.jpg', answer: 'cabbage'},
{photo: 'Vegetables/brussels-sprouts.jpg', answer: 'brussels sprouts'},
{photo: 'Vegetables/parsnip.jpg', answer: 'parsnip'},
{photo: 'Vegetables/fennel.jpg', answer: 'fennel'},
{photo: 'Vegetables/radicchio.jpg', answer: 'radicchio'},
];


//When page loads the title enters from the left
//Replace jerseys with colored tags - http://fortawesome.github.io/Font-Awesome/icon/tag/
//Add select teams text
// possible add it into an accordian + add progress bar

var displayQuestionOne = function(question, container) {
	var newDiv = $('<div><h3></h3></div>');
	newDiv.children('h3').html("NAME THAT VEGETABLE");
	header.append(newDiv);
};

// var nextQuestion = function () {
// 	var newDiv = $('<div><h3></h3></div>');
// 	newDiv.children('h3').html("Next Question in"+ );
// 	header.append(newDiv);
// };

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
		console.log(roundOneArray[0].photo);
		images.append('<img src='+roundOneArray[roundCount].photo+' />');
		roundCount++;	
	};

// var displayAnswerInput = function () {

// }

var showTimer = function() {
  var counter = 11;
  setInterval(function() {
    counter--;
    if (counter >= 0) {
      $('#timer').text(counter);
    }
    else if (counter === 0) {
       alert('Time\'s Up!');
       clearInterval(counter);
       answerForm.hide();
    }
    
  }, 1000);
    
};
  


$(document).ready(function() {
	shuffle(roundOneArray);
	console.log(roundOneArray);
	gameboard.hide();
	answerForm.hide();
	keystroke.hide();
	

	$(document).bind('keydown', function(e) {
		if (e.keyCode == 81) {
			answerForm.fadeIn();
			keystroke.append('<p>PLAYER ONE BUZZED IN!</p>');
		}
	});

	$(document).bind('keydown', function(e) {
		if (e.keyCode == 80) {
			answerForm.fadeIn();
			keystroke.append('<p>PLAYER TWO BUZZED IN!</p>');
		}
	});

	// $(function() {
 //    	var BV = new $.BigVideo();
 //    	BV.init();
 //    	BV.show('http://archive.org/download/BrightSkyAndClouds/SkyAndCloudsh264.mp4',{ambient:true});
	// });

	// header.hide();

// set buzz in key

	playButton.click(function() {
//tried to hide BV with BV.hide() but didn't work
		playButton.hide();
		gameboard.show();
		rdOneButton.attr('disabled', true);	
	});

	jerseys.click(function() {
		count++;
    	console.log(count);
    	if (count >= 2) {
    		rdOneButton.removeAttr('disabled');
    	}
	});

	blueTeam.one('click', function() {
		//can't figure out how to make the 'img' more specific and why the html is '' when i place an image there
		if (playerOneIcon.html() != '' && playerTwoIcon.html() != '') {
			return;			
		} else if (playerOneIcon.html() == '') {
			playerOneIcon.append('<img src="pictures/blue-football-top-md.png" />');
			$('img').css({'width': '90px', 'height': '73px'});
		} else {
			playerTwoIcon.append('<img src="pictures/blue-football-top-md.png" />');
			$('img').css({'width': '90px', 'height': '73px'});
		}
	});

	redTeam.one('click', function() {
		if (playerOneIcon.html() != '' && playerTwoIcon.html() != '') {
			return;	
		} else if (playerOneIcon.html() == '') {
			playerOneIcon.append('<img src="pictures/red-t-shirt-icon-hi.png" />');
			$('img').css({'width': '90px', 'height': '73px'});
		} else {
			playerTwoIcon.append('<img src="pictures/red-t-shirt-icon-hi.png" />');
			$('img').css({'width': '90px', 'height': '73px'});
		}
	});

	
	rdOneButton.click(function() {
		jerseys.hide();
		rdOneButton.hide();
		displayQuestionOne();
		displayImage(roundCount);
		keystroke.show();
		showTimer();


	});

	submit.click(function () {
		var playerSubmission = submit.val();
		if (playerSubmission.toLowerCase() == roundOneArray[roundCount].name) {
			alert('CORRECT!');
			//change to sweet alert
			//add alternate answer and a you're pretty close alert
			} else {
				alert('Sorry, that\'s incorrect');
			}
		displayImage(roundCount);
	});

});


//add text "Please select your team's jersey"
	


	// var turnCount = function () {

	// }



//Homepage


// Hide team selector div
// Hide round 1 div
// hide scoreboard div



//Host appears with speech bubble with div inside. Please choose your team! Host and speech bubble hides

/*Div appears with two sweater images - choose your team - use thumbnail option
First click determines player 1 - change player 1's scoreboard icon to the respective shirt color;
2nd player is the other color shirt

prompt ready button()
	Hide Team selector div
	Show round 1 div + image + question header
	Show buzzer divs

/show round 1 div function
	on initial ready button click activates round 1 div function -
		pulls image from array 
		mathRandom to show it



		[{photo: .img, name: XX},
		 {photo: .img, name: XX},
		 {photo: .img, name: XX},
		 {photo: .img, name: XX}]
		 
		 }

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