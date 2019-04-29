import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


import { AddProductToCart }  from '../actions/AddProductToCart'
import SelectProductDetailSize  from '../actions/SelectProductDetailSize'
import { SIZE_S, SIZE_M, SIZE_L, SIZE_XL}  from '../actions/types'
import { getSizeText } from '../helpers/'


class ProductDetail extends Component  {
   
   
    handleClick() {
        const { selectedProductsSizes } = this.props;
        const sizeSelected = selectedProductsSizes.filter((productSize)=> 
            productSize.id === this.props.id );
        if(sizeSelected.length===1) {
            this.props.AddProductToCart(this.props.id, sizeSelected[0].size);
            /*setTimeout(() => {
                this.props.RefreshAddButton();    
              }, 3000);  
              */
        }        
    }
    changeSize(e) {
        const size =  e.target.value;
        if(size!=="") {
            this.props.SelectProductDetailSize(this.props.id, size);
        }        
    }

    renderAddButton() {
        const { productAdded, productAddedID } = this.props;

        if(productAdded && productAddedID===this.props.id) 
            return (
            <div className="visible  content">Successfully added! </div>);
           
        else 
            return (                
                <div className="visible content">
                    <i className="shop icon"></i>
                </div>
            );
    }
    renderAddToCartButton() {

        const { productAdded, productAddedID } = this.props;
        let style = "ui vertical button";
        if(productAdded && productAddedID===this.props.id)
            style = "ui vertical positive button";
        
         
        return (
            <div className={style}  
                onClick={this.handleClick.bind(this, this.props.id)} >
                {this.renderAddButton()}
            </div>
        )
    }

    render() {
        const { selectedProductsSizes } = this.props;
        const productSizeSelected = selectedProductsSizes.filter((productSize)=> 
            productSize.id === this.props.id );
        let selectedSize = "";
        if(productSizeSelected.length===1) {
            selectedSize = productSizeSelected[0].size;
        }

        return (
            <div className="card">
            <div className="image">            
             <img alt="product_image"  
                className="ui image" 
                src={`./images/${this.props.image}`} />
            </div>
            <div className="content">
               
                <Link to={`/productdetail/${this.props.id}`} className="header" >
                {this.props.name}   
                <div className="ui tag label pricetag" >
                    {this.props.price} {this.props.currency}
                </div>
                </Link>
               
               
                <div className="description">
                    
                    <select onChange={this.changeSize.bind(this)} 
                            defaultValue={selectedSize}
                            className="ui  selection dropdown">
                        <option value="">Select size</option>
                        <option value={SIZE_S}>{getSizeText(SIZE_S)}</option>
                        <option value={SIZE_M}>{getSizeText(SIZE_M)}</option>
                        <option value={SIZE_L}>{getSizeText(SIZE_L)}</option>
                        <option value={SIZE_XL}>{getSizeText(SIZE_XL)}</option>
                    </select>                    
                </div>       
            </div>

            {this.renderAddToCartButton()}       
            
        </div>  );
     };
}
const mapStateToProps = (state) => {
    
    return {
      products: state.products,
      selectedProductsSizes: state.selectedProduct.sizes,
      productAdded: state.selectedProduct.productAdded,
      productAddedID: state.selectedProduct.productAddedID
    }
  }
export default connect(mapStateToProps, 
    {   AddProductToCart,
        SelectProductDetailSize})(ProductDetail);