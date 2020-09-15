// Book
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
// UI  
function UI() {};

UI.prototype.addBookToList = function (book) {

    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');

    row.innerHTML = `
   <td>${book.title}</td>
   <td>${book.author}</td>
   <td>${book.isbn}</td>
   <td><a href="#" class="delete">X</a></td>`;

    list.appendChild(row);
};

UI.prototype.showAlert = function (message, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const form = document.querySelector('#book-form');
    const container = document.querySelector('.container');
    container.insertBefore(div, form);

    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 1000);
};

UI.prototype.deleteBook = function (target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

UI.prototype.clearFields = function () {
    document.querySelector('#author').value = '';
    document.querySelector('#title').value = '';
    document.querySelector('#isbn').value = '';
};


document.querySelector('#book-form').addEventListener('submit', function (e) {
    const title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value;

    const book = new Book(title, author, isbn);

    const ui = new UI();


    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('Заполните все поля', 'error');
    } else {
        ui.addBookToList(book);
        ui.showAlert('Книга добавлена', 'success');
        ui.clearFields();

    }
    e.preventDefault();
})

document.querySelector('#book-list').addEventListener('click', function (e) {
    const ui = new UI();
    ui.deleteBook(e.target);
    if (e.target.className === 'delete') {
        ui.showAlert('Книга удалена', 'success');
    }
    e.preventDefault();
})