// Foods

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
  var foodId = $('.delete-food-btn').data('food-id').toString();
  return fetch(`https://evening-peak-25213.herokuapp.com/api/v1/foods` + '/' + foodId.toString(), {
    method: 'DELETE',
    headers:
     {'Content-Type': 'application/json'}
  })
  .then(getFoods)
  .catch(error => console.log({error}));
}

function editFood()  {
  var foodId = $(this).data('food-id').toString();
  var html = $(this).html();
  var updatedName = (this.getElementsByClassName('name')[0]).innerText;
  var updatedCalories = (this.getElementsByClassName('calories')[0]).innerText;


  return fetch(`https://evening-peak-25213.herokuapp.com/api/v1/foods` + '/' + foodId, {
    method: 'PUT',
    headers:
      {'Content-Type': 'application/json'},
    body: JSON.stringify({food: {name: updatedName, calories: updatedCalories}})
  })
  .catch(error => console.log({error}));
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

function filterFoods() {
  var input, filter, foods, food, name, i;
  input = document.getElementById('foodFilter');
  filter = input.value.toUpperCase();
  foods = document.getElementsByClassName("foods");
  food = document.getElementsByClassName('food');

  for (i = 0; i < food.length; i++) {
    name = food[i].getElementsByClassName("name")[0];
    if (name.innerHTML.toUpperCase().indexOf(filter) > -1) {
      food[i].style.display = "";
    } else {
      food[i].style.display = "none";
    }
  }
}

$(document).ready(() => {
  getFoods();
});

$('.foods').on('click', '.delete-food-btn', deleteFood);
$('.foods').on('blur', '.food', editFood);
$('#submit').on('click', addNewFood);
$('#foodFilter').on('keyup', filterFoods);


module.exports = {addNewFood}





// Meals

const getMeals = () => {
  return fetch(`https://evening-peak-25213.herokuapp.com/api/v1/meals`)
    .then(response => handleResponses(response))
    .then(meals => getAllMeals(meals))
    .catch(error => console.log({ error }));
}

const handleResponses = (response) => {
  return response.json()
    .then(json => {
      if (!response.ok) {
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

const getAllMeals = (meals) => {
  return meals.forEach((meal) => {
    prependMeal(meal);
  }
  )
}

const prependMeal = (meal) => {
  if (meal.name === "Breakfast") {
    (meal.foods).forEach(function(food) {
      prependToBreakfast(food);
    })
    getBreakfastCalorieSum(meal);
  }
  else if (meal.name === "Lunch") {
    (meal.foods).forEach(function (food) {
      prependToLunch(food)
    })
    getLunchCalorieSum(meal);
  }
  else if (meal.name === "Dinner") {
    (meal.foods).forEach(function (food) {
      prependToDinner(food)
    })
    getDinnerCalorieSum(meal);
  }
  else if (meal.name === "Snack") {
    (meal.foods).forEach(function (food) {
      prependToSnack(food);
    })
    getSnackCalorieSum(meal);
  }
}

const addToNameCal = (food) => {
  return `<div contenteditable="true">
    <p class='name'> ${food.name} </p>
    </div>
    <div contenteditable="true">
    <p class='calories' >${food.calories} </p>
    </div>`
}

const prependToBreakfast = (food) => {
  $('.breakfasts').prepend(`
    <article class='breakfast' data-breakfast-food-id=${food.id}>` + addToNameCal(food) +
      `<p class='delete'><button data-breakfast-food-id=${food.id} class='delete-food-btn'><i class="fa fa-trash"></i></button></p>
    </article>`
  )
}

const prependToLunch = (food) => {
  $('.lunches').prepend(`
    <article class='lunch' data-lunch-food-id=${food.id}>` + addToNameCal(food) +
      `<p class='delete'><button data-lunch-food-id=${food.id} class='delete-food-btn'><i class="fa fa-trash"></i></button></p>
    </article>`
  )
}

const prependToDinner = (food) => {
    $('.dinners').prepend(`
      <article class='dinner' data-dinner-food-id=${food.id}>` + addToNameCal(food) +
        `<p class='delete'><button data-dinner-food-id=${food.id} class='delete-food-btn'><i class="fa fa-trash"></i></button></p>
      </article>`
    )
}

const prependToSnack = (food) => {
  $('.snacks').prepend(`
    <article class='snack' data-snack-food-id=${food.id}>` + addToNameCal(food) +
      `<p class='delete'><button data-snack-food-id=${food.id} class='delete-food-btn'><i class="fa fa-trash"></i></button></p>
    </article>`
  )
}

const getBreakfastCalorieSum = (meal) => {
  var total = 0
  var sum = meal.foods.forEach(function(food) {
    total += food.calories
  })
  appendToCalories(total, meal)
}

const getLunchCalorieSum = (meal) => {
  var total = 0
  var sum = meal.foods.forEach(function(food) {
    total += food.calories
  })
  appendToCalories(total, meal)
}

const appendToCalories = (total, meal) => {
  $(`.${meal.name.toLowerCase()}-calorie-sum`).append(total);
}

const getDinnerCalorieSum = (meal) => {
  var total = 0
  var sum = meal.foods.forEach(function(food) {
    total += food.calories
  })
  appendToCalories(total, meal)
}

const getSnackCalorieSum = (meal) => {
  var total = 0
  var sum = meal.foods.forEach(function(food) {
    total += food.calories
  })
  appendToCalories(total, meal)
}

$(document).ready(() => {
  getMeals();
});
