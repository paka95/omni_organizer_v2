import { saveNote } from "./save-note.js";

export function editNote (editButtons) {
    const noteForm = document.getElementById('note-input-form');
    for (let i = 0; i < editButtons.length; i++) {
        editButtons[i].addEventListener('click', (e) => {
            // applying click event listener on each note
            e.preventDefault();
            // getting the id of the closest's parent element
            const id = editButtons[i].closest('.note-card').getAttribute('id');
            // retrieving only the ID number of it - it looks like this: note-1
            const noteId = id.match(/\d+/)[0];

            // setting the id data to the form of the clicked note
            noteForm.setAttribute('data-note-to-update', `${noteId}`);

            const noteCard = document.querySelector(`#note-${noteId}`);
            const noteTitle = noteCard.querySelector('.note-card-title').textContent;
            const noteContent = noteCard.querySelector('.note-card-content').textContent;
            const noteTitleInput = document.getElementById("note-input-title");
            const noteContentInput = document.getElementById("note-input-content");
            // applying note's values into the input fields
            noteTitleInput.value = noteTitle;
            noteContentInput.value = noteContent;
        })
    }
    
    const saveButton = document.getElementById("note-save-btn");
    saveButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopImmediatePropagation(); // this helped to fight bubbling, without this buildList() in save-note.js was executed double with every update to the note card
        const noteId = noteForm.dataset.noteToUpdate;
        saveNote(noteId);
    })
}