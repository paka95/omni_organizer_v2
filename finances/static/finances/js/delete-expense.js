import { buildList } from "./build-list.js";

export function deleteExpense (deleteButtons) {
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', (e) => {
            e.preventDefault();
            const id = deleteButtons[i].closest('.content-row').getAttribute('id');
            const expenseId = id.match(/\d+/)[0];

            fetch(`delete/${expenseId}/`, {
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