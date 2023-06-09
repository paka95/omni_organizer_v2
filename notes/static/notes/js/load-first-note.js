export function loadFirstNote () {
    const firstNote = document.getElementsByClassName('note-card')[0]
    const noteCardTitle = firstNote.querySelector('.note-card-title').textContent;
    const noteCardContent = firstNote.querySelector('.note-card-content').textContent;
    const noteForm = document.getElementById('note-input-form');
    const noteTitleInput = document.getElementById("note-input-title");
    const noteContentInput = document.getElementById("note-input-content");
    const noteCardId = firstNote.id.match(/\d+/)[0];

    noteForm.setAttribute('data-note-to-update', `${noteCardId}`);

    // loading first note's data into the input fields

    noteTitleInput.value = noteCardTitle;
    noteContentInput.value = noteCardContent;
}