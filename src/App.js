import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    }
  }
  
  handleUserInput = (e) => {
    let { value, name } = e.currentTarget;
    this.setState({ [name]: value });
  }

  render() {
    let { input } = this.state;
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
        { input }
      </div>
    );
  }
}

export default App;
