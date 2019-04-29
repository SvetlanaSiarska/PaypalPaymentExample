import React, { Component} from 'react'
import { connect } from 'react-redux'

import { getSizeText } from '../helpers/'



class PaymentInfo extends Component {

    renderPaymentInfo() {
        const { info } = this.props;
        return <div className="ui teal tag label" >{info}</div>
    }
    
    renderCheckOut() {

        const { productsPayment, products } = this.props;
        let cartItemsCount = 0; 
        let totalPrice = 0;
        let currency = "";

        for (const productInfo of productsPayment) {
            const filteredProducts = products.filter(product => product.id === productInfo.id);
            if(filteredProducts.length===1) {
                const product = filteredProducts[0];
                totalPrice = totalPrice + productInfo.amount * product.price;
                currency = product.currency;
                cartItemsCount = cartItemsCount + productInfo.amount;       
            }
        }        

        if(cartItemsCount>0)
            return (
                <div className="ui secondary menu">  
                    <div className="right menu">  
                    <div className="ui item">
                           Total price
                        </div>                      
                        <div className="ui item">
                            {totalPrice} {currency}
                        </div>
                    </div>
                </div>
            );
    }
    renderProducts() {
        const { productsPayment } = this.props;
        let cartItemsCount = 0; 
        for (const productInfo of productsPayment) {
            cartItemsCount = cartItemsCount + productInfo.amount;            
        } 
        if(cartItemsCount>0)
            return (
                <table className="ui celled table">
                <thead>
                    <tr>
                    <th>Product</th>
                    <th>Size</th>
                    <th>Count</th>
                    <th>Price</th>
                </tr></thead>
                <tbody>
                { 
                    productsPayment.map((productInfo , index)=> {
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
        let size = "";
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
                <img alt="product_image"                    
                    src={`./images/${product.image}`}
                    className="ui circular image" />
                    {product.name}
            </h4>
            </td>
            <td data-label="Age"> 
                {getSizeText(size)} 
            </td>
            <td data-label="Job">{amount}</td>
            <td data-label="Job">{price} {currency}</td>
            </tr>
        );
    }
    
    render() {
        return (
        <React.Fragment>         
            {this.renderPaymentInfo()}
            {this.renderProducts()}
            {this.renderCheckOut()}              
        </React.Fragment>
        )
    };
};

const mapStateToProps = (state) => {
  
    return {
      products: state.products,
      productsPayment: state.payment.products,
      data: state.payment.data,
      info: state.payment.info
    }
  }
  export default connect(mapStateToProps)(PaymentInfo);

