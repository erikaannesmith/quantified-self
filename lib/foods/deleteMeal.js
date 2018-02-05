const addMeal = require('../meals/addMeal')
const mealRequest = require('../meals/requests')

export const findFoodonMeals= (meals, foodId) => {
  let currentMeals = meals;
  currentMeals.forEach(function (meal) {
    let mealName = meal.name.toLowerCase();
    let mealFoods= meal.foods;
    mealFoods.forEach(function (food){
      let mealFoodId = food.id.toString()
      if (mealFoodId === foodId) {
        let food = food;
        let foodId = food.id;
        let mealId = addMeal.getMealId(mealName);
        mealRequest.deleteMealRequest(food, mealName, mealId, foodId);
      }
    })
  })
}
