let switchCount = 0
export const sortFoods = () => {
  const table = document.getElementsByClassName('all-foods')[0]
  const unsorted = table.getElementsByClassName('diary')
  if (switchCount === 0) {
    switchCount++
    console.log('first')
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

const sortByAsc = (unsorted) => {
  
}
// let table, foods, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
// table = document.getElementsByClassName('all-foods')[0]
// switching = true
// dir = 'asc'
// while (switching) {
//   switching = false
//   foods = table.getElementsByClassName('diary')
//   for (i = 1; i < (foods.length); i++) {
//     shouldSwitch = false
//     x = foods[i]
//   }
// }