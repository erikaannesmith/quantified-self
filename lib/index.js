const getFoods = () => {
return fetch(`http://localhost:3000/api/v1/foods`)
  .then(response => handleResponse(response))
  .then(foods => getAllFoods(foods))
  .catch(error => console.log({error}));
}
const handleResponse = (response) => {
  return response.json()
  .then(json => {
    if(!response.ok){
      const error = {
        status: response.status,
        statusText: response.statusText,
        json,
      };
      return Promise.reject(error);
    }
  return json;
  })
}
const getAllFoods = (foods) => {

  return foods.forEach((food) => {
  console.log(food)
     $('.foods').append(`
      <td class="food-name"> ${food.name} </td>
        <td class="calories-food"> ${food.calories}</td>
        <td class="delete_button"> <button data-food-id="${food.id}" class="delete_button" aria-label="Delete">Delete </button></td>`)
    }
  )}

$(document).ready(() => {
  getFoods();
});
