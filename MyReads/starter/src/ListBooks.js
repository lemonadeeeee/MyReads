import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Book from "./Book"

const ListBooks = ({books, changeShelf}) => {

    const filteredBooks = (shelf) => {
      return books.filter((book) => book.shelf == shelf);
    };

    return (<div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                  {
            filteredBooks("currentlyReading").map((book) => (
              <li key={book.id} className="book-list-item">
                <Book book={book} changeShelf={changeShelf}/>
              </li>
            )) 
          }
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                  {
            filteredBooks("wantToRead").map((book) => (
              <li key={book.id} className="book-list-item">
                <Book book={book} changeShelf={changeShelf}/>
              </li>
            )) 
          }
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                  {
            filteredBooks("read").map((book) => (
              <li key={book.id} className="book-list-item">
                <Book book={book} changeShelf={changeShelf}/>
              </li>
            )) 
          }
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>);

};

ListBooks.propTypes = {
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
  changeShelf: PropTypes.func.isRequired,
};
  
  export default ListBooks;