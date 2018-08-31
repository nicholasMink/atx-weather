import React from 'react';
import {shallow} from 'enzyme';
import App from './App';
import Stats from '../Stats/Stats';

describe('App', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('should render the Calculator Component', () => {
    expect(wrapper.containsMatchingElement(<Stats />)).toEqual(true);
  });
});