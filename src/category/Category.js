import React, { Component } from 'react';
import axios from "axios";
import './Category.css';

import ACTIONS from "../modules/action";
import { connect } from "react-redux";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "../modules/store";

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

const mapStateToProps = state => ({
  items: state.items
});

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(ACTIONS.addItem(item)),
  deleteItem: item => dispatch(ACTIONS.deleteItem(item.title)),
});

class Category extends Component {

    componentWillUpdate() {
        this.getProductList;
    }

    constructor(props) {
        super(props);

        this.state = {
            productList: []
        };


    }

     componentWillMount() {
        axios.get(process.env.PUBLIC_URL + '/products.json') // JSON File Path
          .then( response => {
            this.setState({
                productList: response.data
          });
        })
        .catch(function (error) {
          console.log(error);
        });

        }

    viewProdDetails = (item) => {
        console.log('e tem in viewDetails',item);
            var goToDetailObj = {
                selectedProduct: item      
              }
    
            this.props.history.push("/product", goToDetailObj);
        
        
    }



    addToCart = (itemToAdd) => {
        this.props.addItem(itemToAdd);
    }

    render() {

        const { classes } = this.props;
        const {productList} = this.state;

        const productsBoxItem = productList.map((productItem, index) => {
            return (<li className="productBox" key={index+productItem.title}>

                    <img src={process.env.PUBLIC_URL + '/media/'+productItem.image}/>
                    <div className="prodBrand">{productItem.brand}</div>
                    <div className="prodTitle"> {productItem.title}</div>
                    <div className="prodPrice">{productItem.price}</div>
                    <div className="hoverBox">
                        <button onClick={this.viewProdDetails.bind(this, productItem)}>View Details</button>
                        <button onClick={this.addToCart.bind(this, productItem)}>Add to Cart</button>
                    </div>
                    </li>)
        })
        return (
            <ReduxProvider store={reduxStore}>
            <div className="Category">
                <div className="catBanner">
                    <div>
                        <div className="bannerText">
                            <div>Plates</div>
                            <div>lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum</div>
                        </div>
                    </div>
                    
                </div>
                    <ul className="catList">{productsBoxItem}</ul>
                
            </div>
            </ReduxProvider>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
