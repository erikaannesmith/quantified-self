const addMeal = require('../meals/addMeal')
const requests = require('./requests')
const APIhost = `https://evening-peak-25213.herokuapp.com`


export const findFoodonMeals= (meals, foodId) => {
  meals.forEach(function (meal) {
    let mealName = meal.name.toLowerCase();
    meal.foods.forEach(function (food){
      let mealFoodId = food.id.toString();
      if (mealFoodId === foodId) {
        let mealId = meal.id.toString();
        requests.deleteFoodFromMealRequest(mealId, mealFoodId);
      }
      })
    })
  }
  