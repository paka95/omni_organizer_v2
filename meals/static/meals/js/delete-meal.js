import { buildList } from "./build-list.js";

export function deleteMeal (deleteButtons) {
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', (e) => {
            e.preventDefault();
            const id = deleteButtons[i].closest('.meal-row').getAttribute('id');
            const mealId = id.match(/\d+/)[0];

            fetch(`delete/${mealId}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': document.getElementsByName('csrfmiddlewaretoken')[0].value,
                },
            })
            .then(() => {
                buildList();
            })
            .catch(error => console.error(error));
        })
    }
}