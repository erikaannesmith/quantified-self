const getFoods = () => {
  return fetch(`https://localhost:8080/api/v1/foods`)
  .then(response => handleResponse(response))
  .then(foods => getAllFoods(foods))
  .catch(error => console.log({error}));
}

const handleResponse = (response) => {
  return response.json()
  .then(json => {
    if(!response.ok){
      const error = {
        status: response.status,
        statusText: response.statusText,
        json,
      };
      return Promise.reject(error);
    }
  return json;
  })
}

const getAllFoods = (foods) => {
  return foods.forEach((food) => {
    appendFood(food)
  }
)}

const appendFood = (food) => {
  $('.foods').append(`
      <article class='food'>
        <p class='name'>${food.name}</p>
        <p class='calories'>${food.calories}</p>
        <p class='delete'><button data-food-id=${food.id} class='delete'><i class="fa fa-trash"></i></button></p>
      </article>`)
}

const addNewFood = () => {
  event.preventDefault()
  var data = { name: $('#new-name').val(), calories: $('#new-calories').val()}
  return fetch(`https://evening-peak-25213.herokuapp.com/api/v1/foods`, {
    method: 'post',
    headers:
    { 'Content-Type': 'application/json' },
    body: JSON.stringify(data) })
    .then(response => response.json())
    .then(newFood => appendFood(newFood))
    .then(resetFoodForm)
    .catch(error => console.log({error}))
};

const resetFoodForm = () => {
  $(".new-food")[0].reset();
}

$(document).ready(() => {
  getFoods();
});

$('#submit').on('click', addNewFood)

module.exports = {addNewFood}