import React, { Component} from 'react'
import { connect } from 'react-redux'
import PaypalExpressBtn from 'react-paypal-express-checkout';

import ModifyProductAmountInCart from '../actions/ModifyProductAmountInCart'
import ModifyProductSizeInCart from '../actions/ModifyProductSizeInCart'
import AddPayment from '../actions/AddPayment'
import { SIZE_S, SIZE_M, SIZE_L, SIZE_XL}  from '../actions/types'
import { getSizeText } from '../helpers/'


class ShopingCart extends Component {

    addProduct(productInfo) {
       productInfo.amount = productInfo.amount +1;
       this.props.ModifyProductAmountInCart(productInfo) ;
    }
    removeProduct(productInfo) {        
        productInfo.amount = productInfo.amount - 1;
        this.props.ModifyProductAmountInCart(productInfo) ;
    }

    modifySize( productInfo, e) {
       const newSize =  e.target.value;
       console.log('newSize', newSize, productInfo);  
       this.props.ModifyProductSizeInCart(productInfo, newSize) ;
    }
    renderCheckOut() {

        const { productsCart, products } = this.props;
        let cartItemsCount = 0; 
        let totalPrice = 0;
        let currency = "";

        for (const productInfo of productsCart) {
            const filteredProducts = products.filter(product => product.id === productInfo.id);
            if(filteredProducts.length===1) {
                const product = filteredProducts[0];
                totalPrice = totalPrice + productInfo.amount * product.price;
                currency = product.currency;
                cartItemsCount = cartItemsCount + productInfo.amount;       
            }
        }        
        const onSuccess = (payment) => {
            // Congratulation, it came here means everything's fine!
                console.log("The payment was succeeded!", payment);
                this.props.AddPayment(payment, "The payment was succeeded!");
                this.props.history.push(`/paymentinfo`);              

            // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
        }
    
        const onCancel = (data) => {
            // User pressed "cancel" or close Paypal's popup!
            console.log('The payment was cancelled!', data);
            this.props.AddPayment(data, "The payment was cancelled!");
            this.props.history.push(`/paymentinfo`);
            // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
        }
    
        const onError = (err) => {
            // The main Paypal's script cannot be loaded or somethings block the loading of that script!
            console.log("Error!", err);
            this.props.AddPayment(null, "Error!");
            this.props.history.push(`/paymentinfo`);
            // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
            // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
        }
    
        let env = 'sandbox'; // you can set here to 'production' for production
        // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/
    
        const client = {
            sandbox: 'ARyaKlBmQUvMg7pXWu_8hKp8fWY8Ns7HMcpWCJwEnJuSC0HP9Ho_zJw73Ytt1CR96q6GclJTUz-dW8Ik',
            production: 'YOUR-PRODUCTION-APP-ID',
        }

        if(cartItemsCount>0)
            return (
                <div className="ui secondary menu">  
                    <div className="right menu">
                        <div className="ui item">
                            
                            <PaypalExpressBtn 
                                    env={env} 
                                    client={client} 
                                    currency={currency} 
                                    total={totalPrice} 
                                    onError={onError} 
                                    onSuccess={onSuccess} 
                                    onCancel={onCancel} />                               
                            
                        </div>
                        <div className="ui item">
                            {totalPrice} {currency}
                        </div>
                    </div>
                </div>
            );
    }
    renderProducts() {
        const { productsCart } = this.props;
        let cartItemsCount = 0; 
        for (const productInfo of productsCart) {
            cartItemsCount = cartItemsCount + productInfo.amount;            
        } 
        if(cartItemsCount>0)
            return (
                <table className="ui celled table">
                <thead>
                    <tr>
                    <th>Product</th>
                    <th>Size</th>
                    <th>Amount</th>
                    <th>Adjust</th>
                    <th>Price</th>
                </tr></thead>
                <tbody>
                { 
                    productsCart.map((productInfo , index)=> {
                        return this.renderProductInfo(productInfo, index);
                    })
                }               
                </tbody>
            </table>
            );
    }
    renderProductInfo(productInfo, index) {
        const { products } = this.props;
        
        const filteredProducts = products.filter(product => product.id === productInfo.id);
        let product = null;
        let size = SIZE_S;
        let amount = 0 ;
        let price = 0;
        let currency = "";
        if(filteredProducts.length===1) {
            product = filteredProducts[0];
            size = productInfo.size;
            amount = productInfo.amount;
            price = productInfo.amount * product.price;
            currency = product.currency;
        }            

        if(product)
            return (
                <tr key={index}>
                    <td data-label="Name">
                    <h4 className="ui header">
                        <img alt="Product_image"
                        src={`./images/${product.image}`}
                        className="ui circular image" />
                            {product.name}
                    </h4>
                    </td>
                    <td data-label="Age"> 
                            <select defaultValue={size} 
                                    className="ui compact selection dropdown"
                                    onChange={this.modifySize.bind(this, productInfo)} >
                                <option value={SIZE_S}>{getSizeText(SIZE_S)}</option>
                                <option value={SIZE_M}>{getSizeText(SIZE_M)}</option>
                                <option value={SIZE_L}>{getSizeText(SIZE_L)}</option>
                                <option value={SIZE_XL}>{getSizeText(SIZE_XL)}</option>
                            </select>
                    </td>
                    <td data-label="Job">{amount}</td>
                    <td data-label="Job">
                            <div className="ui button"  
                                onClick={this.addProduct.bind(this, productInfo)} >+</div>
                            <div className="ui button"
                                onClick={this.removeProduct.bind(this, productInfo)}>-</div></td>
                    <td data-label="Job">{price} {currency}</td>
                </tr>
            );
    }
    renderNoProducts() {
        const { productsCart } = this.props;
        let cartItemsCount = 0; 
        for (const productInfo of productsCart) {
            cartItemsCount = cartItemsCount + productInfo.amount;            
        } 
        if(cartItemsCount===0)
            return (
                <div className=" right aligned">
                    <p>No products in shoping cart!</p>
                </div>

            );           
    }
    render() {

        return (
            <React.Fragment >                   
                {this.renderProducts()}
                {this.renderNoProducts()}
                {this.renderCheckOut()}        
            </React.Fragment>
        )
    };
};

const mapStateToProps = (state) => {
  
    return {
      products: state.products,
      productsCart: state.shoppingCart.products
    }
  }
  export default connect(mapStateToProps, 
        {   ModifyProductAmountInCart,
            ModifyProductSizeInCart,
            AddPayment})(ShopingCart);

