let library = document.getElementById('library');
library.innerHTML = "";
const newBookForm = document.getElementById('newBookForm')
const titleField = document.getElementById('title');
const authorField = document.getElementById('author');
const pagesField = document.getElementById('pages');

// newForm.onsubmit= addBook;

// function Book(id, title, author, pages, read) {
//     this.id = id;
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.read = read;
// }

class Book {
    constructor(id, title, author, pages, read) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}


let myLibrary = [];

let idCount = myLibrary.length +1;
const theHobbit = new Book(idCount, 'The Hobbit', 'J. R. R. Tolkien', 295, false);
myLibrary.push(theHobbit);
createBookCard(idCount, 'The Hobbit', 'J. R. R. Tolkien', 295, false)

idCount = myLibrary.length +1;
const toKillAMockingbird = new Book(idCount, 'To Kill a Mockingbird', 'Harper Lee', 336, true);
myLibrary.push(toKillAMockingbird);
createBookCard(idCount, 'To Kill a Mockingbird', 'Harper Lee', 336, true);

idCount = myLibrary.length +1;
const theCatcherInTheRye = new Book(idCount, 'The Catcher in the Rye', 'J. D. Salinger', 234, true);
myLibrary.push(theCatcherInTheRye);
createBookCard(idCount, 'The Catcher in the Rye', 'J. D. Salinger', 234, true);

function bookForm() {
    let newForm = document.getElementById('newForm');
    if (newForm.style.display === "none"){
        newForm.style.display = "flex"
    } else {
        newForm.style.display = "none";
    }
}

window.addEventListener('load', () => {
    titleField.setCustomValidity("Please enter the title of the book.");
    authorField.setCustomValidity("Please enter the author of the book.");
    pagesField.setCustomValidity("Please enter the amount of pages in the book.");
})

titleField.addEventListener("input", () => {
    if (titleField.validity.valueMissing) {
        titleField.setCustomValidity("Please enter the title of the book.")
    } else {
        titleField.setCustomValidity("");
    }
})

authorField.addEventListener("input", () => {
    if (authorField.validity.valuemissing) {
        authorField.setCustomValidity("Please enter the author of the book.");
    } else {
        authorField.setCustomValidity("");
    }
})

pagesField.addEventListener("input", () => {
    if (pagesField.validity.valueMissing) {
        pagesField.setCustomValidity("Please enter the amount of pages in the book.");
    } else  {
        pagesField.setCustomValidity("");
    }
})

// const getBook = () => {
//     const id = myLibrary.length +1;
//     const title = document.getElementById('title').value
//     const author = document.getElementById('author').value
//     const pages = document.getElementById('pages').value
//     const read = document.getElementById('read').value
//     return new Book(id, title, author, pages, read);
// }

function addBook (e) {
    // e.preventDefault();
    idCount++;
    let titleText = document.querySelector('#title');
    let authorText = document.querySelector('#author');
    let pagesText = document.querySelector('#pages');
    let readText = document.querySelector('#read');
    const newBook = new Book((idCount), titleText.value, authorText.value, pagesText.value, readText.checked);
    myLibrary.push(newBook);
    createBookCard((idCount), titleText.value, authorText.value, pagesText.value, readText.checked)
    console.log(myLibrary);

    clearForm();
    let newForm = document.getElementById('newForm');
    newForm.style.display = "none";
}

function clearForm() {
    document.getElementById("newForm").reset();
}

function removeBook(e) {
    let result = confirm("Are you sure you want to delete this book?");
    if (result == true) {
    targetId = parseInt(e.target.parentElement.id,10);
    for (i = myLibrary.length -1; i >= 0; --i){
        if (myLibrary[i].id === targetId) {
            myLibrary.splice(i,1)
        }
    }
    e.target.parentElement.remove();
    } else {
        return
    }
}

function readToggle(e) {
    targetId = parseInt(e.target.parentElement.id,10);
    for (i = myLibrary.length -1; i >= 0; --i){
        if (myLibrary[i].id === targetId) {
            myLibrary[i].read = !myLibrary[i].read;
        }
    }
}

function createBookCard(id, title, author, pages, read) {
    const bookCard = document.createElement('div');
    bookCard.setAttribute('id', id);
    bookCard.classList.add('bookCard')

    let titleElement = document.createElement('p');
    titleElement.classList.add('title');
    let authorElement = document.createElement('p');
    authorElement.classList.add('author');
    let pagesElement = document.createElement('p');
    pagesElement.classList.add('pages');
    // let readElement = document.createElement('p');
    let readToggleElement = document.createElement('button');
    let removeBtnElement = document.createElement('button');
    removeBtnElement.classList.add('remove')

    titleElement.textContent = `${title}`;
    authorElement.textContent = `${author}`;
    pagesElement.textContent = `${pages} Pages`;

    if (read) {
        readToggleElement.textContent = `Read`;
        readToggleElement.classList.add('haveRead')
    } else {
        readToggleElement.textContent = 'Not Read'
        readToggleElement.classList.add('notRead')
    }
    readToggleElement.addEventListener('click', function(event){
        readToggle(event);
    });
    readToggleElement.addEventListener('click', () => {
        if (readToggleElement.classList.contains('haveRead')){
            readToggleElement.classList.add('notRead');
            readToggleElement.classList.remove('haveRead');
            readToggleElement.textContent = `Not Read`;
        } else {
            readToggleElement.classList.remove('notRead');
            readToggleElement.classList.add('haveRead');
            readToggleElement.textContent = 'Read';
        }
    });

    // readElement.innerHTML = `${read}`;
    removeBtnElement.textContent = "Remove";

    library.appendChild(bookCard);
    bookCard.appendChild(titleElement);
    bookCard.appendChild(authorElement);
    bookCard.appendChild(pagesElement);
    bookCard.appendChild(readToggleElement);
    bookCard.appendChild(removeBtnElement);

    removeBtnElement.addEventListener('click', removeBook);
}


