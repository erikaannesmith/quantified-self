/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCheckBoxIds = getCheckBoxIds;
var requests = __webpack_require__(3);
var eventHandler = __webpack_require__(1);

function getCheckBoxIds() {
  event.preventDefault();
  var diaries = document.getElementsByClassName('diary');
  var meal = event.currentTarget.id;
  var checkedFoods = getCheckedFoods();
  checkedFoods.forEach(function (id) {
    for (var i = 0; i < diaries.length; i++) {
      if (diaries[i].dataset.foodId === id) {
        eventHandler.addFoodToMeal(diaries[i], meal);
      }
    }
  });
}

var getCheckedFoods = function getCheckedFoods() {
  var checkboxes = $('input[type=checkbox]');
  var checkedFoods = [];
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      checkedFoods.push(checkboxes[i].dataset.checkboxId);
    }
  }
  return checkedFoods;
};

var prependFoodDiary = exports.prependFoodDiary = function prependFoodDiary(food) {
  $('.diaries').prepend('\n    <article class=\'diary\' data-food-id=' + food.id + '>\n        <p class=\'name\'> ' + food.name + ' </p>\n        <p class=\'calories\' >' + food.calories + ' </p>\n        <p class=\'check-box\' checked><input data-checkBox-id=' + food.id + ' type="checkbox"></p>\n    </article>');
};

var getMealId = exports.getMealId = function getMealId(meal) {
  if (meal.toLowerCase() === "breakfast") {
    return "1";
  } else if (meal.toLowerCase() === "snack") {
    return "2";
  } else if (meal.toLowerCase() === "lunch") {
    return "3";
  } else if (meal.toLowerCase() === "dinner") {
    return "4";
  }
};

var getCalorieSum = exports.getCalorieSum = function getCalorieSum(meal) {
  var total = 0;
  var sum = meal.foods.forEach(function (food) {
    total += food.calories;
  });
  return total;
};

var appendToCalories = exports.appendToCalories = function appendToCalories(meal) {
  var total = getCalorieSum(meal);
  $('.' + meal.name.toLowerCase() + '-calorie-sum').append(total);
};

var goal = exports.goal = function goal(meal) {

  if (meal.name.toLowerCase() === "breakfast") {
    return 400;
  } else if (meal.name.toLowerCase() === "lunch") {
    return 600;
  } else if (meal.name.toLowerCase() === "dinner") {
    return 800;
  } else if (meal.name.toLowerCase() === "snack") {
    return 200;
  }
};

var getCalorieRemaining = function getCalorieRemaining(meal) {
  var total = 0;
  var sum = meal.foods.forEach(function (food) {
    total += food.calories;
  });
  var remaining = goal(meal) - total;
  return remaining;
};

var appendToRemainingCalories = exports.appendToRemainingCalories = function appendToRemainingCalories(meal) {
  var remaining = getCalorieRemaining(meal);
  $('.' + meal.name.toLowerCase() + '-calorie-remaining').append(remaining);
  styleRemainingCalories(meal, remaining);
};

var styleRemainingCalories = exports.styleRemainingCalories = function styleRemainingCalories(meal, remaining) {
  if (remaining >= 0) {
    if ($('.' + meal.name.toLowerCase() + '-calorie-remaining').hasClass('negative-remaining')) {
      $('.' + meal.name.toLowerCase() + '-calorie-remaining').removeClass('negative-remaining');
    }
    $('.' + meal.name.toLowerCase() + '-calorie-remaining').addClass("positive-remaining");
  } else {
    $('.' + meal.name.toLowerCase() + '-calorie-remaining').addClass("negative-remaining");
  }
};

var prependMeal = exports.prependMeal = function prependMeal(meal) {
  meal.foods.forEach(function (food) {
    prependToMeal(food, meal);
  });
  appendToCalories(meal);
  appendToRemainingCalories(meal);
};

var addToNameCal = function addToNameCal(food) {
  return '<p class=\'name\'> ' + food.name + ' </p>\n    <p class=\'calories\' >' + food.calories + ' </p>';
};

var prependToMeal = exports.prependToMeal = function prependToMeal(food, meal) {
  var pluralMeal = void 0;
  var mealType = meal.name.toLowerCase();
  if (mealType === "lunch") {
    pluralMeal = mealType + 'es';
  } else {
    pluralMeal = mealType + 's';
  }
  $('.' + pluralMeal).prepend('\n    <article class=\'' + mealType + '\' data-' + mealType + '-food-id=' + food.id + '>' + addToNameCal(food) + ('<p class=\'delete\'><button data-' + mealType + '-food-id=' + food.id + ' class=\'delete-meal-btn\'><i class="fa fa-trash"></i></button></p>\n    </article>'));
};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteMeal = deleteMeal;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var addMeal = __webpack_require__(0);
var requests = __webpack_require__(3);
var totalsTable = __webpack_require__(6);

var sortById = exports.sortById = function sortById(unsorted) {
  var unsortedArray = [].concat(_toConsumableArray(unsorted));
  var sorted = unsortedArray.sort(function (firstArticle, secondArticle) {
    return firstArticle.id - secondArticle.id;
  });
  return sorted;
};

var addFoodToMeal = exports.addFoodToMeal = function addFoodToMeal(food, meal) {
  var foodObject = {
    name: food.getElementsByTagName('p')[0].innerText,
    calories: parseInt(food.getElementsByTagName('p')[1].innerText),
    id: food.dataset.foodId
  };
  var data = { name: foodObject.name, calories: foodObject.calories };
  var mealId = addMeal.getMealId(meal);
  requests.addFoodToMealRequest(foodObject, data, mealId, food, meal);
};

function deleteMeal(event) {
  var food = event.currentTarget.parentElement.parentElement;
  var mealName = food.className.toLowerCase();
  var mealId = addMeal.getMealId(mealName);
  var foodId = food.getAttribute('data-' + mealName + '-food-id');
  requests.deleteMealRequest(food, mealName, mealId, foodId);
}

var getAllFoodsDiary = exports.getAllFoodsDiary = function getAllFoodsDiary(foods) {
  return foods.forEach(function (food) {
    addMeal.prependFoodDiary(food);
  });
};

var getAllMeals = exports.getAllMeals = function getAllMeals(meals) {
  requests.getFoodsDiary();
  getTotalsTable(meals);
  return meals.forEach(function (meal) {
    addMeal.prependMeal(meal);
  });
};

var getTotalsTable = exports.getTotalsTable = function getTotalsTable(meals) {
  totalsTable.appendToTotalCaloriesConsumed(meals);
  totalsTable.appendToTotalGoalCalories(meals);
  totalsTable.appendToTotalCaloriesRemaining(meals);
};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editFoodRequest = editFoodRequest;
var handleResponse = __webpack_require__(5);
var addFood = __webpack_require__(14);
var APIhost = 'https://pacific-lowlands-10552.herokuapp.com';
var deleteMeal = __webpack_require__(15);

var addNewFoodRequest = exports.addNewFoodRequest = function addNewFoodRequest(data) {
  return fetch(APIhost + '/api/v1/foods', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(function (response) {
    return response.json();
  }).then(function (newFood) {
    return addFood.prependFood(newFood);
  }).then($(".new-food")[0].reset()).catch(function (error) {
    return console.log({ error: error });
  });
};

var getFoods = exports.getFoods = function getFoods() {
  return fetch(APIhost + '/api/v1/foods').then(function (response) {
    return handleResponse.handleResponse(response);
  }).then(function (foods) {
    return addFood.sortById(foods);
  }).then(function (sortedFoods) {
    return addFood.getAllFoods(sortedFoods);
  }).catch(function (error) {
    return console.log({ error: error });
  });
};

var deleteFoodonMealRequest = exports.deleteFoodonMealRequest = function deleteFoodonMealRequest(foodId) {
  return fetch(APIhost + '/api/v1/meals').then(function (response) {
    return handleResponse.handleResponse(response);
  }).then(function (meals) {
    return deleteMeal.findFoodonMeals(meals, foodId);
  }).then(deleteFoodRequest(foodId)).catch(function (error) {
    return console.log({ error: error });
  });
};

var deleteFoodRequest = exports.deleteFoodRequest = function deleteFoodRequest(foodId) {

  return fetch(APIhost + '/api/v1/foods' + '/' + foodId.toString(), {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  }).then(removeFood(foodId)).catch(function (error) {
    return console.log({ error: error });
  });
};

var removeFood = function removeFood(foodId) {
  document.querySelector('[data-food-id= "' + foodId + '"]').remove();
};

function editFoodRequest(foodId, html, updatedName, updatedCalories) {

  return fetch(APIhost + '/api/v1/foods' + '/' + foodId, {

    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: updatedName, calories: updatedCalories })
  }).catch(function (error) {
    return console.log({ error: error });
  });
}

var deleteFoodFromMealRequest = exports.deleteFoodFromMealRequest = function deleteFoodFromMealRequest(mealId, foodId) {
  return fetch(APIhost + '/api/v1/meals/' + mealId + '/foods/' + foodId, {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' }
  }).catch(function (error) {
    return console.log({ error: error });
  });
};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteMealRequest = deleteMealRequest;
var handleResponse = __webpack_require__(5);
var addMeal = __webpack_require__(0);
var updateDiary = __webpack_require__(4);
var APIhost = 'https://pacific-lowlands-10552.herokuapp.com';
var eventHandler = __webpack_require__(1);

var getMeals = exports.getMeals = function getMeals() {
  return fetch(APIhost + '/api/v1/meals').then(function (response) {
    return handleResponse.handleResponse(response);
  }).then(function (meals) {
    return eventHandler.getAllMeals(meals);
  }).catch(function (error) {
    return console.log({ error: error });
  });
};

var getFoodsDiary = exports.getFoodsDiary = function getFoodsDiary() {
  return fetch(APIhost + '/api/v1/foods').then(function (response) {
    return handleResponse.handleResponse(response);
  }).then(function (foods) {
    return eventHandler.sortById(foods);
  }).then(function (sortedFoods) {
    return eventHandler.getAllFoodsDiary(sortedFoods);
  }).catch(function (error) {
    return console.log({ error: error });
  });
};

var addFoodToMealRequest = exports.addFoodToMealRequest = function addFoodToMealRequest(foodObject, data, mealId, food, meal) {
  return fetch(APIhost + '/api/v1/meals/' + mealId + '/foods/' + foodObject.id, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(function (response) {
    return response.json();
  }).then(addMeal.prependToMeal(foodObject, { name: meal })).then(updateDiary.updateTotalsPostCreate(foodObject, meal)).then(updateDiary.uncheckBoxes()).catch(function (error) {
    return console.log({ error: error });
  });
};

function deleteMealRequest(food, mealName, mealId, foodId) {
  return fetch(APIhost + '/api/v1/meals/' + mealId + '/foods/' + foodId, {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' }
  }).then(food.remove()).then(updateDiary.updateTotalsPostDelete(food, mealName)).catch(function (error) {
    return console.log({ error: error });
  });
}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var addMeal = __webpack_require__(0);
var totalsTable = __webpack_require__(6);

var updateRemainingCalories = function updateRemainingCalories(food, meal) {
  var currentRemaining = parseInt($('.' + meal + '-calorie-remaining')[0].innerText);
  $('.' + meal + '-calorie-remaining').empty();
  var newRemainingCal = postDeleteRemainingCalories(food, meal, currentRemaining);
  $('.' + meal + '-calorie-remaining').append(newRemainingCal);
  addMeal.styleRemainingCalories({ name: meal }, newRemainingCal);
};

var postDeleteRemainingCalories = function postDeleteRemainingCalories(food, meal, currentRemaining) {
  var calories = parseInt(food.getElementsByTagName('p')[1].innerText);
  return currentRemaining + calories;
};

var updateTotalCalories = function updateTotalCalories(food, meal) {
  var currentTotal = parseInt($('.' + meal + '-calorie-sum')[0].innerText);
  $('.' + meal + '-calorie-sum').empty();
  var newTotalCal = postDeleteTotalCalories(food, meal, currentTotal);
  $('.' + meal + '-calorie-sum').append(newTotalCal);
};

var postDeleteTotalCalories = function postDeleteTotalCalories(food, meal, currentTotal) {
  var calories = parseInt(food.getElementsByTagName('p')[1].innerText);
  return currentTotal - calories;
};

var updateTotalsTable = function updateTotalsTable(food, meal) {
  updateTotalsTableConsumed(food, meal);
  updateTotalsTableRemaining(food, meal);
};

var updateTotalsTableConsumed = function updateTotalsTableConsumed(food, meal) {
  var currentTotalConsumed = parseInt($('.total-consumed-calories-number')[0].innerText);
  $('.total-consumed-calories-number').empty();
  var newTotalConsumed = postDeleteTotalConsumed(food, meal, currentTotalConsumed);
  $('.total-consumed-calories-number').append(newTotalConsumed);
};

var postDeleteTotalConsumed = function postDeleteTotalConsumed(food, meal, currentTotalConsumed) {
  var calories = parseInt(food.getElementsByTagName('p')[1].innerText);
  return currentTotalConsumed - calories;
};

var updateTotalsTableRemaining = function updateTotalsTableRemaining(food, meal) {
  var currentTotalRemaining = parseInt($('.total-remaining-calories-number')[0].innerText);
  $('.total-remaining-calories-number').empty();
  var newTotalRemaining = postDeleteTotalRemaining(food, meal, currentTotalRemaining);
  $('.total-remaining-calories-number').append(newTotalRemaining);
  totalsTable.styleTotalRemainingCalories(newTotalRemaining);
};

var postDeleteTotalRemaining = function postDeleteTotalRemaining(food, meal, currentTotalRemaining) {
  var calories = parseInt(food.getElementsByTagName('p')[1].innerText);
  return currentTotalRemaining + calories;
};

var redirectNewFood = exports.redirectNewFood = function redirectNewFood() {
  document.location.href = 'http://localhost:8080/foods.html';
};

var updateRemainingCaloriesPostCreate = function updateRemainingCaloriesPostCreate(food, meal) {
  var currentRemaining = parseInt($('.' + meal.toLowerCase() + '-calorie-remaining')[0].innerText);
  $('.' + meal.toLowerCase() + '-calorie-remaining').empty();
  var newRemainingCal = currentRemaining - food.calories;
  $('.' + meal.toLowerCase() + '-calorie-remaining').append(newRemainingCal);
  addMeal.styleRemainingCalories({ name: meal.toLowerCase() }, newRemainingCal);
};

var updateTotalCaloriesPostCreate = function updateTotalCaloriesPostCreate(food, meal) {
  var currentTotal = parseInt($('.' + meal.toLowerCase() + '-calorie-sum')[0].innerText);
  $('.' + meal.toLowerCase() + '-calorie-sum').empty();
  var newTotalCal = currentTotal + food.calories;
  $('.' + meal.toLowerCase() + '-calorie-sum').append(newTotalCal);
};

var updateTotalsTablePostCreate = function updateTotalsTablePostCreate(food, meal) {
  updateTotalsTableConsumedPostCreate(food, meal);
  updateTotalsTableRemainingPostCreate(food, meal);
};

var updateTotalsTableConsumedPostCreate = function updateTotalsTableConsumedPostCreate(food, meal) {
  var currentTotalConsumed = parseInt($('.total-consumed-calories-number')[0].innerText);
  $('.total-consumed-calories-number').empty();
  var newTotalConsumed = food.calories + currentTotalConsumed;
  $('.total-consumed-calories-number').append(newTotalConsumed);
};

var updateTotalsTableRemainingPostCreate = function updateTotalsTableRemainingPostCreate(food, meal) {
  var currentTotalRemaining = parseInt($('.total-remaining-calories-number')[0].innerText);
  $('.total-remaining-calories-number').empty();
  var newTotalRemaining = currentTotalRemaining - food.calories;
  $('.total-remaining-calories-number').append(newTotalRemaining);
  totalsTable.styleTotalRemainingCalories(newTotalRemaining);
};

var uncheckBoxes = exports.uncheckBoxes = function uncheckBoxes() {
  $('input:checkbox:checked').prop('checked', false);
};

var updateTotalsPostCreate = exports.updateTotalsPostCreate = function updateTotalsPostCreate(food, meal) {
  updateRemainingCaloriesPostCreate(food, meal);
  updateTotalCaloriesPostCreate(food, meal);
  updateTotalsTablePostCreate(food, meal);
};

var updateTotalsPostDelete = exports.updateTotalsPostDelete = function updateTotalsPostDelete(food, meal) {
  updateRemainingCalories(food, meal);
  updateTotalCalories(food, meal);
  updateTotalsTable(food, meal);
};

/***/ },
/* 5 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var handleResponse = exports.handleResponse = function handleResponse(response) {
  return response.json().then(function (json) {
    if (!response.ok) {
      var error = {
        status: response.status,
        statusText: response.statusText,
        json: json
      };
      return Promise.reject(error);
    }
    return json;
  });
};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var addMeal = __webpack_require__(0);

var getTotalGoalCalories = function getTotalGoalCalories(meals) {

  var totalGoal = 0;
  meals.forEach(function (meal) {
    return totalGoal += addMeal.goal(meal);
  });
  return totalGoal;
};

var appendToTotalGoalCalories = exports.appendToTotalGoalCalories = function appendToTotalGoalCalories(meals) {
  var totalGoal = getTotalGoalCalories(meals);
  $('.total-goal-calorie-number').append(totalGoal);
};

var getTotalCaloriesConsumed = function getTotalCaloriesConsumed(meals) {
  var total = 0;
  meals.forEach(function (meal) {
    total += addMeal.getCalorieSum(meal);
  });
  return total;
};

var appendToTotalCaloriesConsumed = exports.appendToTotalCaloriesConsumed = function appendToTotalCaloriesConsumed(meals) {
  var total = getTotalCaloriesConsumed(meals);
  $('.total-consumed-calories-number').append(total);
};

var getTotalRemainingCalories = function getTotalRemainingCalories(meals) {
  return getTotalGoalCalories(meals) - getTotalCaloriesConsumed(meals);
};

var appendToTotalCaloriesRemaining = exports.appendToTotalCaloriesRemaining = function appendToTotalCaloriesRemaining(meals) {
  var totalRemaining = getTotalRemainingCalories(meals);
  $('.total-remaining-calories-number').append(totalRemaining);
  styleTotalRemainingCalories(totalRemaining);
};

var styleTotalRemainingCalories = exports.styleTotalRemainingCalories = function styleTotalRemainingCalories(totalRemaining) {
  if (totalRemaining >= 0) {
    if ($('.total-remaining-calories-number').hasClass('negative-remaining')) {
      $('.total-remaining-calories-number').removeClass('negative-remaining');
    }
    $('.total-remaining-calories-number').addClass("positive-remaining");
  } else {
    $('.total-remaining-calories-number').addClass("negative-remaining");
  }
};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editFood = editFood;
var requests = __webpack_require__(2);

var addNewFood = exports.addNewFood = function addNewFood() {
  event.preventDefault();
  $('#new-name-error').hide();
  $('#new-calories-error').hide();
  if ($('#new-name').val() === "") {
    $('#new-name-error').css('display', 'block');
    if ($('#new-calories').val() === "") {
      $('#new-calories-error').css('display', 'block');
    }
  } else if ($('#new-calories').val() === "") {
    $('#new-calories-error').css('display', 'block');
  } else {
    var data = { name: $('#new-name').val(), calories: $('#new-calories').val() };
    requests.addNewFoodRequest(data);
  }
};

var deleteFood = exports.deleteFood = function deleteFood(event) {
  event.preventDefault();
  var foodId = $('.delete-food-btn').data('food-id').toString();
  requests.deleteFoodonMealRequest(foodId);
};

function editFood() {
  var foodId = $(this).data('food-id').toString();
  var html = $(this).html();
  var updatedName = this.getElementsByClassName('name')[0].innerText;
  var updatedCalories = parseInt(this.getElementsByClassName('calories')[0].innerText);

  requests.editFoodRequest(foodId, html, updatedName, updatedCalories);
}
var redirectFoodDiary = exports.redirectFoodDiary = function redirectFoodDiary() {
  event.preventDefault();
  document.location.href = 'http://localhost:8080/';
};

/***/ },
/* 8 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterFoods = filterFoods;
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

/***/ },
/* 9 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterDiary = filterDiary;
function filterDiary() {
  var input, filter, diaries, diary, name, i;
  input = document.getElementById('diaryFilter');
  filter = input.value.toUpperCase();
  diaries = document.getElementsByClassName("diaries");
  diary = document.getElementsByClassName('diary');

  for (i = 0; i < diary.length; i++) {
    name = diary[i].getElementsByClassName("name")[0];
    if (name.innerHTML.toUpperCase().indexOf(filter) > -1) {
      diary[i].style.display = "";
    } else {
      diary[i].style.display = "none";
    }
  }
}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var eventHandler = __webpack_require__(1);

var switchCount = 0;

var sortFoods = exports.sortFoods = function sortFoods() {
  var table = document.getElementsByClassName('all-foods')[0];
  var unsorted = table.getElementsByClassName('diary');
  var sortedList;
  var sorted = [];
  if (switchCount === 0) {
    switchCount++;
    var sortedList = sortByDesc(unsorted);
    sortedList.forEach(function (food) {
      sorted.push(makeFoodObject(food));
    });
  } else if (switchCount === 1) {
    switchCount++;
    var sortedList = sortByDesc(unsorted);
    sortedList.forEach(function (food) {
      sorted.push(makeFoodObject(food));
    });
    sorted.reverse();
  } else if (switchCount === 2) {
    switchCount = 0;
    var sortedList = sortById(unsorted);
    sortedList.forEach(function (food) {
      sorted.push(makeFoodObject(food));
    });
  }
  $('.diaries').empty();
  eventHandler.getAllFoodsDiary(sorted);
};

var calorieCount = function calorieCount(article) {
  return parseInt(article.getElementsByTagName('p')[1].innerText);
};

var sortByDesc = function sortByDesc(unsorted) {
  var unsortedArray = [].concat(_toConsumableArray(unsorted));
  var sorted = unsortedArray.sort(function (firstArticle, secondArticle) {
    return calorieCount(firstArticle) - calorieCount(secondArticle);
  });
  return sorted;
};

var sortById = exports.sortById = function sortById(unsorted) {
  var unsortedArray = [].concat(_toConsumableArray(unsorted));
  var sorted = unsortedArray.sort(function (firstArticle, secondArticle) {
    return id(firstArticle) - id(secondArticle);
  });
  return sorted;
};

var id = function id(article) {
  return article.dataset.foodId;
};

var makeFoodObject = function makeFoodObject(food) {
  return { name: food.getElementsByTagName('p')[0].innerText,
    calories: parseInt(food.getElementsByTagName('p')[1].innerText),
    id: food.dataset.foodId };
};

/***/ },
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var getAllFoods = exports.getAllFoods = function getAllFoods(foods) {
  return foods.forEach(function (food) {
    prependFood(food);
  });
};

var prependFood = exports.prependFood = function prependFood(food) {
  $('.foods').prepend('\n    <article class=\'food\' data-food-id=' + food.id + '>\n      <div contenteditable="true">\n        <p class=\'name\'> ' + food.name + ' </p>\n      </div>\n      <div contenteditable="true">\n        <p class=\'calories\' >' + food.calories + ' </p>\n      </div>\n        <p class=\'delete\'><button data-food-id=' + food.id + ' class=\'delete-food-btn\'><i class="fa fa-trash"></i></button></p>\n    </article>');
};

var sortById = exports.sortById = function sortById(unsorted) {
  var unsortedArray = [].concat(_toConsumableArray(unsorted));
  var sorted = unsortedArray.sort(function (firstArticle, secondArticle) {
    return firstArticle.id - secondArticle.id;
  });
  return sorted;
};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var addMeal = __webpack_require__(0);
var requests = __webpack_require__(2);
var APIhost = 'https://evening-peak-25213.herokuapp.com';

var findFoodonMeals = exports.findFoodonMeals = function findFoodonMeals(meals, foodId) {
  meals.forEach(function (meal) {
    var mealName = meal.name.toLowerCase();
    meal.foods.forEach(function (food) {
      var mealFoodId = food.id.toString();
      if (mealFoodId === foodId) {
        var mealId = meal.id.toString();
        requests.deleteFoodFromMealRequest(mealId, mealFoodId);
      }
    });
  });
};

/***/ },
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

// Foods
var foodEventHandler = __webpack_require__(7);
var foodRequests = __webpack_require__(2);
var foodFilter = __webpack_require__(8);

$(document).ready(function () {
  foodRequests.getFoods();
  $('.foods').on('click', '.delete-food-btn', foodEventHandler.deleteFood);
  $('.foods').on('blur', '.food', foodEventHandler.editFood);
  $('#submit').on('click', foodEventHandler.addNewFood);
  $('#foodFilter').on('keyup', foodFilter.filterFoods);
  $('.diary-btn').on('click', foodEventHandler.redirectFoodDiary);
});

// Meals

var mealRequests = __webpack_require__(3);
var updateDiary = __webpack_require__(4);
var mealFilter = __webpack_require__(9);
var addMeal = __webpack_require__(0);
var sortFoods = __webpack_require__(10);
var mealEventHandler = __webpack_require__(1);

$(document).ready(function () {
  mealRequests.getMeals();
  $('.new-food-btn').on('click', updateDiary.redirectNewFood);
  $('#diaryFilter').on('keyup', mealFilter.filterDiary);
  $('.add-meal-btn').on('click', addMeal.getCheckBoxIds);
  $('.all-meals').on('click', '.delete-meal-btn', mealEventHandler.deleteMeal);
  $('#calorie-sort').on('click', sortFoods.sortFoods);
});

/***/ }
/******/ ]);