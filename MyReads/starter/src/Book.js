import PropTypes from "prop-types";

const Book = ({book, changeShelf}) => {

  const handleChange = (event) => {
    changeShelf(book, event.target.value);
  };

  const shelfOptions = [
    { value: "currentlyReading", label: "Currently Reading" },
    { value: "wantToRead", label: "Want to Read" },
    { value: "read", label: "Read" },
    { value: "none", label: "None" },
  ];

    return <div className="book">
            <div className="book-top">
            {book?.imageLinks?.thumbnail ? (
  <div
    className="book-cover"
    style={{
      width: 128,
      height: 193,
      backgroundImage: `url(${book.imageLinks.thumbnail})`,
    }}
  ></div>
) : (
  <div 
    className="book-cover" 
    style={{ 
      width: 128, 
      height: 193, 
      display: 'flex', // Enables flexbox layout
      alignItems: 'center', // Centers items vertically
      justifyContent: 'center', // Centers items horizontally
      textAlign: 'center', // Centers text horizontally
    }}
  >
    <p>Thumbnail could not be found</p>
  </div>
)}
              <div className="book-shelf-changer">
              <select
            value={book.shelf ? book.shelf : "none"} // Check if book.shelf exists
            onChange={handleChange} // Use handleChange function
          >
            <option disabled>Move to...</option>
            {shelfOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {book.shelf === value ? '✓ ' : ''} {label}
              </option>
            ))}
          </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors && book.authors.length > 0
          ? book.authors.join(', ') // Concatenate authors with a comma and space
          : 'Unknown Author'}</div>
          </div>

}

Book.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string),
    imageLinks: PropTypes.shape({
      thumbnail: PropTypes.string,
    }),
    shelf: PropTypes.string,
  }).isRequired,
  changeShelf: PropTypes.func.isRequired,
};

export default Book;