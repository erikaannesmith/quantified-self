const handleResponse = require('../handleResponse')
const addFood = require('./addFood')
const APIhost = `https://evening-peak-25213.herokuapp.com`
const sortFoods = require('../meals/sortFoods')

export const addNewFoodRequest = (data) => {
  return fetch(APIhost + `/api/v1/foods`, {
    method: 'post',
    headers:
      { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(newFood => addFood.prependFood(newFood))
    .then(resetFoodForm)
    .catch(error => console.log({ error }))
}

const resetFoodForm = () => {
  $(".new-food")[0].reset();
}

export const getFoods = () => {
  return fetch(APIhost + `/api/v1/foods`)
    .then(response => handleResponse.handleResponse(response))
    .then(foods => addFood.sortById(foods))
    .then(sortedFoods => addFood.getAllFoods(sortedFoods))
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

export function editFood() {
  var foodId = $(this).data('food-id').toString();
  var html = $(this).html();
  var updatedName = (this.getElementsByClassName('name')[0]).innerText;
  var updatedCalories = (this.getElementsByClassName('calories')[0]).innerText;

  return fetch(APIhost + `/api/v1/foods` + '/' + foodId, {
    method: 'PUT',
    headers:
      { 'Content-Type': 'application/json' },
    body: JSON.stringify({ food: { name: updatedName, calories: updatedCalories } })
  })
    .catch(error => console.log({ error }));
}

