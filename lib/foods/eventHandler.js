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
  var foodId = $('.delete-food-btn').data('food-id').toString();
  requests.deleteFoodonMealRequest(foodId);
  requests.deleteFoodRequest(foodId)
}

export function editFood() {
  var foodId = $(this).data('food-id').toString();
  var html = $(this).html();
  var updatedName = (this.getElementsByClassName('name')[0]).innerText;
  var updatedCalories = (this.getElementsByClassName('calories')[0]).innerText;
  requests.editFoodRequest(foodId, html, updatedName, updatedCalories)
}
