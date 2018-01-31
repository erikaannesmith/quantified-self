const addMeal = require('./addMeal')

const getTotalGoalCalories = (meals) => {
  let totalGoal = 0;
  meals.forEach(function (meal) {
    return totalGoal += addMeal.goal(meal)
  })
  return totalGoal
}

export const appendToTotalGoalCalories = (meals) => {
  let totalGoal = getTotalGoalCalories(meals)
  $(`.total-goal-calorie-number`).append(totalGoal);
}

const getTotalCaloriesConsumed = (meals) => {
  let total = 0
  meals.forEach(function (meal) {
    total += addMeal.getCalorieSum(meal);
  })
  return total;
}

export const appendToTotalCaloriesConsumed = (meals) => {
  let total = getTotalCaloriesConsumed(meals)
  $(`.total-consumed-calories-number`).append(total);
}

const getTotalRemainingCalories = (meals) => {
  return getTotalGoalCalories(meals) - getTotalCaloriesConsumed(meals)
}

export const appendToTotalCaloriesRemaining = (meals) => {
  let totalRemaining = getTotalRemainingCalories(meals);
  $(`.total-remaining-calories-number`).append(totalRemaining);
  styleTotalRemainingCalories(totalRemaining)
}

const styleTotalRemainingCalories = (totalRemaining) => {
  if (totalRemaining >= 0) {
    if ($(`.total-remaining-calories-number`).hasClass('negative-remaining')) {
      $(`.total-remaining-calories-number`).removeClass('negative-remaining')
    }
    $(`.total-remaining-calories-number`).addClass("positive-remaining")
  }
  else {
    $(`.total-remaining-calories-number`).addClass("negative-remaining")
  }
}