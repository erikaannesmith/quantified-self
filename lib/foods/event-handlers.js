
module.export = {
  $('.foods').on('click', '.delete-food-btn', deleteFood);
  $('.foods').on('blur', '.food', editFood);
  $('#submit').on('click', addNewFood);
  $('#foodFilter').on('keyup', filterFoods);
}
