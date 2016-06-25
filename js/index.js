
var $ = require('jquery');
import * as fitness from '../quiz/fitness'
$(document).ready(function(){
 $('#question1').hide();
 $('.johnny2').hide();
 $('.johnny3').hide();
 
//start game

$('.startButton').click(function(){
  $('.johnny').fadeOut(200, function(){ $('.johnny2').fadeIn(200)});
  $('#introDisplay').fadeOut(200, function(){$('#question1').fadeIn()});
	});

$('#ok').hide();
$("#submit").click(fitness.userSelect);


fitness.buildForm();

});