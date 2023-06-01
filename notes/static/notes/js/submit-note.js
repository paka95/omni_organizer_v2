import { buildList } from "./build-list.js";
import { getCookie } from "./get-cookie.js";

export function submitNote(userId) {
    const csrftoken = getCookie('csrftoken');
    const userObj = {
        'user': userId
    }
    fetch('submit/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(userObj)
    })
    .then(()=> {
        buildList();
    })
}