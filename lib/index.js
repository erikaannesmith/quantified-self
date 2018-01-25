const getFoods = () => {
return fetch(`http://localhost:3000/api/v1/foods`)
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

$(document).ready(() => {
  getFoods();
});
