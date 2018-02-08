const handleResponse = require('../handleResponse')
const addFood = require('./addFood')
const APIhost = `https://pacific-lowlands-10552.herokuapp.com`
const deleteMeal = require('./deleteMeal')

export const addNewFoodRequest = (data) => {
  return fetch(APIhost + `/api/v1/foods`, {
    method: 'post',
    headers:
      { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(newFood => addFood.prependFood(newFood))
    .then($(".new-food")[0].reset())
    .catch(error => console.log({ error }))
}

export const getFoods = () => {
  return fetch(APIhost + `/api/v1/foods`)
    .then(response => handleResponse.handleResponse(response))
    .then(foods => addFood.sortById(foods))
    .then(sortedFoods => addFood.getAllFoods(sortedFoods))
    .catch(error => console.log({ error }));
}


export const deleteFoodonMealRequest = (foodId) => {
  return fetch(APIhost + `/api/v1/meals`)
    .then(response => handleResponse.handleResponse(response))
    .then(meals => deleteMeal.findFoodonMeals(meals, foodId))
    .then(deleteFoodRequest(foodId))
    .catch(error => console.log({ error }));
}

export const deleteFoodRequest = (foodId) => {

  return fetch(APIhost + `/api/v1/foods` + '/' + foodId.toString(), {
    method: 'DELETE',
    headers:
      { 'Content-Type': 'application/json' }
  })
  .then(removeFood(foodId))
  .catch(error => console.log({ error }));
}

const removeFood = (foodId) => {
  document.querySelector(`[data-food-id= "${foodId}"]`).remove();
}

export function editFoodRequest(foodId, html, updatedName, updatedCalories) {
  return fetch(APIhost + `/api/v1/foods` + '/' + foodId, {
    method: 'PUT',
    headers:
      { 'Content-Type': 'application/json' },
    body: JSON.stringify({ food: { name: updatedName, calories: updatedCalories } })
  })
    .catch(error => console.log({ error }));
}

export const deleteFoodFromMealRequest = (mealId, foodId) => {
  return fetch(APIhost + `/api/v1/meals/` + mealId + `/foods/` + foodId, {
    method: 'delete',
    headers:
      { 'Content-Type': 'application/json' }
  })
    .catch(error => console.log({ error }))
}
