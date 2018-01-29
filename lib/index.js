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
  appendToTotalCaloriesConsumed(meals);  
  appendToTotalGoalCalories(meals); 
  appendToTotalCaloriesRemaining(meals); 
  return meals.forEach((meal) => {
    prependMeal(meal);
  })
}

const prependMeal = (meal) => {  
  (meal.foods).forEach(function(food) {
    prependToMeal(food, meal);
  })
  appendToCalories(meal);
  appendToRemainingCalories(meal);
}

const addToNameCal = (food) => {
  return `<div contenteditable="true">
    <p class='name'> ${food.name} </p>
    </div>
    <div contenteditable="true">
    <p class='calories' >${food.calories} </p>
    </div>`
}

const prependToMeal = (food, meal) => {
  let pluralMeal;
  let mealType = meal.name.toLowerCase()
  if (mealType === "lunch") {
    pluralMeal = mealType + 'es'
  }
  else {
    pluralMeal = mealType + 's'
  }
  $(`.${pluralMeal}`).prepend(`
    <article class='${mealType}' data-${mealType}-food-id=${food.id}>` + addToNameCal(food) +
    `<p class='delete'><button data-${mealType}-food-id=${food.id} class='delete-food-btn'><i class="fa fa-trash"></i></button></p>
    </article>`
  )
}

const getCalorieSum = (meal) => {
  let total = 0
  let sum = meal.foods.forEach(function (food) {
    total += food.calories
  })
  return total
}

const appendToCalories = (meal) => {
  let total = getCalorieSum(meal)
  $(`.${meal.name.toLowerCase()}-calorie-sum`).append(total);
}

const goal = (meal) => {
  if (meal.name === "Breakfast") {
    return 400;
  }
  else if (meal.name === "Lunch") {
    return 600;
  }
  else if (meal.name === "Dinner") {
    return 800;
  }
  else if (meal.name === "Snack") {
    return 200;
  }
}

const getCalorieRemaining = (meal) => {
  let total = 0
  let sum = meal.foods.forEach(function (food) {
    total += food.calories
  })
  let remaining = goal(meal) - total
  return remaining
}

const appendToRemainingCalories = (meal) => {
  let remaining = getCalorieRemaining(meal)
  $(`.${meal.name.toLowerCase()}-calorie-remaining`).append(remaining);
  styleRemainingCalories(meal, remaining);
}

const styleRemainingCalories = (meal, remaining) => {
  if (remaining >= 0) {
    $(`.${meal.name.toLowerCase()}-calorie-remaining`).addClass("positive-remaining")
  }
  else {
    $(`.${meal.name.toLowerCase()}-calorie-remaining`).addClass("negative-remaining")
  }
}

const getTotalGoalCalories = (meals) => {
  let totalGoal = 0;
  meals.forEach(function(meal) {
    return totalGoal += goal(meal)
  })
  return totalGoal
}

const appendToTotalGoalCalories = (meals) => {
  let totalGoal = getTotalGoalCalories(meals)
  $(`.total-goal-calorie-number`).append(totalGoal);
}

const getTotalCaloriesConsumed = (meals) => {
  let total = 0
  meals.forEach(function(meal) {
    total += getCalorieSum(meal);
  })
  return total;
}

const appendToTotalCaloriesConsumed = (meals) => {
  let total = getTotalCaloriesConsumed(meals)
  $(`.total-consumed-calories-number`).append(total);  
}

const getTotalRemainingCalories = (meals) => {
  return getTotalGoalCalories(meals) - getTotalCaloriesConsumed(meals)  
}

const appendToTotalCaloriesRemaining = (meals) => {
  let totalRemaining = getTotalRemainingCalories(meals);
  $(`.total-remaining-calories-number`).append(totalRemaining); 
  styleTotalRemainingCalories(totalRemaining)   
}

const styleTotalRemainingCalories = (totalRemaining) => {
  if (totalRemaining >= 0) {
    $(`.total-remaining-calories-number`).addClass("positive-remaining")
  }
  else {
    $(`.total-remaining-calories-number`).addClass("negative-remaining")
  }
}

$(document).ready(() => {
  getMeals();
});
