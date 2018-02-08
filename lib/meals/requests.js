const handleResponse = require('../handleResponse')
const addMeal = require('./addMeal')
const updateDiary = require('./updateDiary')
const APIhost = `https://pacific-lowlands-10552.herokuapp.com`
const eventHandler = require('./eventHandler')

export const getMeals = () => {
  return fetch(APIhost + `/api/v1/meals`)
    .then(response => handleResponse.handleResponse
      (response))
    .then(meals => eventHandler.getAllMeals(meals))
    .catch(error => console.log({ error }));
}

export const getFoodsDiary = () => {
  return fetch(APIhost + `/api/v1/foods`)
    .then(response => handleResponse.handleResponse(response))
    .then(foods => eventHandler.sortById(foods))
    .then(sortedFoods => eventHandler.getAllFoodsDiary(sortedFoods))
    .catch(error => console.log({ error }));
}

export const addFoodToMealRequest = (foodObject, data, mealId, food, meal) => {
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

export function deleteMealRequest(food, mealName, mealId, foodId) {
  return fetch(APIhost + `/api/v1/meals/` + mealId + `/foods/` + foodId, {
    method: 'delete',
    headers:
      { 'Content-Type': 'application/json' }
  })
    .then(food.remove())
    .then(updateDiary.updateTotalsPostDelete(food, mealName))
    .catch(error => console.log({ error }))
}
