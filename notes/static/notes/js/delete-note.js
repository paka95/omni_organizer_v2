import { buildList } from "./build-list.js";
import { getCookie } from "./get-cookie.js";

export function deleteNote (deleteButtons) {
    const csrftoken = getCookie('csrftoken');
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', (e) => {
            // applying click event listener on each note
            e.preventDefault();
            // getting the id of the closest's parent element
            const id = deleteButtons[i].closest('.note-card').getAttribute('id');
            // retrieving only the ID number of it - it looks like this: note-1
            const noteId = id.match(/\d+/)[0];

            fetch(`delete/${noteId}/`, {
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