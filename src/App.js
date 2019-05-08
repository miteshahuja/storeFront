import React, { Component } from 'react';
import { Link, Route, withRouter, Switch} from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Category from "./category/Category";
import Cart from "./cart/Cart";
import Product from "./product/Product";
import Header from "./header/Header";

import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./modules/store";

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        item: this.props.location? this.props.location.state.selectedProduct:'',
        quantity: 0
    };
}

  render() {
    return (
      <ReduxProvider store={reduxStore}>
      <Router>
      <div className="App">
        <div>
          <header className="App-header">
            <Header></Header>
            
          </header>
          
          <Route exact path="/" render={(props) => <Category {...props}/>}/>
          <Route path="/cart" render={(props) => <Cart {...props}/>}/>
          <Route path="/product" render={(props) => <Product {...props}/>}/>
          </div>
        
      </div>
      </Router>
      </ReduxProvider>
    );
  }
}

export default App;
