const myLibrary = [];

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

const newBook = document.querySelector("#new-book");

function displayBooks(books) {
    const library = document.querySelector("#my-library");
    library.innerHTML = "";
    library.appendChild(newBook);
    let index = 0;
    books.forEach((book) => {
        const cardBook = document.createElement("div");
        cardBook.className = "card-book";
        cardBook.dataset.index = index;

        const cover = document.createElement("img");
        cover.src = book["cover"];
        cardBook.appendChild(cover);

        const title = document.createElement("p");
        title.textContent = book["title"]
        cardBook.appendChild(title);

        library.appendChild(cardBook);
        index++;
    });
}

const modal = document.querySelector("#add-book-form");
newBook.addEventListener("click", () => {
    modal.showModal();
});

const addBook = document.querySelector("#btn-add-book");
addBook.addEventListener("click", () => {
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