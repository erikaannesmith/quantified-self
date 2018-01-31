
function getCheckBoxIds() {
  event.preventDefault();
  let diaries = document.getElementsByClassName('diary')
  let meal = this.innerText;
  let checkedFoods = getCheckedFoods();
  checkedFoods.forEach(function(id) {
    for (var i = 0; i < diaries.length; i++) { 
      if (diaries[i].dataset.foodId === id) { 
        addFoodToMeal(diaries[i], meal) 
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

const getMealId = (meal) => {
  if (meal === "Breakfast") {
    return "1";
  }
  else if (meal === "Snacks") {
    return "2";
  }
  else if (meal === "Lunch") {
    return "3";
  }
  else if (meal === "Dinner") {
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

export const appendToRemainingCalories = (meal) => {
  let remaining = getCalorieRemaining(meal)
  $(`.${meal.name.toLowerCase()}-calorie-remaining`).append(remaining);
  styleRemainingCalories(meal, remaining);
}

const styleRemainingCalories = (meal, remaining) => {
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
    `<p class='delete'><button data-${mealType}-food-id=${food.id} class='delete-meal-btn'><i class="fa fa-trash"></i></button></p>
    </article>`
  )
}