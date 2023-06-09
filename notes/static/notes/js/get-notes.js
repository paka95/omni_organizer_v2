import { buildList } from "./build-list.js";
import { submitNote } from "./submit-note.js";
import { getCookie } from "./get-cookie.js";

const csrftoken = getCookie('csrftoken');


document.addEventListener("DOMContentLoaded", () => {
    // build list with notes on template's onload
    buildList();

    const noteAddBtn = document.getElementById("note-add-btn");
    noteAddBtn.addEventListener("click", (e) => {
        // get the currently logged in user's ID, so that the note can be created and assigned this ID
        // serializer needs user's ID in the request
        // it creates an empty note, assigns it with user's ID and loads its empty content into the input fields
        // so that the user can edit them without the need to save the note
        e.preventDefault();
        fetch('get-user-id/', {
            method: 'GET',
            headers: {
                'X-CSRFToken': csrftoken,
            },
        })
        .then(response => response.json())
        .then(data => {
            const userId = data.user_id;
            submitNote(userId);
        });
    })
})