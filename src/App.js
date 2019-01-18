import React, { Component } from 'react';
import axios from 'axios';
import './App.scss';

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

  handleUserInput = (e) => {
    let { value, name } = e.currentTarget;
    this.setState({ [name]: value }, () => {
      if (this.state.input !== '') {
        this.queryAPI();
      } else {
        this.clearApp();
      }
    });
  }

  clearApp = () => {
    this.setState({ error: false, results: [] });
  }

  queryAPI = () => {
    let { input } = this.state;

    axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        key: 'AIzaSyCLJvxg85jgfaMwaORDzP9ECY83JCLXQtU',
        q: input,
        orderBy: 'relevance',
        maxResults: 30,
        fields: 'items(volumeInfo(title,authors,imageLinks/thumbnail,infoLink,publisher))' 
      }
    })
    .then((res) => {
      let { items, totalItems } = res.data;
      totalItems > 0 ? this.setState({ results: items }) : this.setState({ results: [] });
    })
    .catch((err) => {
      console.error(err);
      let { message } = err.response.data.error;
      this.setState({ error: message })
    })

  }
  render() {
    let { input, results, error } = this.state;
    return (
      <div className="App">
        <h1 className='App-Title'>Let's Find Some Books!</h1>
        <input 
          className='query-input' 
          type='search' 
          name='input' 
          value={input} 
          placeholder='Search by book title or author...'
          onChange={(e) => {this.handleUserInput(e)}} 
        />
        { error && <div className='error-message'>{error}</div> }
      </div>
    );
  }
}

export default App;
