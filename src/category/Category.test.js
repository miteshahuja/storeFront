import renderer from 'react-test-renderer';
import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ReactDOM from 'react-dom';
import CategoryTest from './Category';

import { connect } from "react-redux";
import configureStore from "redux-mock-store";
import promise from "redux-promise";

const items = { title: "testtitle", price: '25',  };
//create any initial state needed
const initialState =  { id: 1 , itemDetails: items};
// here it is possible to pass in any middleware if needed into //configureStore
const middlewares = [promise];
const mockStore = configureStore(middlewares);
const mockedCallback = () => Promise.resolve([]);

it('render correctly Category component', () => {
  const Category = renderer.create(connect(<CategoryTest />)).toJSON();
  expect(Category).toMatchSnapshot();
});

it('check prop title by default', () => {  
  let store = mockStore(initialState);
  const Category = mount(<CategoryTest store={store} />);
     expect(Category.find('.bannerText div:first-child').text()).toEqual('Plates');
 });