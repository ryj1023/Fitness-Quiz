let angular = require('angular');
let $ = require('jquery');
let ngRoute = require('angular-route');
let page = angular.module('app', ['ngRoute']);
page.config(function($routeProvider, $locationProvider){ 
    $routeProvider.when('/description', {
      templateUrl: 'description.html',
      controller: "qCtrl"
      })  
      .otherwise({
        redirectTo: '/'
      });

      $locationProvider.html5Mode(true);    
  });
  page.controller('qCtrl', function($scope, $http, $sce, $window) {
        $scope.foodFacts = [];
        $scope.heading ="Welcome!";
        $scope.subheading = "Answer the following questions and we will make out a customized food intake and exercise program just for you!";
        $scope.start = 'Get Started';
        $scope.show = true;
        $scope.input = false;
        $scope.input2 = false;
        $scope.workouts = true;
        $scope.calculator = true;
        $scope.numbers = null;
        $scope.numbersTwo = null;
        $scope.userAnswers = [];
        $scope.programs = "";
        $scope.foodInput = "";
        $scope.foodObject = null;
        $scope.workoutSelect;
        $scope.heightTotal = null;

      $scope.hideFunction = function(){      
        $scope.show = !$scope.show  
    }
    $scope.clearAll = function(){
        $scope.userAnswers = [];
    }
    $scope.showWorkouts = function(){
      $scope.workouts = false;
    }
       $scope.questions = [
        {question: "What is your age?", userInput: 0, tag: "aminos"},
      	{question: "What is your current body weight (in pounds)?", userInput: 1, tag: "aminos"},
      	{question: "What is your height?", userInput: 2, tag: "bicep", answerType: "height"},
      	{question: "What is your target weight (in pounds)?", userInput: 3, tag:"smoothie"},
        {question: "Are you a man or woman?", answers: ["man", "woman"], tag: "aminos", answerType: "radio"}, 
        {question: "How active are you?", answers: ["sedentary (little or no exercise)", "moderate (exercise 3-5 days per week)", "heavy (exercise 6-7 times per week)"], tag: "clock", answerType: "radio"}];
        //Starts new game when 'get started' and/or 'ok' button are clicked
      $scope.newGame = function(){
      $scope.countInput = 0;
      $scope.calories = null;
      $scope.protein = null;
      $scope.carbohydrates = null;
      $scope.fats = null;
      $scope.count = 0;
      $scope.currentQuestion = $scope.questions[$scope.count];
      $scope.choice = {value: null};
      $scope.startGame = true;
      $scope.input = true;
      $scope.input2 = false;
      $scope.programs = [];
      $('.container').css('float', 'none');
      $('.container').css('margin-left', '28%');
      $('.container').css('margin-top', '1%');
};
    $scope.openWindow = function(){
      $window.open($scope.workoutSelect)
    }
      //Correct answer and question counter
    $scope.submitAnswer = function(){
      var choice = $scope.choice.value;
      $scope.choice = {value: null}; 
       if($scope.currentQuestion && $scope.currentQuestion.answerType == "radio"){
          if(choice == null){
             alert("please select a choice.")           
            return;
            }
          else{
            $scope.userAnswers.push(choice);
          }
      }
      else if($scope.currentQuestion && $scope.currentQuestion.answerType == "height"){
          if($scope.numbers == null || $scope.numbers % 1 !== 0){
          alert("please input a number");
          return;
        }
        else{
        $scope.heightTotal = (parseInt($scope.numbers) * 12) + parseInt($scope.numbersTwo);
        $scope.userAnswers.push($scope.heightTotal);
        $scope.heightTotal = null;
        $scope.numbers = null;
        $scope.numbersTwo = null;
          }
      }
      else{
        if($scope.numbers == null || $scope.numbers % 1 !== 0 || $scope.numbers == ""){
          alert("please input a number");
          return;
        }
        else{
        $scope.userAnswers.push($scope.numbers);
        $scope.numbers = null;
        $scope.numbersTwo = null;
          }
      }
      $scope.count++;
      $scope.currentQuestion = $scope.questions[$scope.count];
      $scope.countInput++;
        if($scope.currentQuestion && $scope.currentQuestion.userInput == $scope.countInput  && ($scope.currentQuestion.answerType == "height"))
          {
            $('#input-box-one').attr('placeholder', 'number of feet');           
            $('#input-box-two').attr('placeholder', 'number of inches');
            $scope.input = true;
            $scope.input2 = true;
          }
          else if($scope.currentQuestion && $scope.currentQuestion.userInput == $scope.countInput){
            $scope.input = true;
            $scope.input2 = false;
            $('#input-box-one').attr('placeholder', 'please enter a number');
          }
          else{
            $scope.input = false;
            $scope.input2 = false;
            $('#input-box-one').attr('placeholder', 'please enter a number');
          }
        if($scope.currentQuestion && $scope.count <= $scope.questions.length){
          $scope.currentQuestion = $scope.questions[$scope.count];
      }
          else if($scope.count > 4){
            $('.container').css('float', 'left');
            $('.container').css('margin-right', '0');
            $('.container').css('margin-left', '2%');

            $scope.calculateAnswers($scope.userAnswers[0], $scope.userAnswers[1], $scope.userAnswers[2], $scope.userAnswers[3], $scope.userAnswers[4], $scope.userAnswers[5]);
          }
    } 
          $scope.hasQuestion = function(){
      return $scope.count < $scope.questions.length;
          };
      $scope.calculateAnswers = function(age, currentWeight, currentHeight, targetWeight, gender, active){
        var age = parseInt(age);
        var currentWeight = parseInt(currentWeight);
        var currentHeight = parseInt(currentHeight);
        var targetWeight = parseInt(targetWeight);
        var gender = gender;
        var active = active;

        /* male BMR multiples:  height * 12.7 + weight * 6.23 - age * 6.8 + 66
        female BMR multiples:  height * 4.7 + weight * 4.35 - age * 4.7 + 655
        calories needed - sedentary: BMR * 1.2 moderate: BMR * 1.55 heavy: BMR * 1.9 */

        var maleBMR = (currentHeight * 12.7) + (currentWeight * 6.23) - (age * 6.8) + 66;
        var femaleBMR = (currentHeight * 4.7) + (currentWeight * 4.35) - (age * 4.7) + 655;
        var lightMale = (currentHeight * 12.7) + (currentWeight * 6.23) - (age * 6.8) + 66 * 1.2;
        var moderateMale = (currentHeight * 12.7) + (currentWeight * 6.23) - (age * 6.8) + 66 * 1.55;
        var heavyMale = (currentHeight * 12.7) + (currentWeight * 6.23) - (age * 6.8) + 66 * 1.9;
        var lightFemale = (currentHeight * 4.7) + (currentWeight * 4.35) - (age * 4.7) + 655 * 1.2;
        var moderateFemale = (currentHeight * 4.7) + (currentWeight * 4.35) - (age * 4.7) + 655 * 1.55;
        var heavyFemale = (currentHeight * 4.7) + (currentWeight * 4.35) - (age * 4.7) + 655 * 1.9;
        if(gender == 0 && active == 0){
          $scope.programs = ["http://www.bodybuilding.com/fun/timothyf.htm", "http://www.muscleandfitness.com/workouts/workout-routines/torch-your-fat-workout-routine", "http://healthyliving.azcentral.com/work-out-five-days-per-week-weights-2692.html"]
          $scope.calories = targetWeight * 18;
          $scope.protein = targetWeight;
          $scope.carbohydrates = targetWeight * 3;
          $scope.fats = targetWeight / 10;
        }
        else if(gender == 0 && active == 1){
          $scope.programs = ["http://www.bodybuilding.com/fun/timothyf.htm", "http://bodybuildingindex.com/3-day-split-workout-for-gaining-muscle-mass/", "http://www.muscleandfitness.com/workouts/workout-routines/torch-your-fat-workout-routine"];
          $scope.calories = targetWeight * 18;
          $scope.protein = targetWeight;
          $scope.carbohydrates = targetWeight* 3;
          $scope.fats = targetWeight / 10;
        }
        else if(gender == 0 && active == 2){
          $scope.programs = ["http://www.bodybuilding.com/fun/lee-labrada-12-week-lean-body-trainer.html", "http://www.bodybuilding.com/fun/jake-wilson-project-mass-trainer.html","http://healthyliving.azcentral.com/work-out-five-days-per-week-weights-2692.html"];
          $scope.calories = targetWeight * 18;
          $scope.protein = targetWeight;
          $scope.carbohydrates = targetWeight * 3;
          $scope.fats = targetWeight / 10;
        }
        else if(gender == 1 && active == 0){
          $scope.programs = ["http://www.bodybuilding.com/content/ultimate-beginners-machine-workout-for-women.html","http://www.bodybuilding.com/content/awesome-abdominal-workouts-for-women.html","http://healthyliving.azcentral.com/work-out-five-days-per-week-weights-2692.html"];
          $scope.calories = targetWeight * 18;
          $scope.protein = targetWeight;
          $scope.carbohydrates = targetWeight * 3;
          $scope.fats = targetWeight / 10;
        }
        else if(gender == 1 && active == 1){
          $scope.programs = ["http://www.bodybuilding.com/fun/3day.htm","http://www.bodybuilding.com/fun/erin-stern-elite-body-4-week-fitness-trainer.html", "http://healthyliving.azcentral.com/work-out-five-days-per-week-weights-2692.html"];
          $scope.calories = targetWeight * 18;
          $scope.protein = targetWeight;
          $scope.carbohydrates = targetWeight * 3;
          $scope.fats = targetWeight / 10;
        }
        else if(gender == 1 && active == 2){
          $scope.programs = ["http://www.bodybuilding.com/fun/erin-stern-elite-body-4-week-fitness-trainer.html","http://www.bodybuilding.com/fun/built-by-science-six-week-muscle-building-trainer.html","http://healthyliving.azcentral.com/work-out-five-days-per-week-weights-2692.html"];
          $scope.calories = targetWeight * 18;  
          $scope.protein = targetWeight;
          $scope.carbohydrates = targetWeight * 3;
          $scope.fats = targetWeight / 10;
        }
      };
    var getFoodObject = function(food){
      var text = food.split(" ");
      for(var i=0;i<text.length;i++){
        if(text[i].length<4)
          return
      }
        if(food.length < 4) return
      var request = {
        api_key: "Uexsdv07ZLPp9MU9LUtJQ5iEgASowWwa6s1yEcI8",
        q: food,
        sort: 'r',
        max: "10",
        callback: ""    
    };
      $http({           
        method: 'GET',
        url: "http://api.nal.usda.gov/ndb/search/?format=json",
        params: request
      })
      .then(function(objects) {
         $scope.foodFacts = []
        for(var i = 0; i<objects.data.list.item.length; i++){
          var ids = objects.data.list.item[i].ndbno;
          var names = objects.data.list.item[i].name;
          $scope.foodFacts.push({foodId: ids, foodName: names})
         if(i > 2){
             return
         }
        }
      })
    }
      $scope.getNutritionFacts = function(food){
          var request = {
          api_key: "Uexsdv07ZLPp9MU9LUtJQ5iEgASowWwa6s1yEcI8",
          ndbno: food,
          type: 'f',
          format: "json" 
      };
        $http({           
          method: 'GET',
          url: "http://api.nal.usda.gov/ndb/reports/",
          params: request
        })
        .then(function(response) {
          $scope.foodObject = response.data.report.food;
          console.log($scope.foodObject)
          $scope.showNutrients($scope.foodObject);
        })
       }
       $scope.submitFood = function(){
        if($scope.foodInput == ""){
            alert('please input a food to search')
            return;
        }
        else{
          
       getFoodObject($scope.foodInput)
       $scope.foodObject = null;
          }
     }
       $scope.showNutrients = function(nutrient){
          if(nutrient.unit && nutrient.measures[0].qty && nutrient.measures[0].label && (nutrient.unit == "kcal" || nutrient.name == "Protein" || nutrient.name == "Total lipid (fat)" || nutrient.name == "Carbohydrate, by difference" )){
            return true;
          }
          else{
            return false;
          }
       }
       $scope.selectFood = function(dataList){
        $scope.userFoodInfo = [];
        var food = angular.element(document).find("#inputFood").val();
          for(var i = 0; i<$scope.foodFacts.length; i++){
            $scope.foodObject = $scope.foodFacts[i];
            $scope.userFood = $scope.foodFacts[i].foodName;
            $scope.userFoodId = $scope.foodFacts[i].foodName;
          if(food == $scope.userFood){
            var foodObjectId = $scope.foodObject.foodId;
            var foodObjectName = $scope.userFood;
            $scope.userFoodInfo.push({foodId: foodObjectId, foodName: foodObjectName})
            $scope.getNutritionFacts($scope.userFoodInfo[0].foodId);
          }
        }
       }
});