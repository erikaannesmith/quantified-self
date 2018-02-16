const requests = require('./requests')

export const addNewFood = () => {
  event.preventDefault()
  $('#new-name-error').hide()
  $('#new-calories-error').hide()
  if ($('#new-name').val() === "") {
    $('#new-name-error').css('display', 'block')
    if ($('#new-calories').val() === "") {
      $('#new-calories-error').css('display', 'block')
    }
  }
  else if ($('#new-calories').val() === "") {
    $('#new-calories-error').css('display', 'block')
  }
  else {
    var data = { name: $('#new-name').val(), calories: $('#new-calories').val() }
    requests.addNewFoodRequest(data)
  }
};

export const deleteFood = (event) => {
  event.preventDefault();
  var foodId = event.currentTarget.parentElement.parentElement.dataset.foodId;
  // debugger;
  requests.deleteFoodonMealRequest(foodId);
}

export function editFood() {
  var foodId = $(this).data('food-id').toString();
  var html = $(this).html();
  var updatedName = (this.getElementsByClassName('name')[0]).innerText;
  var updatedCalories = parseInt((this.getElementsByClassName('calories')[0]).innerText);

requests.editFoodRequest(foodId, html, updatedName, updatedCalories)
}
export const redirectFoodDiary = () => {
  event.preventDefault();
  document.location.href = 'https://erikaannesmith.github.io/quantified-self/';
}
