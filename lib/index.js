const getFoods = () => {
return fetch(`https://evening-peak-25213.herokuapp.com/api/v1/foods`)
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
      <article class='food' data-food-id=${food.id}>
    <div contenteditable="true">
        <p class='name'> ${food.name} </p>
    </div>
    <div contenteditable="true">
        <p class='calories' >${food.calories} </p>
    </div>
        <p class='delete'><button data-food-id=${food.id} class='delete-food-btn'><i class="fa fa-trash"></i></button></p>
</article>`)
}

const deleteFood = (event) => {
  event.preventDefault();
  var foodId = $('.delete-food-btn').data('food-id');
  return fetch(`https://evening-peak-25213.herokuapp.com/api/v1/foods` + '/' + food_id,{
    method: 'DELETE',
    headers:
     {'Content-Type': 'application/json'}
  })
  .then(response => handleResponse(response))
  .catch(error => console.log({error}));
}

const editFood = () => {
  var newName = document.activeElement
}


const saveFood = (event) => {
  var newName = document.activeElement
   console.log(newName);


}

$(document).ready(() => {
  getFoods();
});

$('.foods').on('click', '.delete-food-btn', deleteFood);
$('.foods').on('focusout', saveFood);
