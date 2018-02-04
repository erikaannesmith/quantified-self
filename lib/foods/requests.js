const handleResponse = require('../handleResponse')
const addFood = require('./addFood')
const APIhost = `https://evening-peak-25213.herokuapp.com`

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


const findMealsbyFood = (foodId) => {
  return fetch(APIhost + `/api/v1/meals`)
    .then(response => handleResponse.handleResponse
      (response))
    .then(meals => console.log(meals))
  // capture the meals array
//iterate over and find foods by id
// call delete endpoint for meals
    .catch(error => console.log({ error }));
}


export const deleteFoodRequest = (foodId) => {

  return fetch(APIhost + `/api/v1/foods` + '/' + foodId.toString(), {
    method: 'DELETE',
    headers:
      { 'Content-Type': 'application/json' }
  })
    .catch(error => console.log({ error }));
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
