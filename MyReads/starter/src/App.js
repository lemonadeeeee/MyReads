import "./App.css";

import { useState , useEffect} from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import ListBooks from "./ListBooks";
import SearchBook from "./SearchBook.js";
import * as BooksAPI from "./BooksAPI";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res);
    };

    getBooks();
  }, []);

  const findInBooks = (bookId) => {
    for (let i = 0; i < books.length; i++) {
      if(books[i].id == bookId){
        return i;
      }
    }
    return -1;
  };

  const changeShelf = (book, shelf) => {

    book.shelf = shelf;
    BooksAPI.update(book, shelf).then(() => {
      setBooks([...books.filter((b) => b.id !== book.id), book]);
    });
};

  const searchQuery = async (query) => {
    if (!query) {
        return [];
    }

    try {
        const searchBooks = await BooksAPI.search(query, 20);
        if (!searchBooks || searchBooks.length === 0) {
            return [];
        }

        return Array.isArray(searchBooks) ? searchBooks : []; // Ensure it's always an array
    } catch (error) {
        console.error("Error fetching search results:", error);
        return []; // Return an empty array on error
    }
};

  return (
    // <div className="app">
    <Routes>
      <Route
        exact
        path="/"
        element={
          <ListBooks 
          books={books}
          changeShelf={changeShelf}
           />
        }
      />
      <Route
        path="/search"
        element={
          <SearchBook
            searchQueryFunc={searchQuery}
            changeShelf={changeShelf}
            books = {books}
          />
        }
      />
    </Routes>
    // </div>
  );

}

export default App;
