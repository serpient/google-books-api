import React from 'react';
import './Input.scss';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    }
  }

  handleUserInput = (e) => {
    e.preventDefault();
    let { value, name } = e.currentTarget;
    if (value === '') {
      this.props.clearApp();
    } 
    this.setState({ [name]: value });
  }

  handleKeyPress = (e) => {
    let { input } = this.state;
    if (e.key === 'Enter') {
      this.props.onSubmit(input);
    } 
  }

  render() {
    let { input } = this.state;

    return (
      <>
        <input
          id='query-input'
          type='search'
          name='input'
          value={input}
          placeholder='Search by book title or author...'
          onChange={(e) => { this.handleUserInput(e) }}
          onKeyUp={(e) => { this.handleKeyPress(e) }}
        />
        <button
          className='query-btn'
          type='button'
          onClick={() => { this.props.onSubmit(input) }}
        >
          Search
        </button>
      </>
    )
  }
}

export default Input;