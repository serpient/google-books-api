import React, { Component } from 'react';
import axios from 'axios';
import './App.scss';

const BookCards = ({ volumeInfo }) => {
  if (!volumeInfo) { return null }
  let { title, authors, imageLinks, infoLink, publisher } = volumeInfo;
  let { thumbnail } = imageLinks;
  console.log({ title, authors, thumbnail, infoLink, publisher });
  let stringAuthor = authors.length === 1 ? authors[0] : authors.join(', ');
  return (
    <div className='book-card--container'>
      <img className='book-card--img' alt='book' src={thumbnail} />
      <div className='book-card--info'>
        <h2 className='book-card--title'>{title}</h2>
        <h3 className='book-card--subtext'>{stringAuthor}</h3>
        <h3 className='book-card--subtext'>{publisher}</h3>
      </div>
      <a href={infoLink} _target='blank' className='book-card--link'>See this Book</a>
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
        maxResults: 2,
        fields: 'totalItems,items(volumeInfo(title,authors,imageLinks/thumbnail,infoLink,publisher))' 
      }
    })
    .then((res) => {
      let { data: { items, totalItems } } = res;
      totalItems > 0 ? this.setState({ results: items }) : this.setState({ results: [] });
    })
    .catch((err) => {
      console.error(err);
      let { message } = err.response.data.error;
      this.setState({ error: message })
    })
  }

  renderCards = () => {
    let { results } = this.state;
    return results.map((volumeInfo,idx) => {
      return <BookCards volumeInfo={volumeInfo.volumeInfo} key={idx} />
    })
  }
  
  render() {
    let { input, results, error } = this.state;
    let bookCards = results.length > 0 ? null : this.renderCards();
    console.log(results.length);
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
        <section className='book-results'>
          {bookCards}
        </section>
      </div>
    );
  }
}

export default App;
