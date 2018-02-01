const handleResponse = require('../handleResponse')
const addMeal = require('./addMeal')
const totalsTable = require('./totalsTable')
const updateDiary = require('./updateDiary')
const APIhost = `https://evening-peak-25213.herokuapp.com`

export const getMeals = () => {
  return fetch(APIhost + `/api/v1/meals`)
    .then(response => handleResponse.handleResponse
      (response))
    .then(meals => getAllMeals(meals))
    .catch(error => console.log({ error }));
}

const getFoodsDiary = () => {
  return fetch(APIhost + `/api/v1/foods`)
    .then(response => handleResponse.handleResponse(response))
    .then(foods => getAllFoodsDiary(foods))
    .catch(error => console.log({ error }));
}

export const addFoodToMeal = (food, meal) => {
  let foodId = food.dataset.foodId
  let name = food.getElementsByTagName('p')[0].innerText
  let calories = food.getElementsByTagName('p')[1].innerText
  let data = { name: name, calories: calories }
  var mealId = addMeal.getMealId(meal);
  let foodAttributes = food.getElementsByTagName('p')
  let foodObject = {name: foodAttributes[0].innerText, calories: parseInt(foodAttributes[1].innerText)}
  return fetch(APIhost + `/api/v1/meals/` + mealId + `/foods/` + foodId, {
    method: 'post',
    headers:
      { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(addMeal.prependToMeal(foodObject, {name: meal}))
    .then(updateDiary.updateRemainingCaloriesPostCreate(foodObject, meal))
    .then(updateDiary.updateTotalCaloriesPostCreate(foodObject, meal))
    .then(updateDiary.updateTotalsTablePostCreate(foodObject, meal))
    .then(updateDiary.uncheckBoxes())
    // .then(clearCheckBoxes)
    // this still requires a refresh and does not clear the checkboxes
    .catch(error => console.log({ error }))
};

export function deleteMeal(event) {
  let food = event.target.parentElement.parentElement.parentElement;
  let mealName = food.className.toLowerCase()
  let mealId = addMeal.getMealId(mealName)
  let foodId = food.getAttribute(`data-${mealName}-food-id`)
  return fetch(APIhost + `/api/v1/meals/` + mealId + `/foods/` + foodId, {
    method: 'delete',
    headers:
      { 'Content-Type': 'application/json' }
  })
    .then(x => console.log(x))
    .then(updateDiary.removeFromMeal(foodId, mealName))
    .then(updateDiary.updateRemainingCalories(food, mealName))
    .then(updateDiary.updateTotalCalories(food, mealName))
    .then(updateDiary.updateTotalsTable(food, mealName))
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