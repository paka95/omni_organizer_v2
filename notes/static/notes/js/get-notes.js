import { buildList } from "./build-list.js";
import { submitNote } from "./submit-note.js";


document.addEventListener("DOMContentLoaded", () => {
    buildList();

    const noteAddBtn = document.getElementById("note-add-btn");
    noteAddBtn.addEventListener("click", (e) => {
        e.preventDefault();
        submitNote();
    })

})