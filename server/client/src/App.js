import React from "react";
import './App.css';
import axios from 'axios';

function App() {
   let [data, setData] = React.useState({
    bookID: '',
    bookTitle: '',
    bookAuthor: '',
  });

  function handleInputChange(e) {
    setData({
      bookID: e.target.name === "bookID" ? e.target.value : data.bookID,
      bookTitle: e.target.name === "bookTitle" ? e.target.value : data.bookTitle, 
      bookAuthor: e.target.name === "bookAuthor" ? e.target.value : data.bookAuthor
    });
  };


  let [dataA, setDataA] = React.useState([{
    bookID: '',
    bookTitle: '',
    bookAuthor: '',
  }]);

  function click() {
    axios
    .get('http://localhost:8000/get/books')
    .then((data) => setDataA(data))
    .then(()=> console.log(dataA))
    .catch(err => {
      console.error(err);
    });

  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(data);
    const { bookID, bookTitle, bookAuthor } = data;

    const book = {
      bookID,
      bookTitle,
      bookAuthor,
    };

    axios
      .post('http://localhost:8000/book', book)
      .then(() => console.log('Book Created', book))
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div className="App">
           <div>
        <br />
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div style={{ width: '30%' }} className="form-group">
              <input
                type="text"
                className="form-control"
                name="bookID"
                placeholder="Book ID"
                onChange={handleInputChange}
              />
            </div>
            <br />
            <div style={{ width: '30%' }} className="form-group">
              <input
                type="text"
                className="form-control"
                name="bookTitle"
                placeholder="Book Title"
                onChange={handleInputChange}
              />
            </div>
            <br />
            <div style={{ width: '30%' }} className="form-group">
              <input
                type="text"
                className="form-control"
                name="bookAuthor"
                placeholder="Book Author"
                onChange={handleInputChange}
              />
            </div>
            <br />
            <div style={{ width: '30%' }}>
              <button className="btn btn-success" type="submit">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <button onClick={click}>SHOW</button>
      </div>
      {dataA.data  && dataA.data.map(e =>{
        return (<div>{e.bookTitle}</div>)
      })}
    </div>
  );
}

export default App;
