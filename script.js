"use strict";

function toggleBold() {
    document.execCommand('bold');
}

function toggleItalic() {
    document.execCommand('italic');
}

function toggleUnderline() {
    document.execCommand('underline');
}

function toggleTextColor(color) {
    document.execCommand('foreColor', false, color);
}

document.addEventListener("DOMContentLoaded", () => {
    const btnAdd = document.querySelector(".btn_add");
    const notes = JSON.parse(localStorage.getItem("notes")) || [];

    if (notes.length > 0) {
        notes.forEach((note) => addNoteElement(note));
    }

    btnAdd.addEventListener("click", () => addNoteElement({ text: "", html: "" }));

    function addNoteElement(note) {
        const noteWrapper = document.createElement("div");
        noteWrapper.classList.add("note-wrapper");

        noteWrapper.innerHTML = `
            <div class="operations">
                <button class="boldBtn formatBtn"><i class="fa-solid fa-bold"></i></button>
                <button class="italicBtn formatBtn"><i class="fa-solid fa-italic"></i></button>
                <button class="underlineBtn formatBtn"><i class="fa-solid fa-underline"></i></button>
                <input type="color" class="textColorPicker formatBtn">
                <button class="edit fas fa-edit"></button>
                <button class="delete fas fa-trash-alt"></button>
            </div>
            <div class="main" contenteditable="true">${note.html}</div>
        `;

        const editBtn = noteWrapper.querySelector(".edit");
        const deleteBtn = noteWrapper.querySelector(".delete");
        const mainEl = noteWrapper.querySelector(".main");
        const boldBtn = noteWrapper.querySelector('.boldBtn');
        const italicBtn = noteWrapper.querySelector('.italicBtn');
        const underlineBtn = noteWrapper.querySelector('.underlineBtn');
        const textColorPicker = noteWrapper.querySelector('.textColorPicker');

        deleteBtn.addEventListener("click", () => {
            noteWrapper.remove();
            updateLocalStorage();
        });

        editBtn.addEventListener("click", () => {
            mainEl.focus();
        });

        boldBtn.addEventListener("click", () => {
            toggleBold();
            mainEl.focus();
            updateLocalStorage();
        });

        italicBtn.addEventListener("click", () => {
            toggleItalic();
            mainEl.focus();
            updateLocalStorage();
        });

        underlineBtn.addEventListener("click", () => {
            toggleUnderline();
            mainEl.focus();
            updateLocalStorage();
        });

        textColorPicker.addEventListener("input", () => {
            const color = textColorPicker.value;
            toggleTextColor(color);
            mainEl.focus();
            updateLocalStorage();
        });

        mainEl.addEventListener("input", () => {
            updateLocalStorage();
        });

        // Restore HTML content if available
        if (note.html) {
            mainEl.innerHTML = note.html;
        }

        document.body.appendChild(noteWrapper);
    }

    function updateLocalStorage() {
        const noteWrappers = document.querySelectorAll(".note-wrapper");
        const notes = [];
        noteWrappers.forEach((noteWrapper) => {
            const mainEl = noteWrapper.querySelector(".main");
            const text = mainEl.innerText;
            const html = mainEl.innerHTML;
            notes.push({ text, html });
        });
        localStorage.setItem("notes", JSON.stringify(notes));
    }
});
