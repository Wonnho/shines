document.addEventListener('DOMContentLoaded', function() {
    const books = [
        { title: 'Book 7', price: '$32' },
        { title: 'Book 8', price: '$27' }     
    ];
    const container = document.createElement('ul');
    books.forEach(book => {
        const listItem = document.createElement('li');
        listItem.textContent = `${book.title} - ${book.price}`;
        container.appendChild(listItem);
    });
    document.body.appendChild(container);
    document.body.appendChild(nextLink);
});
