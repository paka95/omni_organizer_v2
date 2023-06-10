import { buildList } from "./build-list.js";
import { getCookie } from "./get-cookie.js";
import { showMessage } from "../../../../static/js/show-message.js";

export function submitNote(userId) {
    const csrftoken = getCookie('csrftoken');
    const userObj = {
        'user': userId
    }
    fetch('submit/', {
        // it creates an empty note, assigns it with user's ID and loads its empty content into the input fields
        // so that the user can edit them without the need to save the note
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(userObj)
    })
    .then(()=> {
        buildList();
        showMessage("Note added", "success")
    })
}