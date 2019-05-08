import React, { Component } from 'react';
import './Header.css';
import ACTIONS from "../modules/action";
import { connect } from "react-redux";

import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link, Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Clear';

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
    deleteItem: item => dispatch(ACTIONS.deleteItem(item)),
  });

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            itemsInCart: this.props.items?this.props.items:[]
        };
    }

    handleCartClick = event => {
        this.setState({
          anchorEl: event.currentTarget,
        });
      };

      handleCartClose = () => {
        this.setState({
          anchorEl: null,
        });
      };

      deleteFromCart = (itemToDelete) => {
        this.props.deleteItem(itemToDelete);
    }

      goToCart = () => {
        this.props.history.push("/cart");
        this.handleCartClose;
      }

    render() {

        const { classes, items } = this.props;
        const { anchorEl, itemsInCart } = this.state;
        const open = Boolean(anchorEl);
        const cartPopItemList = items.map((productItem, idx) => {
            
            return (<li className={classes.productBox} key={idx+productItem.itemDetails.title}>

                    <img src={process.env.PUBLIC_URL + '/media/'+productItem.itemDetails.image}/>
                    <div className="cartPopWrap">
                        <div className="brand">{productItem.itemDetails.brand}</div>
                        <div className="title"> {productItem.itemDetails.title}</div>
                        <div className="price">{productItem.itemDetails.price}</div>
                    </div>
                    <span> <DeleteIcon onClick={this.deleteFromCart.bind(this, productItem )}/></span>
                </li>)
        })
        return (
            <div className="Header">
                <div className="App-Logo">
                    <img src={process.env.PUBLIC_URL + '/media/logo.png'} alt="logo" />
                </div>
                <div className="App-MenuBar">
                    <ul>
                    <li><Link to="/">HOME</Link></li>
                    <li>SHOP</li>
                    <li>JOURNAL</li>
                    <li>MORE</li>
                    </ul>
                </div>
                <div className="App-Cart">
                <Button
                    aria-owns={open ? 'simple-popper' : undefined}
                    aria-haspopup="true"
                    variant="contained"
                    onClick={this.handleCartClick}
                    disabled = {items.length > 0?false:true}
                    >
                    MyCart({items.length})
                </Button>
                    <Popover
                        id="simple-popper"
                        open={open}
                        anchorEl={anchorEl}
                        onClose={this.handleCartClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        >
                        <div className="cartPopBox">
                            <ul>
                            {cartPopItemList}
                            </ul>
                            <button disabled={items.length > 0?false:true}><Link to="/cart">View Cart</Link></button>
                        </div>
                    </Popover>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Header));