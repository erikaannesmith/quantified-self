const requests = require('./requests')

let switchCount = 0

export const sortFoods = () => {
  const table = document.getElementsByClassName('all-foods')[0]
  const unsorted = table.getElementsByClassName('diary')
  var sortedList;
  var sorted = [];
  if (switchCount === 0) {
    switchCount++
    var sortedList = sortByDesc(unsorted)
    sortedList.forEach((food) => {
      sorted.push(makeFoodObject(food))
    })
  }
  else if (switchCount === 1) {
    switchCount++
    var sortedList = sortByDesc(unsorted)
    sortedList.forEach((food) => {
      sorted.push(makeFoodObject(food))
    })
    sorted.reverse()
  }
  else if (switchCount === 2) {
    switchCount = 0
    var sortedList = sortById(unsorted)
    sortedList.forEach((food) => {
      sorted.push(makeFoodObject(food))
    })
  }
  $('.diaries').empty()
  requests.getAllFoodsDiary(sorted)
}

const calorieCount = (article) => parseInt(article.getElementsByTagName('p')[1].innerText)

const sortByDesc = (unsorted) => {
  let unsortedArray = [...unsorted]
  const sorted = unsortedArray.sort( (firstArticle, secondArticle) => {
    return calorieCount(firstArticle) - calorieCount(secondArticle)
  })
  return sorted
}

export const sortById = (unsorted) => {
  let unsortedArray = [...unsorted]
  const sorted = unsortedArray.sort((firstArticle, secondArticle) => {
    return id(firstArticle) - id(secondArticle)
  })
  return sorted
}

const id = (article) => article.dataset.foodId

const makeFoodObject = (food) => {
  return {name: food.getElementsByTagName('p')[0].innerText,
    calories: parseInt(food.getElementsByTagName('p')[1].innerText),
    id: food.dataset.foodId}
}












