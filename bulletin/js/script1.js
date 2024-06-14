document.addEventListener('DOMContentLoaded', function() {
    const books = [
        { title: 'Book 1', price: '$10' },
        { title: 'Book 2', price: '$15' },
        { title: 'Book 3', price: '$20' }
    ];
    const container = document.createElement('ul');
    books.forEach(book => {
        const listItem = document.createElement('li');
        listItem.textContent = `${book.title} - ${book.price}`;
        container.appendChild(listItem);
    });
    document.body.appendChild(container);
    const nextLink = document.createElement('a');
    nextLink.href = 'page2.html';
    nextLink.textContent = 'Next';
    document.body.appendChild(nextLink);
});
