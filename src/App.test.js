import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow, mount } from 'enzyme';
import axios from 'axios';

jest.mock('axios');

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('saves user input correctly in state', () => {
  const wrapper = mount(<App />);
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
    renderedComponent = shallow(<App />);
  })
  it('resets results before querying for new data', () => {
    axios.get.mockResolvedValue(mockResults);
    renderedComponent.setState({ input: 'test', results: mockItems });
    renderedComponent.instance().handleSubmitQuery();
    expect(renderedComponent.state('results')).toEqual([])
  })
  
  it('with empty input, will not query for new data', () => {
    axios.get.mockResolvedValue(mockResults);
    renderedComponent.setState({ input: '', results: mockItems });
    renderedComponent.instance().handleSubmitQuery();
    expect(renderedComponent.state('results')).toEqual(mockItems)
    expect(renderedComponent.state('error')).toEqual('Please provide a search query first')
  })
  
  it('saves results to state after making successful query', () => {
    axios.get.mockResolvedValue(mockResults);
    renderedComponent.instance().queryAPI('test').then(res => {
      expect(res).toEqual(mockResults);
      expect(renderedComponent.state('results')).toEqual(mockResults.data.items);
    });
  })

  it('sets error after failed query', () => {
    axios.get.mockRejectedValue(mockError);
    renderedComponent.instance().queryAPI('test')
      .catch(err => {
        expect(err).toEqual(mockError);
        expect(renderedComponent.state('error')).toEqual(mockError.response.data.error.message);
      })
  })
})

it('renders book cards when results is not empty', () => {
  
})

it('renders correct number of book cards to match results content', () => {
  
})

it('clearApp will remove book components and set error to false', () => {
  
})


it('after query, error will clear results', () => {
  
})
