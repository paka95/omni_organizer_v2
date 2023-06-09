// FEATURE WILL BE ADDED LATER
// import { buildList } from "./build-list.js";

// export function editMeal (editButtons) {
//     for (let i = 0; i < editButtons.length; i++) {
//         editButtons[i].addEventListener('click', () => {
//             const id = editButtons[i].closest('.meal-row').getAttribute('id');
//             const mealId = id.match(/\d+/)[0];

//             console.log(mealId);
//             const meal = document.querySelector(`#meal-${mealId}`);
//             const weightField = meal.querySelector('.weight');
//             const weight = meal.querySelector('.weight').textContent;


//             const acceptBtn = meal.querySelector('.fa-solid.fa-pen');
//             const cancelBtn = meal.querySelector('.delete-btn');
//             acceptBtn.classList.remove('fa-pen');
//             acceptBtn.classList.add('fa-check');
//             acceptBtn.classList.add('fa-lg');
//             acceptBtn.id = 'weight-to-update';

//             const fields = meal.querySelectorAll('.meal-nutrients');
//             fields.forEach((element) => {
//                 if (!element.classList.contains('meal-nutrients-flex')){
//                     element.classList.add('editing');
//                 }
                
//             })
//             cancelBtn.style.visibility = 'hidden';

//             const input = document.createElement('input');
//             input.type = 'text';
//             input.value = weight;
//             input.classList.add('meal-weight-edit');
//             input.id = 'meal-weight-edit';

//             weightField.parentNode.replaceChild(input, weightField);
//             input.focus();

//             input.addEventListener('blur', () => {
//                 cancelBtn.style.visibility = 'visible';
//                 fields.forEach((element) => {
//                     element.classList.remove('editing');
//                 })
//                 input.parentNode.replaceChild(weightField, input);
//                 acceptBtn.classList.add('fa-pen');
//                 acceptBtn.classList.remove('fa-check');
//                 acceptBtn.classList.remove('fa-lg');
//                 input.id = '';
//                 acceptBtn.id = '';
//               });

//             const updateBtn = document.getElementById('weight-to-update');
//             updateBtn.addEventListener('click', (e) => {
//                 e.preventDefault();
//                 const updatedWeight = document.getElementById('meal-weight-edit').value;
//                 console.log(updatedWeight);
//                 const patchedMeal = {
//                     'weight': updatedWeight
//                 }
//                 fetch(`update/${mealId}/`, {
//                     method: 'PATCH',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'X-CSRFToken': document.getElementsByName('csrfmiddlewaretoken')[0].value,
//                     },
//                     body: JSON.stringify(patchedMeal)
//                 })
//                 .then(() => {
//                     buildList();
//                 })
//                 .catch(error => console.error(error));
//             })
//         })
//     }
// }