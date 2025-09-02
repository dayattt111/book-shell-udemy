    // if(isChecked){
    //     alert('Trueee');
    //     const todoObject = generateTodoObject(generatedID, titleBook, authBook, yearBook, isChecked);
    //     books.push(todoObject);
    // } else{
        //     alert('Falsee');
        // };
        // console.log(isChecked);
        
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
        
        // console.log(books);
function generateTodoObject(id, title, author, year, isCompleted) {
    return {
        id,
        title,
        author,
        year,
        isCompleted,
    };
}

document.addEventListener(RENDER_EVENT, function () {
    console.log(books);
});

function addBook() {
    const titleBook = document.getElementById('bookFormTitle').value;
    const authBook = document.getElementById('bookFormAuthor').value;
    const yearBook = document.getElementById('bookFormYear').value;

    const checkBook = document.getElementById('bookFormIsComplete');
    let isCompleted = checkBook.checked; 

    const generatedID = generateId();
    const todoObject = generateTodoObject(generatedID, titleBook, authBook, yearBook, isCompleted);

    books.push(todoObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
}

function makeBook(todoObject) {
    const textTitle = document.createElement('h3');
    textTitle.innerText = todoObject.title;

    const textAuthor = document.createElement('p');
    textAuthor.innerText = "Penulis: " + todoObject.author;

    const textYear = document.createElement('p');
    textYear.innerText = "Tahun: " + todoObject.year;

    const buttonS = document.createElement('button');
    const buttonC = document.createElement('button');
    const buttonD = document.createElement('button');

    buttonS.classList.add('bookItemIsCompleteButton');
    buttonC.classList.add('bookItemDeleteButton');
    buttonD.classList.add('bookItemEditButton');

    buttonS.innerText = "Selesai dibaca";
    buttonC.innerText = "Edit Buku";
    buttonD.innerText = "Hapus Buku";

    const actionContainer = document.createElement('div');
    actionContainer.append(buttonS, buttonC, buttonD);

    const textContainer = document.createElement('div');
    textContainer.classList.add('inner');
    textContainer.append(textTitle, textAuthor, textYear, actionContainer);

    const container = document.createElement('div');
    container.classList.add('item', 'shadow');
    container.append(textContainer);
    container.setAttribute('id', `book-${todoObject.id}`);

    return container;
}

document.addEventListener(RENDER_EVENT, function () {
    const incompleteBookList = document.getElementById('incompleteBookList');
    const completedBookList = document.getElementById('completeBookList');

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
