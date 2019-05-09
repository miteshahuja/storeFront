import React, { Component } from 'react';
import './Cart.css';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core';
import ACTIONS from "../modules/action";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "../modules/store";
import DeleteIcon from '@material-ui/icons/Clear';

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

const style= theme => {
    productBox: {
        textAlign: 'center'
    }
}
const mapStateToProps = state => ({
    items: state.items
  });

  const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(ACTIONS.addItem(item)),
    deleteItem: item => dispatch(ACTIONS.deleteItem(item.title)),
  });
class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemsInCart: this.props.items?this.props.items:[]
        };
    }

    deleteFromCart = (itemToDelete) => {
        this.props.deleteItem(itemToDelete);
    }

    render() {
        const {itemsInCart} = this.state;
        const { classes, items } = this.props;
        const shoppingList = items.map((productItem, idx) => {
            
            return (<li className={classes.productBox} key={idx+productItem.itemDetails.title}>

                    <img src={process.env.PUBLIC_URL + '/media/'+productItem.itemDetails.image}/>
                    <div className="cartWrap">
                        <div className="brand">{productItem.itemDetails.brand}</div>
                        <div className="title"> {productItem.itemDetails.title}</div>
                        <div className="price">{productItem.itemDetails.price}</div>
                        <DeleteIcon className="icons" onClick={this.deleteFromCart.bind(this, productItem.itemDetails)}/>
                    </div>
                </li>)});
        return (
            <ReduxProvider store={reduxStore}>
            <div className="Cart">
                <h1>Shopping Cart</h1>
                <div className="shoppingList">
                    <ul>{shoppingList}</ul>
                </div>
            </div>
            </ReduxProvider>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Cart));
