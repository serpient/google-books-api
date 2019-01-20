import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow, mount } from 'enzyme';

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

describe('before API calls, inputis checked and state is reset', () => {
  let renderedComponent;
  const mockResults = { totalItems: 1, items: [{ volumeInfo: { title: 'test' }}]};
  beforeEach(() => { 
    renderedComponent = shallow(<App />);
  })
  it('resets results before querying for new data', () => {
    renderedComponent.setState({ input: 'test', results: mockResults.items });
    renderedComponent.instance().handleSubmitQuery();
    expect(renderedComponent.state('results')).toEqual([])
  })
  
  it('with empty input, will not query for new data', () => {
    renderedComponent.setState({ input: '', results: mockResults.items });
    renderedComponent.instance().handleSubmitQuery();
    expect(renderedComponent.state('results')).toEqual(mockResults.items)
    expect(renderedComponent.state('error')).toEqual('Please provide a search query first')
  })
})


describe('api calls', () => {
  let renderedComponent;
  let queryFn;
  const mockResults = { totalItems: 1, items: [{ volumeInfo: { title: 'test' }}]};
  beforeAll(() => {
    queryFn = jest.fn()
      .mockImplementationOnce(() => ({
        status: 200,
        json: () => new Promise((resolve,reject) => {
          resolve(mockResults)
        })
      }))
      .mockImplementationOnce(() => ({
        status: 500,
      }))
    jest.mock(queryFn);
  })
  beforeEach(() => { 
    renderedComponent = shallow(<App />);
  })
  it('saves results to state after making successful query', () => {
    renderedComponent.instance().queryAPI('test');
    expect(renderedComponent.state('results')).toEqual(mockResults.items);
  })
  it('sets error after failed query', () => {
    renderedComponent.instance().queryAPI('test');
    expect(renderedComponent.state('error')).not.toEqual(false);
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
