const addMeal = require('../meals/addMeal')
const mealRequest = require('../meals/requests')

export const findFoodonMeals= (meals, foodId) => {
  let currentMeals = meals;
  currentMeals.forEach(function (meal) {

    let mealName = meal.name.toLowerCase();
    let mealFoods= meal.foods;
    mealFoods.forEach(function (mealfood){
      let mealFoodId = food.id.toString();
      let food = mealfood;
      if (mealFoodId === foodId) {
        console.log(mealFoodId);
        console.log(food);
        let foodId = mealFood.id;
        let mealId = addMeal.getMealId(mealName);
        mealRequest.deleteMealRequest(food, mealName, mealId, foodId);
      }
      //not sure what to return here 
      // else {
      // return foodId;
      // }
    })
  })
}
