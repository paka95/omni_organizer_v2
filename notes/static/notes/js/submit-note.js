import { buildList } from "./build-list.js";
import { getCookie } from "./get-cookie.js";

export function submitNote() {
    const csrftoken = getCookie('csrftoken');
    fetch('submit/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
    })
    .then(()=> {
        buildList();
    })
}