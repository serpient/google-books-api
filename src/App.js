import React, { Component } from 'react';
import axios from 'axios';
import './App.scss';
import RenderBookCards from './components/RenderBookCards';
import NoResults from './components/NoResults';
import Loader from './components/Loader';
import Error from './components/Error';

class App extends Component {
  constructor(props) {
    super(props);
    this.starterText = 'Nothing Here Yet - Try Searching For A Book!';
    this.nothingFoundText = 'Nothing Found! Try Another Query.';
    this.state = {
      input: '',
      loading: false,
      error: false,
      results: [],
      noResultsText: this.starterText,
    }
  }

  handleSubmitQuery = (e) => {
    if (this.state.input !== '') {
      this.setState({ loading: true, results: [] });
      this.queryAPI(this.state.input);
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

  queryAPI = (input) => {
    return axios.get('https://www.googleapis.com/books/v1/volumes', {
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
      this.setState({ loading: false, results: result, noResultsText: this.nothingFoundText });
      return res;
    })
    .catch((err) => {
      console.error(err);
      let { message } = err.response.data.error;
      this.setState({ error: message })
      return err;
    })
  }

  render() {
    let { input, results, error, loading, noResultsText } = this.state;
    return (
      <div className="App">
        <h1 className='app-title'>Book Finder</h1>
        <input 
          id='query-input'
          type='search' 
          name='input' 
          value={input} 
          placeholder='Search by book title or author...'
          onChange={(e) => {this.handleUserInput(e)}} 
          onKeyDown={(e) => {this.handleKeyPress(e)}}
        />
        <button 
          className='query-btn'
          type='button'  
          onClick={(e) => {this.handleSubmitQuery(e)}} 
        >
          Search
        </button>
        { error && <Error error={error} /> }
        { loading && <Loader /> }
        <section className='book-results'>
          {results.length > 0 && <RenderBookCards array={results} />}
          {results.length === 0 && !loading && <NoResults text={noResultsText} />}
        </section>
      </div>
    );
  }
}

export default App;
