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
  requests.deleteFoodRequest(foodId)
}