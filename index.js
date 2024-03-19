
const form = document.getElementById("bookForm");
const tableBody = document.getElementById("t-body");

let pagesNumber = document.getElementById('pages');
let authorInputValidation = document.getElementById('author');
let bookNameValidation = document.getElementById('book-name');
let statusValidation = document.getElementById('status');


const library = [];


class Book {
    constructor(author, name, pages, status) {
        this.author = author;
        this.name = name;
        this.pages = pages;
        this.read = status;
    }
}








function deleteBook(arr) {
    arr.forEach((button, i) => {
        button.addEventListener("click", () => {
            library.splice(i, 1);
            updateTable();
        }
)});
    
};



function toggleStatus(rowIndex, newStatus) {
    console.log(library[rowIndex].read)
    library[rowIndex].read = newStatus;
    updateTable();
}


function updateTable() {
    tableBody.innerHTML = "";
    for (let i = 0; i < library.length; i++) {
       let row = document.createElement("tr");
       row.innerHTML = `
            <td>${library[i].author}</td>
            <td>${library[i].name}</td>
            <td>${library[i].pages}</td>
            <td>${library[i].read}
            <select name="status" id="toggled-status" >
            <option value="" default>Choose</option>
            <option value="yes">Yes</option>
            <option value="no ">No</option>
            </select>
            </td>
            <td><button id="delete-book-btn">Delete</button></td> 
        `;
        tableBody.appendChild(row);

    };
    
     // change book status
     const toggleReads = document.querySelectorAll("#toggled-status");
    toggleReads.forEach((select, index) => {
        select.addEventListener("change", (event) => {
            const newStatus = event.target.value;
            toggleStatus(index, newStatus);
        });
    });

    // delete book
    const deleteButtons = document.querySelectorAll("#delete-book-btn");
    deleteBook(deleteButtons);

}


updateTable()


function addBook(e) {
      e.preventDefault();
      let author = form.querySelector("#author").value;
      let title = form.querySelector("#book-name").value;
      let pages = form.querySelector("#pages").value;
      let status = form.querySelector("#status").value;    
      let book = new Book(author,title,pages,status);
      library.push(book);

      form.querySelector("#author").value = "";
      form.querySelector("#book-name").value = "";
      form.querySelector("#pages").value = "";
      form.querySelector("#status").value = ""; 
        updateTable()
  dialog.close();

}


form.addEventListener("submit",addBook);



function populate(){
   if(library.length == 0){
    for(let i =1;i <11;i++){
        let book = new Book("anas",`book:${i}`,"100","yes");
        library.push(book);
    }
   }
    updateTable()
}
   


const dialog = document.querySelector("dialog");
const showButton = document.querySelector("#show-btn");
const closeButton = document.querySelector("#closeButton");

showButton.addEventListener("click", (e) => {
    e.preventDefault();

  dialog.showModal();
});


closeButton.addEventListener("click", (e) => {
    e.preventDefault();
  dialog.close();
});


closeButton.addEventListener("click", e => {
    e.preventDefault();
    dialog.close();
    
})



function validatePages() {
    if (pagesNumber.validity.rangeUnderflow) {
        pagesNumber.setCustomValidity("It's too short to be considered a book.");
    } else {
        pagesNumber.setCustomValidity("");
    }
}

function validateAuthor() {
    if (authorInputValidation.validity.valueMissing) {
        authorInputValidation.setCustomValidity("Missing author name.");
    } else if (authorInputValidation.validity.tooShort) {
        authorInputValidation.setCustomValidity("Author name too short.");
    } else {
        authorInputValidation.setCustomValidity("");
    }
}

function validateBookName() {
    if (bookNameValidation.validity.valueMissing) {
        bookNameValidation.setCustomValidity("Missing book name.");
    } else if (bookNameValidation.validity.tooShort) {
        bookNameValidation.setCustomValidity("Book name too short.");
    } else {
        bookNameValidation.setCustomValidity("");
    }
}

function validateStatus() {
    console.log(typeof statusValidation.value)
    if (statusValidation.value === "") {
        statusValidation.setCustomValidity("Choose whether you read the book or not.");
    } else {
        statusValidation.setCustomValidity("");
    }
}

pagesNumber.addEventListener("input", validatePages);
authorInputValidation.addEventListener("input", validateAuthor);
bookNameValidation.addEventListener("input", validateBookName);
statusValidation.addEventListener("blur", validateStatus);

function validateForm() {
    validatePages();
    validateAuthor();
    validateBookName();
    validateStatus();
    
}

form.addEventListener("submit", validateForm);