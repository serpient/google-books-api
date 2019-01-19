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

it('makes query with correct user input', () => {

})

it('renders book cards when results is not empty', () => {
  
})

it('renders correct number of book cards to match results content', () => {
  
})

it('clearApp will remove book components and set error to false', () => {
  
})


it('after query, error will clear results', () => {
  
})
