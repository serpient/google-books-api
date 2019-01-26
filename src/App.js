import React, { Component } from 'react';
import axios from 'axios';
import './App.scss';
import RenderBookCards from './components/RenderBookCards';
import NoResults from './components/NoResults';
import Loader from './components/Loader';
import Error from './components/Error';
import Input from './components/Input';

class App extends Component {
  constructor(props) {
    super(props);
    this.starterText = 'Nothing Here Yet - Try Searching For A Book!';
    this.nothingFoundText = 'Nothing Found! Try Another Query.';
    this.state = {
      loading: false,
      error: false,
      results: [],
      noResultsText: this.starterText,
    }
  }

  handleSubmitQuery = (input) => {
    if (input !== '') {
      this.setState({ loading: true, results: [] });
      this.queryAPI(input);
    } else {
      this.setState({ error: 'Please provide a search query first' })
    }
  }

  clearApp = () => {
    this.setState({ error: false, results: [] });
  }

  queryAPI = (input) => {
    console.log(input)
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
    let { results, error, loading, noResultsText } = this.state;
    return (
      <div className="App">
        <h1 className='app-title'>Book Finder</h1>
        <Input onSubmit={this.handleSubmitQuery} clearApp={this.clearApp} />
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
