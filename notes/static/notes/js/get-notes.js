import { buildList } from "./build-list.js";
import { submitNote } from "./submit-note.js";
import { getCookie } from "./get-cookie.js";

const csrftoken = getCookie('csrftoken');


document.addEventListener("DOMContentLoaded", () => {
    buildList();

    const noteAddBtn = document.getElementById("note-add-btn");
    noteAddBtn.addEventListener("click", (e) => {
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