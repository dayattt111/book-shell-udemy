const books = [];
const RENDER_EVENT = 'render-books';
// const tes = document.getElementById('bookFormSubmit');

function addBook() {
    const titleBook = document.getElementById('bookFormTitle').value;
    const authBook = document.getElementById('bookFormAuthor').value;
    const yearBook = document.getElementById('bookFormYear').value;
    const checkBook = document.getElementById('bookFormIsComplete').value;


    const generatedID = generateId();
    const todoObject = generateTodoObject(generatedID, titleBook, authBook, yearBook, checkBook);
    books.push(todoObject);
    
    document.dispatchEvent(new Event(RENDER_EVENT));
};

// tes.addEventListener('click', function() {
//     // console.log()
//     addBook();
// })

// console.log(RENDER_EVENT);

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


document.addEventListener(RENDER_EVENT, function () {
    console.log(books);
});

