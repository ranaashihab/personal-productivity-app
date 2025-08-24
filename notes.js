let noteInput = document.getElementById("input");
let saveBtn = document.getElementById("save");
let notesList = document.getElementById("note-list");
let searchInput = document.getElementById("search");
let clearBtn = document.getElementById("clear");

window.addEventListener("load", function () {
    let savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    savedNotes.forEach(noteText => addNoteToList(noteText));
});

saveBtn.addEventListener("click", function () {
    let noteText = noteInput.value.trim();
    if (noteText === "") {
        alert("Please enter a note!");
        return;
    }

    addNoteToList(noteText);

    let savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    savedNotes.push(noteText);
    localStorage.setItem("notes", JSON.stringify(savedNotes));

    noteInput.value = ""; 
});

function addNoteToList(noteText) {
    let listItem = document.createElement("li");
    listItem.textContent = noteText;

    let dltBtn = document.createElement("button");
    dltBtn.textContent = "Delete";
    dltBtn.addEventListener("click", function () {
        listItem.remove();
        removeFromLocalStorage(noteText);
    });

    listItem.appendChild(dltBtn);
    notesList.appendChild(listItem);
}

function removeFromLocalStorage(noteText) {
    let savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    savedNotes = savedNotes.filter(note => note !== noteText);
    localStorage.setItem("notes", JSON.stringify(savedNotes));
}


clearBtn.addEventListener("click", function () {
noteInput.value = ""; 

});

searchInput.addEventListener("input", function() {
    let searchText = searchInput.value.toLowerCase(); 
    let notes = document.querySelectorAll("#note-list li"); 

    notes.forEach(function(note) {
        let noteText = note.firstChild.textContent.toLowerCase();
        
        if (noteText.includes(searchText)) {
            note.style.display = "flex"; 
        } else {
            note.style.display = "none"; 
        }
    });
});
document.getElementById("back-btn").addEventListener("click", function () {
    window.location.href = "index.html"; 
});
function checkEmptyNotes() {
    let notesList = document.getElementById("note-list");
    
    if (notesList.children.length === 0) {
        document.body.style.overflow = "hidden"; 
    } else {
        document.body.style.overflow = "auto";
    }
}


window.onload = checkEmptyNotes;


document.getElementById("save").addEventListener("click", function() {
    setTimeout(checkEmptyNotes, 100); 
});

document.addEventListener("click", function(event) {
    if (event.target.classList.contains("delete-note-btn")) {
        setTimeout(checkEmptyNotes, 100); 
    }
});
