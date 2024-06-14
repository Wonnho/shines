document.addEventListener('DOMContentLoaded', function() {
    const books = [
        { title: 'Book 4', price: '$30' },
        { title: 'Book 5', price: '$15' },
        { title: 'Book 6', price: '$22' }
    ];
    const container = document.createElement('ul');
    books.forEach(book => {
        const listItem = document.createElement('li');
        listItem.textContent = `${book.title} - ${book.price}`;
        container.appendChild(listItem);
    });
    document.body.appendChild(container);
    const nextLink = document.createElement('a');
    nextLink.href = 'page3.html';
    nextLink.textContent = 'Next';
    document.body.appendChild(nextLink);
});
