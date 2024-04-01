let noteArea = document.querySelector(".note_area");
let title = document.querySelector(".title");
let noteText = document.querySelector(".note-text");
let notes = document.querySelector("#notes");
let note = document.querySelector(".note");

const addNoteToLocalStorage = (note) => {
  if (note.length <= 0) {
    return;
  }

  let oldNotes;
  if (localStorage.getItem("notes") === null) {
    oldNotes = [];
  } else {
    oldNotes = JSON.parse(localStorage.getItem("notes"));
  }

  oldNotes.push(note);

  localStorage.setItem("notes", JSON.stringify(oldNotes));
};

const getNotesFromLocalStorage = () => {
  let oldNotes;

  if (localStorage.getItem("notes") === null) {
    oldNotes = [];
  } else {
    oldNotes = JSON.parse(localStorage.getItem("notes"));
  }
  oldNotes.forEach((element) => {
    notes.innerHTML += `
    <div class="note">
        <h1 class="titel-text" id="titel-text">${element[0]}</h1>
        <p class="note-blog">
        ${element[1]}
        </p>
        <i class="fa fa-trash"></i>
    </div>
    `;
  });
};

const removeNoteFromLocalStorage = (deleteNote) => {
  let oldNotes;
  if (localStorage.getItem("notes") === null) {
    oldNotes = [];
  } else {
    oldNotes = JSON.parse(localStorage.getItem("notes"));
  }
  oldNotes.map((note, index) => {
    if (
      note[0] === deleteNote.children[0].textContent.trim() &&
      note[1] === deleteNote.children[1].textContent.trim()
    ) {
      oldNotes.splice(index, 1);
      return oldNotes;
    }
  });
  localStorage.setItem("notes", JSON.stringify(oldNotes));
};

document.addEventListener("DOMContentLoaded", getNotesFromLocalStorage);

const showNoteArea = () => {
  // console.log(noteText)
  noteText.style = "display: block";
  noteArea.classList.add("note-now");
  title.setAttribute("placeholder", "Title");
  title.style = "font-size:22px";
};

const hideNoteArea = () => {
  noteText.style = "display: none";
  noteArea.classList.remove("note-now");
  title.setAttribute("placeholder", "Take A Note...");
  title.style = "font-size:14px";
};
const addNote = (myTitle, myNote) => {
  notes.innerHTML += `
    <div class="note">
        <h1 class="titel-text" id="titel-text">${myTitle}</h1>
        <p class="note-blog">
        ${myNote}
        </p>
        <i class="fa fa-trash"></i>
    </div>
    `;
  title.value = "";
  noteText.value = "";
};

noteArea.addEventListener("click", showNoteArea);
document.addEventListener("click", () => {
  let isClicked = noteArea.contains(event.target);
  console.log(isClicked);
  if (!isClicked) {
    hideNoteArea();
    if (title.value.length === 0 && noteText.value.length === 0) {
      return;
    } else {
      addNoteToLocalStorage([title.value, noteText.value]);
      addNote(title.value, noteText.value);
    }
  }
});

document.addEventListener("mouseover", (event) => {
  if (event.target.classList.contains("note")) {
    event.target.querySelector("i").classList.add("show");
  }
});
document.addEventListener("mouseout", (event) => {
  if (event.target.classList.contains("note")) {
    event.target.querySelector("i").classList.remove("show");
  }
});
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("fa-trash")) {
    event.target.parentElement.remove();
    removeNoteFromLocalStorage(event.target.parentElement);
  }
});
