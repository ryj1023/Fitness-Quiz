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

  page.controller('qCtrl', function($scope, $http, $sce) {

        $scope.foodFacts = [];
        $scope.heading ="Lets Get Fit!";
        $scope.subheading = "Answer the following questions and we will make out a customized food intake and exercise program just for you!";
        $scope.start = 'Get Started';
        $scope.show = true;
        $scope.input = false;
        $scope.workouts = true;
        $scope.calculator = true;
        $scope.numbers = null;
        $scope.userAnswers = [];
        $scope.programs = "";
        $scope.foodInput = "";

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
       {question: "How old are you?", userInput: 0, tag: "aminos"},
      	{question: "What is your current body weight?", userInput: 1, tag: "aminos"},
      	{question: "What is your height in inches?", userInput: 2, tag: "bicep"},
      	{question: "What is your target weight?", userInput: 3, tag:"smoothie"},
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
      //getImage($scope.currentQuestion.tag);
      $('.dumbbells').html("")
      $scope.input = true;
      $scope.programs = [];

};

//Correct answer and question counter

    $scope.submitAnswer = function(){
      
      var choice = $scope.choice.value;

      $scope.choice = {value: null}; 

      console.log($scope.currentQuestion);


       if($scope.currentQuestion && $scope.currentQuestion.answerType == "radio"){

        //$(".submit").css('margin-left', '-17%', 'margin-top', '1%');

          if(choice == null){

            alert("please select a choice.")
            
            return;

          }

          else
          {

            console.log(choice, $scope.count);

            $scope.userAnswers.push(choice);

        }

      }

      else{

        if($scope.numbers == null || $scope.numbers % 1 !== 0){

          alert("please input a number");

          return;
        }

        else{

        $scope.userAnswers.push($scope.numbers);

        $scope.numbers = null;

          }

      }

      $scope.count++;

      $scope.currentQuestion = $scope.questions[$scope.count];

      $scope.countInput++;

        if ($scope.currentQuestion && $scope.currentQuestion.userInput == $scope.countInput)

      {


        $scope.input = true;
            
      }

      else{

        $scope.input = false;
       
      
      }
      

        if($scope.currentQuestion && $scope.count <= $scope.questions.length){
          $scope.currentQuestion = $scope.questions[$scope.count];

            //getImage($scope.currentQuestion.tag);
      }
  
          else if($scope.count > 4){

            console.log($scope.userAnswers[4], $scope.userAnswers[5]);

            $scope.calculateAnswers($scope.userAnswers[0], $scope.userAnswers[1], $scope.userAnswers[2], $scope.userAnswers[3], $scope.userAnswers[4], $scope.userAnswers[5]);

          }
          
         } 



          $scope.hasQuestion = function(){
   
      return $scope.count < $scope.questions.length;
  
  };

    //  $scope.resetPlaceholder = function () {
          
    //       $scope.string = "";
    // };
     
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
          console.log($scope.programs);
          $scope.calories = lightMale;
          $scope.protein = targetWeight;
          $scope.carbohydrates = targetWeight * 3;
          $scope.fats = targetWeight / 10;
          

        }

        else if(gender == 0 && active == 1){

          $scope.programs = ["http://www.bodybuilding.com/fun/timothyf.htm", "http://bodybuildingindex.com/3-day-split-workout-for-gaining-muscle-mass/", "http://www.muscleandfitness.com/workouts/workout-routines/torch-your-fat-workout-routine"];
          $scope.calories = moderateMale;
          $scope.protein = targetWeight;
          $scope.carbohydrates = targetWeight* 3;
          $scope.fats = targetWeight / 10;
          

        }

        else if(gender == 0 && active == 2){

          $scope.programs = ["http://www.bodybuilding.com/fun/lee-labrada-12-week-lean-body-trainer.html", "http://www.bodybuilding.com/fun/jake-wilson-project-mass-trainer.html","http://healthyliving.azcentral.com/work-out-five-days-per-week-weights-2692.html"];
          $scope.calories = heavyMale;
          $scope.protein = targetWeight;
          $scope.carbohydrates = targetWeight * 3;
          $scope.fats = targetWeight / 10;
         
          
        }

        else if(gender == 1 && active == 0){

          $scope.programs = ["http://www.bodybuilding.com/content/ultimate-beginners-machine-workout-for-women.html","http://www.bodybuilding.com/content/awesome-abdominal-workouts-for-women.html","http://healthyliving.azcentral.com/work-out-five-days-per-week-weights-2692.html"];
          $scope.calories = lightFemale;
          $scope.protein = targetWeight;
          $scope.carbohydrates = targetWeight * 3;
          $scope.fats = targetWeight / 10;
          

        }

        else if(gender == 1 && active == 1){

          $scope.programs = ["http://www.bodybuilding.com/fun/3day.htm","http://www.bodybuilding.com/fun/erin-stern-elite-body-4-week-fitness-trainer.html", "http://healthyliving.azcentral.com/work-out-five-days-per-week-weights-2692.html"];
          $scope.calories = moderateFemale;
          $scope.protein = targetWeight;
          $scope.carbohydrates = targetWeight * 3;
          $scope.fats = targetWeight / 10;
         
        }

        else if(gender == 1 && active == 2){

          $scope.programs = ["http://www.bodybuilding.com/fun/erin-stern-elite-body-4-week-fitness-trainer.html","http://www.bodybuilding.com/fun/built-by-science-six-week-muscle-building-trainer.html","http://healthyliving.azcentral.com/work-out-five-days-per-week-weights-2692.html"];
          $scope.calories = heavyFemale;
          $scope.protein = targetWeight;
          $scope.carbohydrates = targetWeight * 3;
          $scope.fats = targetWeight / 10;
          
        }


      };


    var getFoodObject = function(food){
      var request = {
        api_key: "Uexsdv07ZLPp9MU9LUtJQ5iEgASowWwa6s1yEcI8",
        q: food,
        sort: 'r',
        max: "10",    
    };
    
      $http({           
        method: 'GET',
        url: "http://api.nal.usda.gov/ndb/search/?format=json",
        params: request
      })

      .then(function(objects) {

        //console.log(objects.data.list.item[0].ndbno);

         var foods = []


        for(var i = 0; i<objects.data.list.item.length; i++){

          var ids = objects.data.list.item[i].ndbno;

          foods.push({foodId: ids})

        }

          getNutritionFacts(foods)

      })

    }

      var getNutritionFacts = function(foods){

        for(var i = 0; i<foods.length; i++){

          var itemIds = foods[i].foodId;

          var request = {
          api_key: "Uexsdv07ZLPp9MU9LUtJQ5iEgASowWwa6s1yEcI8",
          ndbno: itemIds,
          type: 'f',
          format: "json" 
      };
      
        $http({           
          method: 'GET',
          url: "http://api.nal.usda.gov/ndb/reports/",
          params: request
        })

        .then(function(response) {

        $scope.foodFacts.push(response.data.report.food);

        console.log($scope.foodFacts);

          // for(var i = 0; response.data.report.food.nutrients.length; i++){

          //   if(response.data.report.food.nutrients[i]){

          //     if(response.data.report.food.nutrients[0].measures[0])
          //       $scope.label = response.data.report.food.nutrients[0].measures[0].label;
          //       $scope.qty = response.data.report.food.nutrients[0].measures[0].qty;
          //       console.log("" + $scope.qty + " " + $scope.label + "");
          //       console.log("" + $scope.itemCal + ":" + " " + $scope.calValue + "");
          //     }

          //     else if(response.data.report.food.nutrients[i].unit == "kcal"){

          //   $scope.itemCal = response.data.report.food.nutrients[i].unit;
          //   $scope.calValue = response.data.report.food.nutrients[i].value;

          //     console.log("" + $scope.itemCal + ":" + " " + $scope.calValue + "");
          //       }

          //       else if(response.data.report.food.nutrients[i].name == "Protein"){

          //         $scope.itemProtein = response.data.report.food.nutrients[i].name;
          //         $scope.itemGrams = response.data.report.food.nutrients[i].unit;
          //         $scope.itemValue = response.data.report.food.nutrients[i].value;

          //         console.log("" + $scope.itemProtein + ":" + " " + $scope.itemValue + $scope.itemGrams + "")
                  
          //       }


          //   $scope.value = response.data.report.food.nutrients[i].value;
          //   $scope.itemProtein = response.data.report.food.nutrients[i].name;


            

          //   }

          //   else{

          //       return $scope.itemCal = null;
          //   }

              //}

        })
    }

       }

       $scope.submitFood = function(){

        if($scope.foodInput == ""){

            alert('please input a food to search')

            return;
        }

        else{

       getFoodObject($scope.foodInput);

          }

     }

       $scope.showNutrients = function(nutrient){

        console.log('clicked');

          if(nutrient.unit && (nutrient.name == "Protein" || nutrient.name == "Total lipid (fat)" || nutrient.name == "Carbohydrate, by difference")){

            console.log(nutrient.name);

            return true;

          }

          else{

            return false;
          }

       }
 
});

// Nutritionix Application ID - 609d4710 API key - cff373cdc574efff50cf77f5abb7e42b

//USDA API key Uexsdv07ZLPp9MU9LUtJQ5iEgASowWwa6s1yEcI8 

