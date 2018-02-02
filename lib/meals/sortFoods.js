let switchCount = 0
export const sortFoods = () => {
  const table = document.getElementsByClassName('all-foods')[0]
  let unsorted = table.getElementsByClassName('diary')
  // debugger;
  if (switchCount === 0) {
    switchCount++
    sortByAsc(unsorted)
  }
  else if (switchCount === 1) {
    switchCount++
    console.log('second')
    // sortByDesc
  }
  else if (switchCount === 2) {
    switchCount = 0
    console.log('third')
    // sortByOriginal
  }
  // debugger;
}

const calorieCount = (article) => parseInt(article.getElementsByTagName('p')[1].innerText)

const sortByAsc = (unsorted) => {
  const unsortedArray = [...unsorted]

  const sorted = unsortedArray.sort( (firstArticle, secondArticle) => {
    return calorieCount(firstArticle) - calorieCount(secondArticle)
  })
  debugger;
  return sorted
}













