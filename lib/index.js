// Foods
const foodEventHandler = require('./foods/eventHandler')
const foodRequests = require('./foods/requests')
const foodFilter = require('./foods/filter')

$(document).ready(() => {
  foodRequests.getFoods();
  $('.foods').on('click', '.delete-food-btn', foodEventHandler.deleteFood);
  $('.foods').on('blur', '.food', foodEventHandler.editFood);
  $('#submit').on('click', foodEventHandler.addNewFood);
  $('#foodFilter').on('keyup', foodFilter.filterFoods);
});

// Meals

const mealRequests = require('./meals/requests')
const updateDiary = require('./meals/updateDiary')
const mealFilter = require('./meals/filter')
const addMeal = require('./meals/addMeal')
const sortFoods = require('./meals/sortFoods')

$(document).ready(() => {
  mealRequests.getMeals();
  $('.new-food-btn').on('click', updateDiary.redirectNewFood)
  $('#diaryFilter').on('keyup', mealFilter.filterDiary);
  $('.add-meal-btn').on('click', addMeal.getCheckBoxIds);
  $('.all-meals').on('click', '.delete-meal-btn', mealRequests.deleteMeal);
  $('#calorie-sort').on('click', sortFoods.sortFoods)
});