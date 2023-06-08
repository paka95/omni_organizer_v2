import { buildList } from "./build-list.js";

export function deleteExpense (deleteButtons) {
    // deleteButtons are all HTML elements with the delete icon
    for (let i = 0; i < deleteButtons.length; i++) {
        // apply event listener to each element
        deleteButtons[i].addEventListener('click', (e) => {
            e.preventDefault();
            // get the id of the closest parent element 
            const id = deleteButtons[i].closest('.content-row').getAttribute('id');

            // get only the number portion of it - the whole id looks like this - "expense-1" - 1 is an example value
            // it looks for one or more consecutive digits in the id string and gets the first element of it
            // since there is only id as a number, it will be the only element that matches
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