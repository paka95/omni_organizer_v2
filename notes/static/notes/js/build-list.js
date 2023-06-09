import { deleteNote } from "./delete-note.js";
import { editNote } from "./edit-note.js";
import { loadFirstNote } from "./load-first-note.js";

export function buildList() {
    const notesList = document.querySelector('.notes-list');
    const noteInputContainer = document.querySelector('.note-input-container');
    notesList.innerHTML = ''

    fetch('get-notes/')
    .then(response => response.json())
    .then(data => {
        // displaying either empty or prompted note entering field
        if (data.length == 0) {
            notesList.innerHTML = `<div style="margin: 5px auto; width: 90%; height: 120px; text-align:center">You have no notes yet</div>`;
            noteInputContainer.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; color: gray">
                <div style="width: 50%; height: 50%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                    <div>
                        <i class="fa-solid fa-10x fa-note-sticky"></i>
                    </div>
                    <div style="margin:30px auto">Add note to start typing</div>
                </div>
            </div>`;
        } else {
            noteInputContainer.innerHTML = `
            <form class="note-input-form" id="note-input-form">
                <div style="display: flex; justify-content: space-around;">
                    <input type="text" placeholder="Enter title..." class="note-input-title" id="note-input-title">
                    <button type="submit" class="note-save-btn" id="note-save-btn">Save</button>
                </div>
                <hr/>
                <textarea placeholder="Enter a note..." class="note-input-content" id="note-input-content"></textarea>
            </form>
            `;

            data.forEach((note, index) => {
                const dateObj = new Date(note.last_updated);
                const options = { 
                    day: '2-digit', 
                    month: '2-digit', 
                    year: 'numeric', 
                    hour: '2-digit', 
                    minute: '2-digit', 
                    second: '2-digit', 
                    timeZone: 'UTC' 
                    };
                const formattedDate = dateObj.toLocaleString(navigator.language, options)
                const noteHtml = `
                    <div class="note-card" id="note-${note.id}">
                        <div class="note-card-headline">
                            <div class="note-card-title" title="${note.title}">${note.title}</div>
                            <div class="delete-btn" title="Delete note">
                                <i class="fa-solid fa-trash-alt"></i>
                            </div>
                        </div>
                        
                        <div class="note-card-content">${note.content}</div>
                        <div class="note-card-date">Last edited on ${formattedDate}</div>
                    </div>
                `;
                const noteDiv = document.createElement('div');
                noteDiv.innerHTML = noteHtml;
                notesList.appendChild(noteDiv);

                // rendering the bottom separator after each note, unless it's the last one
                if (index !== data.length - 1) {
                    const separator = document.createElement('div');
                    separator.classList.add('separator');
                    notesList.appendChild(separator);
                }

            });
            // loading first note's content into the form after onload
            loadFirstNote();
            
            const deleteButtons = document.getElementsByClassName('delete-btn')
            const editCards = document.getElementsByClassName('note-card')
            deleteNote(deleteButtons);
            editNote(editCards);
        }
    })
}