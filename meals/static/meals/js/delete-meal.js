import { buildList } from "./build-list.js";
import { getCookie } from "./get-cookie.js";

const csrftoken = getCookie('csrftoken');

export function deleteMeal (deleteButtons) {
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', (e) => {
            // apply to each element event listener for click
            e.preventDefault();
            // get the closest parent's element's id
            const id = deleteButtons[i].closest('.meal-row').getAttribute('id');
            // get the ID number only of it - it looks like meal-1 
            const mealId = id.match(/\d+/)[0];

            fetch(`delete/${mealId}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
            })
            .then(() => {
                buildList();
            })
            .catch(error => console.error(error));
        })
    }
}