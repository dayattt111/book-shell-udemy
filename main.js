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

    // return todoObject;
};


function makeBook(todoObject) {

    // console.log(books);

    const textTitle = document.createElement('h3');
    textTitle.innerText = todoObject.title;

    const textAuthor = document.createElement('p');
    textAuthor.innerText = todoObject.author;

    const textYear = document.createElement('p');
    textYear.innerText = todoObject.year;

    const textContainer = document.createElement('div');
    textContainer.classList.add('inner');
    textContainer.append(textTitle, textAuthor, textYear);

    const container = document.createElement('div');

    container.classList.add('item', 'shadow');
    container.append(textContainer);
    container.setAttribute('id', 'book-${todoObject.id}');

    return container;
};

document.addEventListener(RENDER_EVENT, function () {
    //   console.log(bookItem);
      const uncompletedBookList = document.getElementById('bookItem');
      uncompletedBookList.innerHTML = '';
     
      for (const bookItem of books) {
        const bookElement = makeBook(bookItem);
        uncompletedBookList.append(bookElement);
      }
});