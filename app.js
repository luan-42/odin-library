const myLibrary = [];
const library = document.querySelector("#my-library");

function Book(cover, title, author, pages, description, read) {
    this.cover = cover
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.description = description;
    this.read = read;
}

function addBookToLibrary(cover, title, author, pages, description, read) {
    title = title == "" ? "Untitled": title;
    cover = cover == "" ? "./images/no-image.jpg": cover;
    const book = new Book(cover, title, author, pages, description, read);
    myLibrary.push(book);
}

function removeBookToLibrary(index) {
    myLibrary.splice(index, 1);
}

const bookInfo = document.querySelector("#book-info");
function displayBookInfo(index) {
    const read = bookInfo.querySelector("#actions > button");
    const btn_delete = bookInfo.querySelector("#actions > img");
    bookInfo.style.display = "flex";
    bookInfo.querySelector("img").src = myLibrary[index].cover;;
    bookInfo.querySelector("h2").textContent = myLibrary[index].title;
    bookInfo.querySelector(".author").textContent = myLibrary[index].author;
    bookInfo.querySelector(".pages").textContent = myLibrary[index].pages;
    bookInfo.querySelector(".description").textContent = myLibrary[index].description;
    read.textContent = myLibrary[index].read ? "Read" : "Unread";
    read.className = myLibrary[index].read ? "read" : "unread";
    read.onclick = () => {
        myLibrary[index].read = !myLibrary[index].read;
        read.textContent = myLibrary[index].read ? "Read" : "Unread";
        read.className = myLibrary[index].read ? "read" : "unread";
    };
    btn_delete.onclick = () => {
        removeBookToLibrary(index);
        bookInfo.style.display = "none";
        displayBooks(myLibrary);
    };
}

library.addEventListener("click", () => {
    bookInfo.style.display = "none";
});

const newBook = document.querySelector("#new-book");
function displayBooks(books) {
    library.innerHTML = "";
    library.appendChild(newBook);
    let index = 0;
    books.forEach((book) => {
        const cardBook = document.createElement("div");
        cardBook.className = "card-book";
        cardBook.dataset.index = index;

        const cover = document.createElement("img");
        cover.src = book["cover"];
        cover.addEventListener("click", (event) => {
            displayBookInfo(cardBook.dataset.index);
            event.stopPropagation();
        });
        cardBook.appendChild(cover);

        library.appendChild(cardBook);
        index++;
    });
}

const modal = document.querySelector("#add-book-form");
newBook.addEventListener("click", () => {
    modal.showModal();
});

const addBook = document.querySelector("#btn-add-book");
addBook.addEventListener("click", (event) => {
    const book = [];
    const inputs = modal.querySelectorAll("input, textarea");

    inputs.forEach((input) => {
        if (input.type != 'checkbox') {
            book.push(input.value);
            input.value = "";
        } else {
            book.push(input.checked);
            input.checked = false;
        }
    })
    addBookToLibrary(...book);
    modal.close();
    displayBooks(myLibrary);
});