import React, { useState, useEffect } from 'react';
import booksData from "./data.js";
import BookCard from "./book.js";
import Pagination from "./Pagination.js";
import "./style.css";

function App() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(19);

  useEffect(() => {
    // Use the imported data directly
    const booksWithStatus = booksData.map(book => ({ ...book, status: 'unread' }));
    setBooks(booksWithStatus);
  }, []);

  const handleToggleStatus = (bookKey) => {
    const updatedBooks = books.map(b => b.work.key === bookKey ? { ...b, status: b.status === 'read' ? 'unread' : 'read' } : b);
    setBooks(updatedBooks);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1); // Reset current page to 1 when searching
  };

  // Logic for pagination
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = books
    .filter(book => book.work.title && book.work.title.toLowerCase().includes(searchTerm))
    .slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <div className="search-bar">
        <input type="text" id="search-input" placeholder="Search books" value={searchTerm} onChange={handleSearch} />
      </div>
      <div className="books-list">
        {currentCards.map(book =>
          <BookCard key={book.key} book={book} onToggleStatus={handleToggleStatus} />
        )}
      </div>
      <Pagination
        cardsPerPage={cardsPerPage}
        totalCards={books.filter(book => book.work.title && book.work.title.toLowerCase().includes(searchTerm)).length}
        paginate={paginate}
      />
    </div>
  );
}

export default App;
