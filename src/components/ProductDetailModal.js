import React, { Component } from 'react'
import { connect } from 'react-redux'

import  Modal from './Modal'

class ProductDetailModal extends Component  {
    
    renderModalContent(image) {
        
        return (          
            <div className="image">     
                <img alt="product_image" 
                    className="ui image"  
                    src={`./../images/${image}`} />
            </div>
        );
    }
    render() {
        const { id } = this.props.match.params;
        const id_int = parseInt( id);
        const { products } = this.props;
        const filteredProducts = products.filter((p)=>p.id===id_int);

        if(filteredProducts.length>0) {
            const product = filteredProducts[0];
            return (
                <div>
                    <Modal 
                        title={product.name}
                        content={this.renderModalContent(product.image)}
                        onDismiss={()=>this.props.history.push('/')}
                    />
                </div>
            );           
        } else {
            return (
                <div>
                    <Modal 
                        title="Wrong product!"
                        onDismiss={()=>this.props.history.push('/')}
                    />
                </div>
            );       
        }
    }
   
}

const mapStateToProps = (state) => {    
    return {
      products: state.products,
    }
  }
export default connect(mapStateToProps)(ProductDetailModal);
