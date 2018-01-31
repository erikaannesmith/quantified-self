// Foods

const foodRequests = require('./foods/requests')
const foodFilter = require('./foods/filter')

$(document).ready(() => {
  foodRequests.getFoods();
  $('.foods').on('click', '.delete-food-btn', foodRequests.deleteFood);
  $('.foods').on('blur', '.food', foodRequests.editFood);
  $('#submit').on('click', foodRequests.addNewFood);
  $('#foodFilter').on('keyup', foodFilter.filterFoods);
});

// Meals

const mealRequests = require('./meals/requests')
const updateDiary = require('./meals/updateDiary')
const mealFilter = require('./meals/filter')
const addMeal = require('./meals/addMeal')

$(document).ready(() => {
  mealRequests.getMeals();
  $('.new-food-btn').on('click', updateDiary.redirectNewFood)
  $('#diaryFilter').on('keyup', mealFilter.filterDiary);
  $('.add-meal-btn').on('click', addMeal.getCheckBoxIds);
  $('.breakfasts').on('click', '.delete-meal-btn', mealRequests.deleteBreakfastMeal);
  // $('.snacks').on('click', '.delete-meal-btn', deleteSnackMeal);
  // $('.lunches').on('click', '.delete-meal-btn', deleteLunchMeal);
  // $('.dinners').on('click', '.delete-meal-btn', deleteDinnerMeal);
});




// const redirectNewFood = () => {
//   document.location.href = 'http://localhost:8080/foods.html';
// }

// const getMeals = () => {
//   return fetch(`https://evening-peak-25213.herokuapp.com/api/v1/meals`)
//     .then(response => handleResponses(response))
//     .then(meals => getAllMeals(meals))
//     .catch(error => console.log({ error }));
// }

// const handleResponses = (response) => {
//   return response.json()
//     .then(json => {
//       if (!response.ok) {
//         const error = {
//           status: response.status,
//           statusText: response.statusText,
//           json,
//         };
//         return Promise.reject(error);
//       }
//       return json;
//     })
// }

// const getAllMeals = (meals) => {
//   appendToTotalCaloriesConsumed(meals);
//   appendToTotalGoalCalories(meals);
//   appendToTotalCaloriesRemaining(meals);
//   getFoodsDiary();
//   return meals.forEach((meal) => {
//     prependMeal(meal);
//   })
// }

// const prependMeal = (meal) => {
//   (meal.foods).forEach(function(food) {
//     prependToMeal(food, meal);
//   })
//   appendToCalories(meal);
//   appendToRemainingCalories(meal);
// }

// const addToNameCal = (food) => {
//   return `<p class='name'> ${food.name} </p>
//     <p class='calories' >${food.calories} </p>`
// }

// const prependToMeal = (food, meal) => {
//   let pluralMeal;
//   let mealType = meal.name.toLowerCase()
//   if (mealType === "lunch") {
//     pluralMeal = mealType + 'es'
//   }
//   else {
//     pluralMeal = mealType + 's'
//   }
//   $(`.${pluralMeal}`).prepend(`
//     <article class='${mealType}' data-${mealType}-food-id=${food.id}>` + addToNameCal(food) +
//     `<p class='delete'><button data-${mealType}-food-id=${food.id} class='delete-meal-btn'><i class="fa fa-trash"></i></button></p>
//     </article>`
//   )
// }

// const getCalorieSum = (meal) => {
//   let total = 0
//   let sum = meal.foods.forEach(function (food) {
//     total += food.calories
//   })
//   return total
// }

// const appendToCalories = (meal) => {
//   let total = getCalorieSum(meal)
//   $(`.${meal.name.toLowerCase()}-calorie-sum`).append(total);
// }

// const goal = (meal) => {
//   if (meal.name === "Breakfast") {
//     return 400;
//   }
//   else if (meal.name === "Lunch") {
//     return 600;
//   }
//   else if (meal.name === "Dinner") {
//     return 800;
//   }
//   else if (meal.name === "Snack") {
//     return 200;
//   }
// }

// const getCalorieRemaining = (meal) => {
//   let total = 0
//   let sum = meal.foods.forEach(function (food) {
//     total += food.calories
//   })
//   let remaining = goal(meal) - total
//   return remaining
// }

// const appendToRemainingCalories = (meal) => {
//   let remaining = getCalorieRemaining(meal)
//   $(`.${meal.name.toLowerCase()}-calorie-remaining`).append(remaining);
//   styleRemainingCalories(meal, remaining);
// }

// const styleRemainingCalories = (meal, remaining) => {
//   if (remaining >= 0) {
//     if ($(`.${meal.name.toLowerCase()}-calorie-remaining`).hasClass('negative-remaining')) {
//       $(`.${meal.name.toLowerCase()}-calorie-remaining`).removeClass('negative-remaining')
//     }
//     $(`.${meal.name.toLowerCase()}-calorie-remaining`).addClass("positive-remaining")
//   }
//   else {
//     $(`.${meal.name.toLowerCase()}-calorie-remaining`).addClass("negative-remaining")
//   }
// }

// const getTotalGoalCalories = (meals) => {
//   let totalGoal = 0;
//   meals.forEach(function(meal) {
//     return totalGoal += goal(meal)
//   })
//   return totalGoal
// }

// const appendToTotalGoalCalories = (meals) => {
//   let totalGoal = getTotalGoalCalories(meals)
//   $(`.total-goal-calorie-number`).append(totalGoal);
// }

// const getTotalCaloriesConsumed = (meals) => {
//   let total = 0
//   meals.forEach(function(meal) {
//     total += getCalorieSum(meal);
//   })
//   return total;
// }

// const appendToTotalCaloriesConsumed = (meals) => {
//   let total = getTotalCaloriesConsumed(meals)
//   $(`.total-consumed-calories-number`).append(total);
// }

// const getTotalRemainingCalories = (meals) => {
//   return getTotalGoalCalories(meals) - getTotalCaloriesConsumed(meals)
// }

// const appendToTotalCaloriesRemaining = (meals) => {
//   let totalRemaining = getTotalRemainingCalories(meals);
//   $(`.total-remaining-calories-number`).append(totalRemaining);
//   styleTotalRemainingCalories(totalRemaining)
// }

// const styleTotalRemainingCalories = (totalRemaining) => {
//   if (totalRemaining >= 0) {
//     if ($(`.total-remaining-calories-number`).hasClass('negative-remaining')) {
//       $(`.total-remaining-calories-number`).removeClass('negative-remaining')
//     }
//     $(`.total-remaining-calories-number`).addClass("positive-remaining")
//   }
//   else {
//     $(`.total-remaining-calories-number`).addClass("negative-remaining")
//   }
// }


//food diary

// const getFoodsDiary = () => {
//   return fetch(`https://evening-peak-25213.herokuapp.com/api/v1/foods`)
//   .then(response => handleResponseDiary(response))
//   .then(foods => getAllFoodsDiary(foods))
//   .catch(error => console.log({error}));
// }

// const handleResponseDiary = (response) => {
//   return response.json()
//   .then(json => {
//     if(!response.ok){
//       const error = {
//         status: response.status,
//         statusText: response.statusText,
//         json,
//       };
//       return Promise.reject(error);
//     }
//   return json;
//   })
// }

// const getAllFoodsDiary = (foods) => {
//   return foods.forEach((food) => {
//     prependFoodDiary(food)
//   }
// )}

// const prependFoodDiary = (food) => {
//   $('.diaries').prepend(`
//     <article class='diary' data-food-id=${food.id}>
//         <p class='name'> ${food.name} </p>
//         <p class='calories' >${food.calories} </p>
//         <p class='check-box' checked><input data-checkBox-id=${food.id} type="checkbox"></p>
//     </article>`)
// }

// function filterDiary() {
//   var input, filter, diaries, diary, name, i;
//   input = document.getElementById('diaryFilter');
//   filter = input.value.toUpperCase();
//   diaries = document.getElementsByClassName("diaries");
//   diary = document.getElementsByClassName('diary');

//   for (i = 0; i < diary.length; i++) {
//     name = diary[i].getElementsByClassName("name")[0];
//     if (name.innerHTML.toUpperCase().indexOf(filter) > -1) {
//       diary[i].style.display = "";
//     } else {
//       diary[i].style.display = "none";
//     }
//   }
// }



// function getCheckBoxIds() {
//   event.preventDefault();
//   let diaries = document.getElementsByClassName('diary')
//   let meal = this.innerText;
//   let checkedFoods = getCheckedFoods();
//   checkedFoods.forEach(function(id) {
//     for (var i = 0; i < diaries.length; i++) { 
//       if (diaries[i].dataset.foodId === id) { 
//         addFoodToMeal(diaries[i], meal) 
//       } 
//     }
//   })
// }

// const getCheckedFoods = () => {
//   let checkboxes = $('input[type=checkbox]')
//   let checkedFoods = []
//   for (var i = 0; i < checkboxes.length; i++) {
//     if (checkboxes[i].checked) {
//       checkedFoods.push(checkboxes[i].dataset.checkboxId)
//     }
//   }
//   return checkedFoods
// }

// const addFoodToMeal = (food, meal) => {
//   let foodId = food.dataset.foodId
//   let name = food.getElementsByTagName('p')[0].innerText
//   let calories = food.getElementsByTagName('p')[1].innerText
//   let data = {name: name, calories: calories}
//   var mealId = getMealId(meal);
//   return fetch(`https://evening-peak-25213.herokuapp.com/api/v1/meals/` + mealId + `/foods/` + foodId, {
//     method: 'post',
//     headers:
//     { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data)
//   })
//   .then(response => response.json())
//   // .then(getMeals)
//   // .then(clearCheckBoxes)
//   // this still requires a refresh and does not clear the checkboxes
//   .catch(error => console.log({ error }))
// };

// const getMealId = (meal) => {
//   if (meal === "Breakfast") {
//     return "1";
//   }
//   else if (meal === "Snacks") {
//     return "2";
//   }
//   else if (meal === "Lunch") {
//     return "3";
//   }
//   else if (meal === "Dinner") {
//     return "4";
//   }
// }

// function deleteBreakfastMeal(event) {
//   event.preventDefault
//   let foodId = this.dataset.breakfastFoodId
//   let food = this.parentElement.parentElement
//   return fetch(`https://evening-peak-25213.herokuapp.com/api/v1/meals/1/foods/` + foodId, {
//     method: 'delete',
//     headers: 
//     {'Content-Type': 'application/json'}
//   })
//   .then(x => console.log(x))
//   .then(removeFromMeal(foodId, 'breakfast'))
//   .then(updateRemainingCalories(food, 'breakfast'))
//   .then(updateTotalCalories(food, 'breakfast'))
//   .then(updateTotalsTable(food, 'breakfast'))
//   .catch(error => console.log({ error }))
// }

// function deleteSnackMeal(event) {
//   event.preventDefault
//   let foodId = this.dataset.snackFoodId
//   let food = this.parentElement.parentElement
//   return fetch(`https://evening-peak-25213.herokuapp.com/api/v1/meals/2/foods/` + foodId, {
//     method: 'delete',
//     headers:
//       { 'Content-Type': 'application/json' }
//   })
//     .then(x => console.log(x))
//     .then(removeFromMeal(foodId, 'snack')) 
//     .then(updateRemainingCalories(food, 'snack')) 
//     .then(updateTotalCalories(food, 'snack'))  
//     .then(updateTotalsTable(food, 'snack'))    
//     .catch(error => console.log({ error }))
// }

// function deleteLunchMeal(event) {
//   event.preventDefault
//   let foodId = this.dataset.lunchFoodId
//   let food = this.parentElement.parentElement  
//   return fetch(`https://evening-peak-25213.herokuapp.com/api/v1/meals/3/foods/` + foodId, {
//     method: 'delete',
//     headers:
//       { 'Content-Type': 'application/json' }
//   })
//     .then(x => console.log(x))
//     .then(removeFromMeal(foodId, 'lunch')) 
//     .then(updateRemainingCalories(food, 'lunch')) 
//     .then(updateTotalCalories(food, 'lunch'))    
//     .then(updateTotalsTable(food, 'lunch'))        
//     .catch(error => console.log({ error }))
// }

// function deleteDinnerMeal(event) {
//   event.preventDefault
//   let foodId = this.dataset.dinnerFoodId
//   let food = this.parentElement.parentElement  
//   return fetch(`https://evening-peak-25213.herokuapp.com/api/v1/meals/4/foods/` + foodId, {
//     method: 'delete',
//     headers:
//       { 'Content-Type': 'application/json' }
//   })
//     .then(x => console.log(x))
//     .then(removeFromMeal(foodId, 'dinner'))  
//     .then(updateRemainingCalories(food, 'dinner'))  
//     .then(updateTotalCalories(food, 'dinner')) 
//     .then(updateTotalsTable(food, 'dinner'))         
//     .catch(error => console.log({ error }))
// }

// const removeFromMeal = (foodId, meal) => {
//   $(`.${meal}[data-${meal}-food-id=` + foodId + ']').remove()
// }

// const updateRemainingCalories = (food, meal) => {
//   let currentRemaining = parseInt($(`.${meal}-calorie-remaining`)[0].innerText)
//   $(`.${meal}-calorie-remaining`).empty()
//   let newRemainingCal = postDeleteRemainingCalories(food, meal, currentRemaining)
//   $(`.${meal}-calorie-remaining`).append(postDeleteRemainingCalories(food, meal, currentRemaining))
//   styleRemainingCalories({name: meal}, newRemainingCal)
// }

// const postDeleteRemainingCalories = (food, meal, currentRemaining) => {
//   let calories = parseInt(food.getElementsByTagName('p')[1].innerText)
//   return (currentRemaining + calories)
// }

// const updateTotalCalories = (food, meal) => {
//   let currentTotal = parseInt($(`.${meal}-calorie-sum`)[0].innerText)
//   $(`.${meal}-calorie-sum`).empty()
//   let newTotalCal = postDeleteTotalCalories(food, meal, currentTotal)
//   $(`.${meal}-calorie-sum`).append(postDeleteTotalCalories(food, meal, currentTotal))  
// }

// const postDeleteTotalCalories = (food, meal, currentTotal) => {
//   let calories = parseInt(food.getElementsByTagName('p')[1].innerText)
//   return (currentTotal - calories)
// }

// const updateTotalsTable = (food, meal) => {
//   updateTotalsTableConsumed(food, meal);
//   updateTotalsTableRemaining(food, meal);
// }

// const updateTotalsTableConsumed = (food, meal) => {
//   let currentTotalConsumed = parseInt($('.total-consumed-calories-number')[0].innerText)
//   $('.total-consumed-calories-number').empty()
//   let newTotalConsumed = postDeleteTotalConsumed(food, meal, currentTotalConsumed)
//   $('.total-consumed-calories-number').append(newTotalConsumed)
// }

// const postDeleteTotalConsumed = (food, meal, currentTotalConsumed) => {
//   let calories = parseInt(food.getElementsByTagName('p')[1].innerText)
//   return (currentTotalConsumed - calories)
// }

// const updateTotalsTableRemaining = (food, meal) => {
//   let currentTotalRemaining = parseInt($('.total-remaining-calories-number')[0].innerText)
//   $('.total-remaining-calories-number').empty()
//   let newTotalRemaining = postDeleteTotalRemaining(food, meal, currentTotalRemaining)
//   $('.total-remaining-calories-number').append(newTotalRemaining) 
//   styleTotalRemainingCalories(newTotalRemaining)
// }

// const postDeleteTotalRemaining = (food, meal, currentTotalRemaining) => {
//   let calories = parseInt(food.getElementsByTagName('p')[1].innerText)
//   return (currentTotalRemaining + calories)
// }


