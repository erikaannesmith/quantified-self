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
    prependFood(food)
  }
)}

const prependFood = (food) => {
  $('.foods').prepend(`
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
  var foodId = event.currentTarget.dataset.foodId
  return fetch(`https://evening-peak-25213.herokuapp.com/api/v1/foods` + '/' + foodId.toString(), {
    method: 'DELETE',
    headers:
     {'Content-Type': 'application/json'}
  })
  .then(getFoods)
  .catch(error => console.log({error}));
}

const editFood = () => {
  var newName = document.activeElement
//method in process
}


const saveFood = (event) => {
  var newName = document.activeElement
   console.log(newName);
//method in process
}

const addNewFood = () => {
  event.preventDefault()
  $('#new-name-error').hide()
  $('#new-calories-error').hide()
  if ($('#new-name').val() === "") {
    $('#new-name-error').css('display', 'block')
    if ($('#new-calories').val() === "") {
      $('#new-calories-error').css('display', 'block')
    }
  }
  else if ($('#new-calories').val() === "") {
    $('#new-calories-error').css('display', 'block')
  }
  else {
    var data = { name: $('#new-name').val(), calories: $('#new-calories').val()}
    return fetch(`https://evening-peak-25213.herokuapp.com/api/v1/foods`, {
      method: 'post',
      headers:
      { 'Content-Type': 'application/json' },
      body: JSON.stringify(data) })
      .then(response => response.json())
      .then(newFood => prependFood(newFood))
      .then(resetFoodForm)
      .catch(error => console.log({error}))
  }
};

const resetFoodForm = () => {
  $(".new-food")[0].reset();
}

$(document).ready(() => {
  getFoods();
});

$('.foods').on('click', '.delete-food-btn', deleteFood);
$('.foods').on('focusout', saveFood);
$('#submit').on('click', addNewFood)

module.exports = {addNewFood}
