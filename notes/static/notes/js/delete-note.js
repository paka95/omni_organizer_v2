import { buildList } from "./build-list.js";
import { getCookie } from "./get-cookie.js";

export function deleteNote (deleteButtons) {
    const csrftoken = getCookie('csrftoken');
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', (e) => {
            e.preventDefault();
            const id = deleteButtons[i].closest('.note-card').getAttribute('id');
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