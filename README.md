# Fitness-Quiz

<h1>How Fit Are You?</h1>

Fitness assessment portfolio project

<h1>Screenshots</h1>



<h1>Overview</h1>

This fitness assessment is a perfect platform for users all over the fitness spectrum. It is made to obtain information about the user by asking a series of questions about weight, height, goals, and current fitness activity. It then takes this information, displays a reccommended daily nutrient intake, allows a food search which returns nutrient information, and selects custom workout regimens for the user. 

<h1>How Fit Are You?</h1>

Fitness assessment portfolio project

<h1>Screenshots</h1>

![Screenshot](https://github.com/ryj1023/Fitness-Quiz/blob/master/Screenshot1.png)
![Screenshot](https://github.com/ryj1023/Fitness-Quiz/blob/master/Screenshot2.png)
![Screenshot](https://github.com/ryj1023/Fitness-Quiz/blob/master/Screenshot3.png)



<h1>Overview</h1>

This fitness assessment is a perfect platform for users all over the fitness spectrum. It is made to obtain information about the user by asking a series of questions about weight, height, goals, and current fitness activity. It then takes this information, displays a reccommended daily nutrient intake, allows a food search which returns nutrient information, and selects custom workout regimens for the user. 

<h1>Why Care?</h1>

With more than a third of americans considered obese, and hundreds of diets and workout plans out there, finding a food intake and workout program customized for you can be a daunting task. This app solves these problems with easy to follow guidelines to make this lifestyle change as seemless as possible.

<h1>UX</h1>

The UX in this app is designed to be user friendly and fluid. the user is prompted with a series of questions to either type in a submit form or to select a radio value; everything is calculated by this approach. Once the results are shown, there is a search container where the user enters in a food they wish to see the per cup nutritional value for. A list of foods are displayed and the user may select one. Once this is done, the nutrients are displayed for the food that the user selected. The workouts are selected with a simple dropdown menu which allows the user to select a workout based on intesity. After the workout is selected, it is immediately opened in a new tab on the browser.

<h1>Working Prototype</h1>

You can access a working prototype of the app here: http://ryj1023.github.io/Fitness-Quiz/build/

<h1>Features</h1>

* Questions are displayed using ng-show and a counter variable to toggle through an array with each question. 
* Object used to calculate the users Basal Metabolic Rate. 
* Daily calories, protein, carbohydrates, and fats are displayed to the user based on the user answer object. 
* Displayed using the ng-repeat directive. 
* API is called which takes the foodID number and returns the nutrition facts to the user. The workout select dropdown has three options for workout plans the user can choose from, all located in separate arrays.
* Mobile responsive, and switches to a single column layout for screens that have a width less than 1000 pixels.

<h1>Technical</h1>

* Built using AngularJS for the front-end.
* Uses Angular's HTTP method for API calls.

<h1>Upcoming Features</h1>

Future features will include back-end functionality using NodeJS, MongoDB, and Express from the MEAN stack to allow the user to have personal profiles and save their customized settings. It will allow the user to select foods from the USDA API and store them in a database for the user to plan out their meals on any given day.
