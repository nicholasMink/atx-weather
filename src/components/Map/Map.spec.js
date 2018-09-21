import React from 'react';
import {shallow} from 'enzyme';
import GoogleMapReact from 'google-map-react';
import Map, { TipText } from './Map';

describe('Map', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Map />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render 1 <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

  // it('should render the GoogleMapReact Component', () => {
  //   expect(wrapper.containsMatchingElement(<GoogleMapReact />)).toEqual(true);
  // });

  // it('should render the TipText Component', () => {
  //   expect(wrapper.containsMatchingElement(<TipText />)).toEqual(true);
  // });
});