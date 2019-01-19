import React, { Component } from 'react';
import axios from 'axios';
import './App.scss';

const BookCards = ({ volumeInfo }) => {
  let { title, authors, imageLinks, infoLink, publisher } = volumeInfo;
  let thumbnailImg = imageLinks ? imageLinks.thumbnail : require('./assets/book_placeholder.png');
  let publisherText = publisher ? publisher : 'No publisher found';
  let authorText = authors && authors.length === 1 ? authors[0] : 'No authors found';

  return (
    <div className='book-card--container'>
      <img className='book-card--img' alt='book' src={thumbnailImg} />
      <div className='book-card--info'>
        <h2 className='book-card--title'>{title}</h2>
        <h3 className='book-card--subtext'>{`By: ${authorText}`}</h3>
        <h3 className='book-card--subtext'>{`Published By: ${publisherText}`}</h3>
      </div>
      <a 
        href={infoLink} 
        target='_blank' 
        rel="noopener noreferrer" 
        className='book-card--link'
      >
        See this Book
      </a>
    </div>
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      loading: false,
      error: false,
      results: [],
    }
  }

  handleSubmitQuery = (e) => {
    console.log('trigger')
    if (this.state.input !== '') {
      this.setState({ loading: true, results: [] });
      this.queryAPI();
    } else {
      this.setState({ error: 'Please provide a search query first' })
    }
  }

  handleUserInput = (e) => {
    e.preventDefault();
    let { value, name } = e.currentTarget;
    if (value === '') {
      this.clearApp();
    } else {
      this.setState({ [name]: value, error: false });
    }
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleSubmitQuery();
    } 
  }

  clearApp = () => {
    this.setState({ input: '', error: false, results: [] });
  }

  queryAPI = () => {
    let { input } = this.state;

    axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        key: 'AIzaSyCLJvxg85jgfaMwaORDzP9ECY83JCLXQtU',
        q: input,
        orderBy: 'relevance',
        maxResults: 20,
        fields: 'totalItems,items(volumeInfo(title,authors,imageLinks/thumbnail,infoLink,publisher))' 
      }
    })
    .then((res) => {
      let { data: { items, totalItems } } = res;
      let result = totalItems > 0 ? items : [];
      setTimeout(() => {
        this.setState({ loading: false, results: result });
      }, 200)
      
    })
    .catch((err) => {
      console.error(err);
      let { message } = err.response.data.error;
      this.setState({ error: message })
    })
  }

  renderCards = (resultsArray) => {
    return resultsArray.map((volumeInfo,idx) => {
      return <BookCards volumeInfo={volumeInfo.volumeInfo} key={idx} />
    })
  }

  render() {
    let { input, results, error, loading } = this.state;
    console.log(input);
    return (
      <div className="App">
        <h1 className='App-Title'>Let's Find Some Books!</h1>
        <input 
          id='query-input'
          type='search' 
          name='input' 
          value={input} 
          placeholder='Search by book title or author...'
          onChange={(e) => {this.handleUserInput(e)}} 
          onKeyDown={(e) => { this.handleKeyPress(e)}}
        />
        <button 
          className='query-btn'
          type='button'  
          onClick={(e) => {this.handleSubmitQuery(e)}} 
        >
          Search
        </button>
        { error && <div className='error-message'>{error}</div> }
        {
          loading && <div id='loader'><i className='fas fa-spinner'></i></div>
        }
        <section className='book-results'>
          {results.length > 0 ? this.renderCards(results) : null}
        </section>
      </div>
    );
  }
}

export default App;
