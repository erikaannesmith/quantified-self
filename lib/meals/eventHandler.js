const addMeal = require('./addMeal')
const requests = require('./requests')
const totalsTable = require('./totalsTable')

export const sortById = (unsorted) => {
  let unsortedArray = [...unsorted]
  const sorted = unsortedArray.sort((firstArticle, secondArticle) => {
    return firstArticle.id - secondArticle.id
  })
  return sorted
}

export const addFoodToMeal = (food, meal) => {
  const foodObject = {
    name: food.getElementsByTagName('p')[0].innerText,
    calories: parseInt(food.getElementsByTagName('p')[1].innerText),
    id: food.dataset.foodId
  }
  const data = { name: foodObject.name, calories: foodObject.calories }
  const mealId = addMeal.getMealId(meal);
  requests.addFoodToMealRequest(foodObject, data, mealId, food, meal)
}

export function deleteMeal(event) {
  const food = event.currentTarget.parentElement.parentElement;
  const mealName = food.className.toLowerCase()
  const mealId = addMeal.getMealId(mealName)
  const foodId = food.getAttribute(`data-${mealName}-food-id`)
  requests.deleteMealRequest(food, mealName, mealId, foodId)
}

export const getAllFoodsDiary = (foods) => {
  return foods.forEach((food) => {
    addMeal.prependFoodDiary(food)
  })
}

export const getAllMeals = (meals) => {
  requests.getFoodsDiary();
  getTotalsTable(meals);
  return meals.forEach((meal) => {
    addMeal.prependMeal(meal);
  })
}

export const getTotalsTable = (meals) => {
  totalsTable.appendToTotalCaloriesConsumed(meals);
  totalsTable.appendToTotalGoalCalories(meals);
  totalsTable.appendToTotalCaloriesRemaining(meals);
}