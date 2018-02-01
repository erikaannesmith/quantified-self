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
  var foodObject = { name: food.getElementsByTagName('p')[0].innerText, 
                     calories: food.getElementsByTagName('p')[1].innerText, 
                     id: food.dataset.foodId }
  let data = { name: foodObject.name, calories: foodObject.calories }
  var mealId = addMeal.getMealId(meal);
  return fetch(APIhost + `/api/v1/meals/` + mealId + `/foods/` + foodObject.id, {
    method: 'post',
    headers:
      { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(addMeal.prependToMeal(foodObject, {name: meal}))
    .then(updateDiary.updateTotalsPostCreate(foodObject, meal))
    .then(updateDiary.uncheckBoxes())
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
    .then(updateDiary.updateTotalsPostDelete(food, mealName))
    .catch(error => console.log({ error }))
}

const getAllFoodsDiary = (foods) => {
  return foods.forEach((food) => {
    addMeal.prependFoodDiary(food)
  })
}

const getAllMeals = (meals) => {
  getFoodsDiary();
  getTotalsTable(meals);
  return meals.forEach((meal) => {
    addMeal.prependMeal(meal);
  })
}

const getTotalsTable = (meals) => {
  totalsTable.appendToTotalCaloriesConsumed(meals);
  totalsTable.appendToTotalGoalCalories(meals);
  totalsTable.appendToTotalCaloriesRemaining(meals);
}