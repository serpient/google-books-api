import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import axios from 'axios';
import App from './App';
import BookCards from './components/BookCards';
import queryAPI from './utilities/queryAPI';
import Input from './components/Input';

jest.mock('axios');

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('saves user input correctly in state', () => {
  const wrapper = mount(<Input />);
  const input = wrapper.find('#query-input');
  input.instance().value = 'test';
  input.instance().name = 'input';
  input.simulate('change');
  expect(wrapper.state().input).toEqual('test')
})

describe('api calls', () => {
  let renderedComponent;
  const mockResults = { status: 200, data: { totalItems: 1, items: [{ volumeInfo: { title: 'test' } }] }} 
  const mockItems = mockResults.data.items;
  const mockError = { error: 500, response: { data: { error: { message: 'Test Error' }}}};
  beforeEach(() => { 
    renderedComponent = mount(<App />);
  })
  it('resets results before querying for new data', () => {
    axios.get.mockResolvedValueOnce(mockResults);
    renderedComponent.setState({ results: mockItems });
    renderedComponent.instance().handleSubmitQuery('test');
    expect(renderedComponent.state('results')).toEqual([])
  })
  
  it('with empty input, will not query for new data', () => {
    axios.get.mockResolvedValueOnce(mockResults);
    renderedComponent.setState({ results: mockItems });
    renderedComponent.instance().handleSubmitQuery('');
    expect(renderedComponent.state('results')).toEqual(mockItems)
    expect(renderedComponent.state('error')).toEqual('Please provide a search query first')
  })

  it('saves results to state after making successful query', () => {
    axios.get.mockResolvedValueOnce(mockResults);
    renderedComponent.instance().handleSubmitQuery('test').then(res => {
      expect(res).toEqual(mockResults);
      expect(renderedComponent.state('results')).toEqual(mockResults.data.items);
      expect(renderedComponent.state('error')).toEqual(false);
    });
  })

  it('sets error after failed query', () => {
    axios.get.mockRejectedValueOnce(mockError);
    renderedComponent.instance().handleSubmitQuery('test')
      .catch(err => {
        expect(err).toEqual(mockError);
        expect(renderedComponent.state('results')).toEqual([]);
        expect(renderedComponent.state('error')).toEqual(mockError.response.data.error.message);
      })
  })

  it('renders no book cards when results not empty', () => {
    renderedComponent.setState({ results: [] });
    renderedComponent.update();
    expect(renderedComponent.find(BookCards).length).toEqual(0);
  })

  it('renders book cards when results is not empty', () => {
    renderedComponent.setState({ results: mockItems });
    renderedComponent.update();
    expect(renderedComponent.find(BookCards).length).toEqual(1);
  })

  it('clearApp will remove book components and set error to false', () => {
    renderedComponent.setState({ results: mockItems });
    renderedComponent.update();
    renderedComponent.instance().clearApp();
    expect(renderedComponent.state('results')).toEqual([]);
    expect(renderedComponent.state('error')).toEqual(false);
  })

})