let angular = require('angular');
let $ = require('jquery');

let page = angular.module('app', []);

angular.module("app").service("Flicker", function() {

  this.generateUrls = function(photos) {
    var urls = [];

    photos.forEach(function(photo) {
      urls.push({ url: "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_c.jpg" });
    })

    return urls;
  }
  
      
  })

  page.controller('qCtrl', function(Flicker, $scope, $http, $sce) {
  
  let getImage = function(tags){
    let request = {
      method: 'flickr.photos.search',
      api_key: '9134ca097d07ef599eddd1f582e39ef8',
      tags: tags,
      format: 'json',
      nojsoncallback: 1    
  };
  
    $http({           
      method: 'GET',
      url: "https://api.flickr.com/services/rest/",
      params: request
    })

    .then(function(response) {

      $scope.flickerUrls = Flicker.generateUrls(response.data.photos.photo);
      $scope.backgroundImage = $scope.flickerUrls;
      $scope.randomImage($scope.backgroundImage);
    

    })

     $scope.randomImage = function(backgroundImage){

        $scope.random = Math.floor(Math.random() * backgroundImage.length);   
        $scope.randImage = backgroundImage[$scope.random];

    }

};
    
        $scope.heading ='Fitness Quiz';
        $scope.subheading = 'Are you ready to play?';
        $scope.start = 'Get Started';
        $scope.show = true;

      $scope.hideFunction = function(){
        $scope.show = !$scope.show
    
  }
       
       $scope.questions = [
      	{question: "Which macronutrient contains amino acids?", answers: ["Protein", "Carbohydrates", "Fats", "Sugar"], correctAnswer: 0, tag: "aminos"},
      	{question: "Which exercise directly targets the bicep?", answers: ['Pulldown', "Pushup", "Curl", "Flat Press"], correctAnswer:  2, tag: "bicep"},
      	{question: "When is the best time to consume a protein shake?", answers: ["Before a workout", "After a workout", "During a workout", "Never"], correctAnswer: 1, tag:"smoothie"}, 
      	{question: "What should you always do first when you are working out?", answers: ["Sprint", "Eat", "Stretch", "Sleep"], correctAnswer: 2, tag: "dumbbell"},
      	{question: "How long should you wait until working out the same muscle again?", answers: ["A few hours", "A day", "2-3 days", "2 weeks"], correctAnswer: 2
        , tag: "clock"}];

//Starts new game when 'get started' and/or 'ok' button are clicked

      $scope.newGame = function(){
    
      $scope.countCorrect = 0;
      $scope.count = 0;
      $scope.currentQuestion = $scope.questions[$scope.count];
      $scope.choice = {value: null};
      $scope.startGame = true;
      getImage($scope.currentQuestion.tag);
      $('.dumbbells').html("")
  
};

//Correct answer and question counter

    $scope.submitAnswer = function(){
    
      if ($scope.choice.value == $scope.currentQuestion.correctAnswer){
        $scope.countCorrect++;

         let dumbbellGif = '<img class="dumbbellPic" src="dumbbell-512.gif" width= "89px" height= "89px">'
          $('.dumbbells').append(dumbbellGif)
      }
        else if($scope.choice.value == null){
        alert("Please select a choice.")
        return;
      }

      $scope.choice.value = null;
      $scope.count++;
        if($scope.count <= $scope.questions.length)
      $scope.currentQuestion = $scope.questions[$scope.count];
        getImage($scope.currentQuestion.tag);
    
      };

  //returns true when the count is less than the length of question object
  
    $scope.hasQuestion = function(){
   
      return $scope.count < $scope.questions.length;
  
  };
    
});

