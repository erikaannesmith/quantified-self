export function filterFoods() {
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

