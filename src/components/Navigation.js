import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Logo from './Logo'


class Navigation extends Component  {

    constructor(props) {
        super(props);
        this.state= {scrolling:false};
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }
    handleScroll(event) {       
        if (window.scrollY === 0 && this.state.scrolling === true) {
            this.setState({scrolling: false});
        }
        else if (window.scrollY !== 0 && this.state.scrolling !== true) {
            this.setState({scrolling: true});
        }        
    }

    renderFloatingLabel() {
        const { productsCart } = this.props;
        let cartItemsCount = 0; 
        console.log('productsCart', productsCart)
        for (const productInfo of productsCart) {
            cartItemsCount = cartItemsCount + productInfo.amount;            
        }
        if(cartItemsCount>0) 
            //return ( <div className="floating ui teal label">{cartItemsCount}</div>);
            return (<div className="ui teal circular label">{cartItemsCount}</div>);
    }
    
    renderOnlyMobileExample() {
        return (
        <React.Fragment>
         <div className="ui mobile only red label">Mobile</div>
        </React.Fragment>
        );
    }
    renderLogo() {
        if(!this.state.scrolling)
            return (
                <div content="hidden" className="header item">
                    <Logo/>                                           
                </div>
            );
    }
    render() {          
        return (
            <div className="ui borderless inverted main stackable menu">
                <div className="ui text container">
                    {this.renderLogo()}                   
                    <Link className="item" to="/">Products</Link>
                    <Link className="item" to="/shopingCart">Shopping Cart
                        {this.renderFloatingLabel()}
                    </Link>               
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    
    return {
        productsCart: state.shoppingCart.products
    }
  }
export default connect(mapStateToProps)(Navigation);
