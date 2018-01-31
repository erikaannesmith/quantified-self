
const getAllFoods = (foods) => {
  return foods.forEach((food) => {
    prependFood(food)
  }
  )
}

const prependFood = (food) => {
  $('.foods').prepend(`
    <article class='food' data-food-id=${food.id}>
      <div contenteditable="true">
        <p class='name'> ${food.name} </p>
      </div>
      <div contenteditable="true">
        <p class='calories' >${food.calories} </p>
      </div>
        <p class='delete'><button data-food-id=${food.id} class='delete-food-btn'><i class="fa fa-trash"></i></button></p>
    </article>`)
}