import { buildList } from "./build-list.js";
import { getCookie } from "./get-cookie.js";

export function saveNote (noteId) {
    const csrftoken = getCookie('csrftoken');
    const noteTitleInput = document.getElementById("note-input-title").value;
    const noteContentInput = document.getElementById("note-input-content").value;
    const patchedNote = {
        'title': noteTitleInput,
        'content': noteContentInput
    }

    fetch(`update/${noteId}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(patchedNote)
    })
    .then(() => {
        buildList();
    })
    .catch(error => console.error(error));
}