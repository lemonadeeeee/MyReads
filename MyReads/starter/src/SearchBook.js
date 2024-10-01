import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import debounce from 'lodash.debounce'

import Book from "./Book"

const SearchBook = ({searchQueryFunc, changeShelf, books}) => {
    const [query, setQuery] = useState("");
    const [searchBooks, setSearchBooks] = useState([])

    const findInBooks = (bookId) => {
      for (let i = 0; i < books.length; i++) {
        if(books[i].id == bookId){
          return i;
        }
      }
      return -1;
    };

    useEffect(() => {
      const fetchBooks = async () => {
        if (query.trim() === '') {
          setSearchBooks([]); // Clear books when query is empty
          return;
      }

          const results = await searchQueryFunc(query.trim());
          for (let i=0; i<results.length;i++){
            var arrId = findInBooks(results[i].id);
            if (arrId == -1){
              results[i].shelf = "none";
            }
            else{
              results[i].shelf = books[arrId].shelf;
            }
          }

          console.log('====>', query);

          setSearchBooks(results); // Update the state with the fetched results
      };

      const debouncedFetchBooks = debounce(fetchBooks, 1000);

      debouncedFetchBooks();

      return () => {
        debouncedFetchBooks.cancel();
    };
}, [query, searchQueryFunc, books]);

    const updateQuery = (query) => {
        setQuery(query);
      };

    const handleShelfChange = (book, shelf) => {
      changeShelf(book, shelf);
      const updatedBooks = searchBooks.map(b =>
        b.id === book.id ? { ...b, shelf } : b
      );
      setSearchBooks(updatedBooks);
    };

    return (<div className="search-books">
          <div className="search-books-bar">
            <Link
              className="close-search"
              to = "/"
            >
              Close
            </Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                value={query}
                onChange={(event) => updateQuery(event.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
          <ol className="books-grid">
          {Array.isArray(searchBooks) && searchBooks.length > 0 ? (
            searchBooks.map((book) => (
              <li key={book.id} className="book-list-item">
                <Book book={book} changeShelf={handleShelfChange} />
              </li>
            ))
          ) : (
            <div>
  {query === '' ? (
    'Type a query to start searching'
  ) : (
    'No book matches the entered query. Change your query and try again'
  )}
</div>
          )}
        </ol>
          </div>
</div>);
}

SearchBook.propTypes = {
  searchQueryFunc: PropTypes.func.isRequired, // Function to fetch books based on query
  changeShelf: PropTypes.func.isRequired, // Function to change the shelf of a book
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      authors: PropTypes.arrayOf(PropTypes.string),
      imageLinks: PropTypes.shape({
        thumbnail: PropTypes.string,
      }),
      shelf: PropTypes.string,
    })
  ).isRequired,
};

export default SearchBook;