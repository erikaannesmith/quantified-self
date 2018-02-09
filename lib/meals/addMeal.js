const requests = require('./requests')
const eventHandler = require('./eventHandler')

export function getCheckBoxIds() {
  event.preventDefault();
  let diaries = document.getElementsByClassName('diary')
  let meal = event.currentTarget.id;
  let checkedFoods = getCheckedFoods();
  checkedFoods.forEach(function(id) {
    for (var i = 0; i < diaries.length; i++) {
      if (diaries[i].dataset.foodId === id) {
        eventHandler.addFoodToMeal(diaries[i], meal)
      }
    }
  })
}

const getCheckedFoods = () => {
  let checkboxes = $('input[type=checkbox]')
  let checkedFoods = []
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      checkedFoods.push(checkboxes[i].dataset.checkboxId)
    }
  }
  return checkedFoods
}

export const prependFoodDiary = (food) => {
  $('.diaries').prepend(`
    <article class='diary' data-food-id=${food.id}>
        <p class='name'> ${food.name} </p>
        <p class='calories' >${food.calories} </p>
        <p class='check-box' checked><input data-checkBox-id=${food.id} type="checkbox"></p>
    </article>`)
}

export const getMealId = (meal) => {
  if (meal.toLowerCase() === "breakfast") {
    return "1";
  }
  else if (meal.toLowerCase() === "snack") {
    return "2";
  }
  else if (meal.toLowerCase() === "lunch") {
    return "3";
  }
  else if (meal.toLowerCase() === "dinner") {
    return "4";
  }
}

export const getCalorieSum = (meal) => {
  let total = 0
  let sum = meal.foods.forEach(function (food) {
    total += food.calories
  })
  return total
}

export const appendToCalories = (meal) => {
  let total = getCalorieSum(meal)
  $(`.${meal.name.toLowerCase()}-calorie-sum`).append(total);
}

export const goal = (meal) => {

  if (meal.name.toLowerCase() === "breakfast") {
    return 400;
  }
  else if (meal.name.toLowerCase() === "lunch") {
    return 600;
  }
  else if (meal.name.toLowerCase() === "dinner") {
    return 800;
  }
  else if (meal.name.toLowerCase() === "snack") {
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

export const appendToRemainingCalories = (meal) => {
  let remaining = getCalorieRemaining(meal)
  $(`.${meal.name.toLowerCase()}-calorie-remaining`).append(remaining);
  styleRemainingCalories(meal, remaining);
}

export const styleRemainingCalories = (meal, remaining) => {
  if (remaining >= 0) {
    if ($(`.${meal.name.toLowerCase()}-calorie-remaining`).hasClass('negative-remaining')) {
      $(`.${meal.name.toLowerCase()}-calorie-remaining`).removeClass('negative-remaining')
    }
    $(`.${meal.name.toLowerCase()}-calorie-remaining`).addClass("positive-remaining")
  }
  else {
    $(`.${meal.name.toLowerCase()}-calorie-remaining`).addClass("negative-remaining")
  }
}

export const prependMeal = (meal) => {
  (meal.foods).forEach(function (food) {
    prependToMeal(food, meal);
  })
  appendToCalories(meal);
  appendToRemainingCalories(meal);
}

const addToNameCal = (food) => {
  return `<p class='name'> ${food.name} </p>
    <p class='calories' >${food.calories} </p>`
}

export const prependToMeal = (food, meal) => {
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
    `<p class='delete'><button data-${mealType}-food-id=${food.id} class='delete-meal-btn'><i class="fa fa-trash"></i></button></p>
    </article>`
  )
}
