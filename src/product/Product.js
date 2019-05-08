import React, { Component } from 'react';
import './Product.css';
import ACTIONS from "../modules/action";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  items: state.items
});

const mapDispatchToProps = (dispatch) => ({
  addItem: item => dispatch(ACTIONS.addItem(item))
});

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.location.state.selectedProduct,
            quantity: 0
        };
    }

    getProdCount = (e) => {
        console.log("prod count",e.currentTarget.value);
        this.setState({
            quantity:e.currentTarget.value,
        })
    }

    addToCart =(itemToAdd) => {
        console.log("cart add", itemToAdd)
        this.props.addItem(itemToAdd);
    }
    render() {
        const {item, quantity} = this.state;
        const {classes} = this.props;

        return (
            <div className="Product">
                <div className="productTitleBar">HOME / PLATES / <span>{item.title}</span></div>
                <div className="detailsWrapper">
                    <div className="imageBox">
                        <img src={process.env.PUBLIC_URL +'/media/' + item.image}/>
                    </div>
                    <div className="detailsBox">
                        <div className="detailBrand">{item.brand}</div>
                        <div className="detailTitle">{item.title}</div>
                        <div className="detailPrice">{item.price}</div>
                        <div className="detailDesc">{item.description}</div>
                        <div className="detailBtnBox">
                            <input type='number' onChange={this.getProdCount} min="1"/>
                            <button onClick={this.addToCart.bind(this, item)}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
