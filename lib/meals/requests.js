const handleResponse = require('../handleResponse')
const addMeal = require('./addMeal')
const totalsTable = require('./totalsTable')

export const getMeals = () => {
  return fetch(`https://evening-peak-25213.herokuapp.com/api/v1/meals`)
    .then(response => handleResponse.handleResponse
      (response))
    .then(meals => getAllMeals(meals))
    .catch(error => console.log({ error }));
}

const getFoodsDiary = () => {
  return fetch(`https://evening-peak-25213.herokuapp.com/api/v1/foods`)
    .then(response => handleResponse.handleResponse(response))
    .then(foods => getAllFoodsDiary(foods))
    .catch(error => console.log({ error }));
}

const addFoodToMeal = (food, meal) => {
  let foodId = food.dataset.foodId
  let name = food.getElementsByTagName('p')[0].innerText
  let calories = food.getElementsByTagName('p')[1].innerText
  let data = { name: name, calories: calories }
  var mealId = getMealId(meal);
  return fetch(`https://evening-peak-25213.herokuapp.com/api/v1/meals/` + mealId + `/foods/` + foodId, {
    method: 'post',
    headers:
      { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    // .then(getMeals)
    // .then(clearCheckBoxes)
    // this still requires a refresh and does not clear the checkboxes
    .catch(error => console.log({ error }))
};

function deleteBreakfastMeal(event) {
  event.preventDefault
  let foodId = this.dataset.breakfastFoodId
  let food = this.parentElement.parentElement
  return fetch(`https://evening-peak-25213.herokuapp.com/api/v1/meals/1/foods/` + foodId, {
    method: 'delete',
    headers:
      { 'Content-Type': 'application/json' }
  })
    .then(x => console.log(x))
    .then(removeFromMeal(foodId, 'breakfast'))
    .then(updateRemainingCalories(food, 'breakfast'))
    .then(updateTotalCalories(food, 'breakfast'))
    .then(updateTotalsTable(food, 'breakfast'))
    .catch(error => console.log({ error }))
}

function deleteSnackMeal(event) {
  event.preventDefault
  let foodId = this.dataset.snackFoodId
  let food = this.parentElement.parentElement
  return fetch(`https://evening-peak-25213.herokuapp.com/api/v1/meals/2/foods/` + foodId, {
    method: 'delete',
    headers:
      { 'Content-Type': 'application/json' }
  })
    .then(x => console.log(x))
    .then(removeFromMeal(foodId, 'snack'))
    .then(updateRemainingCalories(food, 'snack'))
    .then(updateTotalCalories(food, 'snack'))
    .then(updateTotalsTable(food, 'snack'))
    .catch(error => console.log({ error }))
}

function deleteLunchMeal(event) {
  event.preventDefault
  let foodId = this.dataset.lunchFoodId
  let food = this.parentElement.parentElement
  return fetch(`https://evening-peak-25213.herokuapp.com/api/v1/meals/3/foods/` + foodId, {
    method: 'delete',
    headers:
      { 'Content-Type': 'application/json' }
  })
    .then(x => console.log(x))
    .then(removeFromMeal(foodId, 'lunch'))
    .then(updateRemainingCalories(food, 'lunch'))
    .then(updateTotalCalories(food, 'lunch'))
    .then(updateTotalsTable(food, 'lunch'))
    .catch(error => console.log({ error }))
}

function deleteDinnerMeal(event) {
  event.preventDefault
  let foodId = this.dataset.dinnerFoodId
  let food = this.parentElement.parentElement
  return fetch(`https://evening-peak-25213.herokuapp.com/api/v1/meals/4/foods/` + foodId, {
    method: 'delete',
    headers:
      { 'Content-Type': 'application/json' }
  })
    .then(x => console.log(x))
    .then(removeFromMeal(foodId, 'dinner'))
    .then(updateRemainingCalories(food, 'dinner'))
    .then(updateTotalCalories(food, 'dinner'))
    .then(updateTotalsTable(food, 'dinner'))
    .catch(error => console.log({ error }))
}

const getAllFoodsDiary = (foods) => {
  return foods.forEach((food) => {
    addMeal.prependFoodDiary(food)
  })
}

const getAllMeals = (meals) => {
  totalsTable.appendToTotalCaloriesConsumed(meals);
  totalsTable.appendToTotalGoalCalories(meals);
  totalsTable.appendToTotalCaloriesRemaining(meals);
  getFoodsDiary();
  return meals.forEach((meal) => {
    addMeal.prependMeal(meal);
  })
}