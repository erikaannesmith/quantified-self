const addMeal = require('./addMeal')
const totalsTable = require('./totalsTable')

export const removeFromMeal = (foodId, meal) => {
  $(`.${meal}[data-${meal}-food-id=` + foodId + ']').remove()
}

export const updateRemainingCalories = (food, meal) => {
  let currentRemaining = parseInt($(`.${meal}-calorie-remaining`)[0].innerText)
  $(`.${meal}-calorie-remaining`).empty()
  let newRemainingCal = postDeleteRemainingCalories(food, meal, currentRemaining)
  $(`.${meal}-calorie-remaining`).append(postDeleteRemainingCalories(food, meal, currentRemaining))
  addMeal.styleRemainingCalories({ name: meal }, newRemainingCal)
}

const postDeleteRemainingCalories = (food, meal, currentRemaining) => {
  let calories = parseInt(food.getElementsByTagName('p')[1].innerText)
  return (currentRemaining + calories)
}

export const updateTotalCalories = (food, meal) => {
  let currentTotal = parseInt($(`.${meal}-calorie-sum`)[0].innerText)
  $(`.${meal}-calorie-sum`).empty()
  let newTotalCal = postDeleteTotalCalories(food, meal, currentTotal)
  $(`.${meal}-calorie-sum`).append(postDeleteTotalCalories(food, meal, currentTotal))
}

const postDeleteTotalCalories = (food, meal, currentTotal) => {
  let calories = parseInt(food.getElementsByTagName('p')[1].innerText)
  return (currentTotal - calories)
}

export const updateTotalsTable = (food, meal) => {
  updateTotalsTableConsumed(food, meal);
  updateTotalsTableRemaining(food, meal);
}

const updateTotalsTableConsumed = (food, meal) => {
  let currentTotalConsumed = parseInt($('.total-consumed-calories-number')[0].innerText)
  $('.total-consumed-calories-number').empty()
  let newTotalConsumed = postDeleteTotalConsumed(food, meal, currentTotalConsumed)
  $('.total-consumed-calories-number').append(newTotalConsumed)
}

const postDeleteTotalConsumed = (food, meal, currentTotalConsumed) => {
  let calories = parseInt(food.getElementsByTagName('p')[1].innerText)
  return (currentTotalConsumed - calories)
}

const updateTotalsTableRemaining = (food, meal) => {
  let currentTotalRemaining = parseInt($('.total-remaining-calories-number')[0].innerText)
  $('.total-remaining-calories-number').empty()
  let newTotalRemaining = postDeleteTotalRemaining(food, meal, currentTotalRemaining)
  $('.total-remaining-calories-number').append(newTotalRemaining)
  totalsTable.styleTotalRemainingCalories(newTotalRemaining)
}

const postDeleteTotalRemaining = (food, meal, currentTotalRemaining) => {
  let calories = parseInt(food.getElementsByTagName('p')[1].innerText)
  return (currentTotalRemaining + calories)
}

export const redirectNewFood = () => {
  document.location.href = 'http://localhost:8080/foods.html';
}