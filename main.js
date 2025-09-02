const books = [];
const RENDER_EVENT = 'render-book';
let editBookId = null; // penanda mode edit

document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('bookForm');
    submitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addBook();
    });
});

function generateId() {
    return +new Date();
}
    
function generateTodoObject(id, title, author, year, isCompleted) {
    return {
        id,
        title,
        author,
        year,
        isCompleted,
    };
}

function addBook() {
    const titleBook = document.getElementById('bookFormTitle').value;
    const authBook = document.getElementById('bookFormAuthor').value;
    const yearBook = document.getElementById('bookFormYear').value;

    const checkBook = document.getElementById('bookFormIsComplete');
    let isCompleted = checkBook.checked;

    if (editBookId !== null) {
        // Update buku lama
        const bookTarget = books.find(book => book.id === editBookId);
        if (bookTarget) {
            bookTarget.title = titleBook;
            bookTarget.author = authBook;
            bookTarget.year = yearBook;
            bookTarget.isCompleted = isCompleted;
        }
        editBookId = null; 
    } else {
        // Tambah baru
        const generatedID = generateId();
        const todoObject = generateTodoObject(generatedID, titleBook, authBook, yearBook, isCompleted);
        books.push(todoObject);
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
    document.getElementById('bookForm').reset(); // reset form setelah submit
}

function makeBook(todoObject) {
    const textTitle = document.createElement('h3');
    textTitle.innerText = todoObject.title;

    const textAuthor = document.createElement('p');
    textAuthor.innerText = "Penulis: " + todoObject.author;

    const textYear = document.createElement('p');
    textYear.innerText = "Tahun: " + todoObject.year;

    const buttonS = document.createElement('button');
    const buttonE = document.createElement('button');
    const buttonD = document.createElement('button');

    buttonS.classList.add('bookItemIsCompleteButton');
    buttonE.classList.add('bookItemEditButton');
    buttonD.classList.add('bookItemDeleteButton');

    // Tombol selesai dibaca
    buttonS.innerText = todoObject.isCompleted ? "Belum selesai" : "Selesai dibaca";
    buttonS.addEventListener('click', function () {
        toggleBook(todoObject.id);
    });

    // Tombol edit
    buttonE.innerText = "Edit Buku";
    buttonE.addEventListener('click', function () {
        editBook(todoObject.id);
    });

    // Tombol hapus
    buttonD.innerText = "Hapus Buku";
    buttonD.addEventListener('click', function () {
        if (confirm("Yakin hapus buku ini?")) {
            deleteBook(todoObject.id);
        }
    });

    const actionContainer = document.createElement('div');
    actionContainer.append(buttonS, buttonE, buttonD);

    const textContainer = document.createElement('div');
    textContainer.classList.add('inner');
    textContainer.append(textTitle, textAuthor, textYear, actionContainer);

    const container = document.createElement('div');
    container.classList.add('item', 'shadow');
    container.append(textContainer);
    container.setAttribute('id', `book-${todoObject.id}`);

    return container;
}

function toggleBook(bookId) {
    const bookTarget = books.find(book => book.id === bookId);
    if (!bookTarget) return;

    bookTarget.isCompleted = !bookTarget.isCompleted;
    document.dispatchEvent(new Event(RENDER_EVENT));
}

function deleteBook(bookId) {
    const bookIndex = books.findIndex(book => book.id === bookId);
    if (bookIndex === -1) return;

    books.splice(bookIndex, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
}

function editBook(bookId) {
    const bookTarget = books.find(book => book.id === bookId);
    if (!bookTarget) return;

    // Isi ulang form dengan data lama
    document.getElementById('bookFormTitle').value = bookTarget.title;
    document.getElementById('bookFormAuthor').value = bookTarget.author;
    document.getElementById('bookFormYear').value = bookTarget.year;
    document.getElementById('bookFormIsComplete').checked = bookTarget.isCompleted;

    // Set flag edit
    editBookId = bookId;
}

document.addEventListener(RENDER_EVENT, function () {
    const incompleteBookList = document.getElementById('incompleteBookList');
    const completedBookList = document.getElementById('completeBookList');

    // Kosongkan rak dulu sebelum render ulang
    incompleteBookList.innerHTML = '';
    completedBookList.innerHTML = '';

    for (const bookItem of books) {
        const bookElement = makeBook(bookItem);
        if (!bookItem.isCompleted) {
            incompleteBookList.append(bookElement);
        } else {
            completedBookList.append(bookElement);
        }
    }
});
