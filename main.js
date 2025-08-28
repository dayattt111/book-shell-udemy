const books = [];
const RENDER_EVENT = 'render-book';

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
};

// console.log(books);

document.addEventListener(RENDER_EVENT, function () {
    console.log(books);
});


function addBook() {
    const titleBook = document.getElementById('bookFormTitle').value;
    const authBook = document.getElementById('bookFormAuthor').value;
    const yearBook = document.getElementById('bookFormYear').value;

    const checkBook = document.getElementById('bookFormIsComplete');
    var isChecked = checkBook.checked;

    const generatedID = generateId();
    const todoObject = generateTodoObject(generatedID, titleBook, authBook, yearBook, isChecked);
    books.push(todoObject);
    
    document.dispatchEvent(new Event(RENDER_EVENT));
};