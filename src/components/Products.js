import React, {Component} from 'react'
import { connect } from 'react-redux'

import ProductDetail from './ProductDetail'

class Products extends Component {
   
  render() {
    const { products } = this.props;
    
    return (
          <div className="ui container cards">     
          {
            products.map( (product, index) => {  
              return (
                <ProductDetail 
                  key={index} 
                  name={product.name} 
                  image={product.image}
                  id={product.id}
                  price={product.price}
                  currency={product.currency}
                  />);
            }) 
          }               
          </div>           
      );
  }
};

const mapStateToProps = (state) => {  
  return {
    products: state.products,
  }
}
export default connect(mapStateToProps)(Products);