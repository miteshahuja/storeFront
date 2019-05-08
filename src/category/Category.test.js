import renderer from 'react-test-renderer';
import React from 'react';
import Enzyme, { shallow } from 'enzyme'
//import Adapter from 'enzyme-adapter-react-16'
import ReactDOM from 'react-dom';
import CategoryTest from './Category';

import { connect } from "react-redux";



it('render correctly Category component', () => {
  const Category = renderer.create(connect(<CategoryTest />)).toJSON();
  expect(Category).toMatchSnapshot();
});