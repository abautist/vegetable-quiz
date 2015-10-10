var gameboard = $('.gameboard');

$(document).ready(function() {
	console.log('working!');
	$(function() {
    	var BV = new $.BigVideo();
    	BV.init();
    	BV.show('http://archive.org/download/BrightSkyAndClouds/SkyAndCloudsh264.mp4',{ambient:true});
	});
	gameboard.hide();
	$('header').hide();

	// var showGameBoard = function () {

	// }



});

//Homepage

/*When page loads the title enters from the left
Hide team selector div
Hide round 1 div
hide scoreboard div

*/

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