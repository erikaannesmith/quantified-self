export const getAllFoods = (foods) => {
  return foods.forEach((food) => {
    prependFood(food)
  })
}

export const prependFood = (food) => {
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

export const sortById = (unsorted) => {
  let unsortedArray = [...unsorted]
  const sorted = unsortedArray.sort((firstArticle, secondArticle) => {
    return firstArticle.id - secondArticle.id
  })
  return sorted
}