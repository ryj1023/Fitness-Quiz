//define variables
var $ = require('jquery');
export var running = 0;
export var currentQuestion = 0;
export var correctAnswers = 0;
 

//question and answer object array

export var questions = [
	{question: "Which macronutrient contains amino acids?", answers: ["Protein", "Carbohydrates", "Fats", "Sugar"], correctAnswer: 0},
	{question: "Which exercise directly targets the bicep?", answers: ['Pulldown', "Pushup", "Curl", "Flat Press"], correctAnswer:  2},
	{question: "When is the best time to consume a protein shake?", answers: ["Before a workout", "After a workout", "During a workout", "Never"], correctAnswer: 1 }, 
	{question: "What should you always do first when you are working out?", answers: ["Sprint", "Eat", "Stretch", "Sleep"], correctAnswer: 2},
	{question: "How long should you wait until working out the same muscle again?", answers: ["A few hours", "A day", "2-3 days", "2 weeks"], correctAnswer: 2
}];

//append questions and counters

export function userSelect(){

	if(running == 1)
		return;
	
	var questionObject = questions[currentQuestion];
	console.log(questionObject);

	
	var input = $('input[name="choice"]')[questionObject.correctAnswer]
	console.log(input);

	var checked = 0;

	for (var i=0;i<$('input[name="choice"]').length;i++){
		
		if($('input[name="choice"]')[i].checked)
			checked++;
	}

	if(checked == 0){
		alert("Please select a choice.")

		return;
	}



	if (input.checked){
	 correctAnswers++;
	 var dumbbellGif = '<img class="dumbbellPic" src="dumbbell-512.gif" width= "89px" height= "89px">'
	$('.dumbbells').append(dumbbellGif)
	}

	if(questions.length > currentQuestion)
		currentQuestion++;

	console.log(correctAnswers, currentQuestion);

	if(currentQuestion < questions.length)
 		
 		buildForm();

 		else{

 		 displayTotal();
 		 

 		}

 		return correctAnswers;
		
	
};

//append answers

export function buildForm (){
var questionObject = questions[currentQuestion];
$("#title").html(questionObject.question);
	$('.answer').html("");
	for(var i=0; i < 4; i++)
		{
		var option = '<input name="choice" type="radio" class="option" value = "0"><span>' + questionObject.answers[i] + '</span><br>'
		$(".answer").append(option);
		}

		


}

//totals

export function displayTotal(){
	$('.answer').html("");
	$('#submit').hide();
	$('#title').html("You got" + " " + correctAnswers + " "+ "right! Press OK to play again.");
	playAgain = '<button class="submit">OK</button>'
	$('#ok').show();
	$("#ok").click(resetForm);
	$('.johnny2').hide();
	$('.johnny3').show();
	

	
}

//new game

export function resetForm(){
	currentQuestion = 0;
    correctAnswers = 0; 
    $('.dumbbells').html("");
    $('#ok').hide();
    $('#title').html("");
    $('.startButton').html("");
    $('#button').html("");
    $('.johnny2').hide();
    $('.johnny3').hide();
    $('.johnny').show();
    introMessage = '<h1>Fitness Quiz</h1><p class="Questions">Are you ready to play?</p>'   
    $('#title').append(introMessage);
    $("#submit").show();
    buildForm();

    
}
