import { combineReducers } from 'redux'

import { ADD_PRODUCT_TO_CART,
        PRODUCT_SIZE_SELECTED,
        MODIFY_PRODUCT_AMOUNT_IN_CART,
        MODIFY_PRODUCT_SIZE_IN_CART,
        ADD_PAYMENT_INFO,
        REFRESH_ADD_BUTTON,
        CLEAR_CART,
        CLEAR_PAYMENT_INFO
     } from '../actions/types'


const productReducer = () => {
    return [
        {id:1, name: 'Basic - white', image: 'elliot.jpg', price: 30, currency: 'CHF'},
        {id:5, name: 'Woman - white', image: 'elyse.png', price: 30, currency: 'CHF'},
        {id:2, name: 'Basic - black', image: 'elliot.jpg', price: 30, currency: 'CHF'},
        {id:4, name: 'Woman - black', image: 'elyse.png', price: 30, currency: 'CHF'},
        {id:3, name: 'Basic - red', image: 'elliot.jpg', price: 30, currency: 'CHF'},
        {id:6, name: 'Woman - red', image: 'elyse.png', price: 30, currency: 'CHF'}
    ]
};
const INITIAL_STATE_PAYMENT = {
    data: null,
    info: "",
    products: [],    
};

const paymentReducer = (state=INITIAL_STATE_PAYMENT, action) => {    
    switch(action.type) {
        case CLEAR_PAYMENT_INFO:
            state=INITIAL_STATE_PAYMENT;
            return {...state};
        case ADD_PAYMENT_INFO:
            const data = action.payload.payment;
            const info = action.payload.info;
            const products = action.payload.products;
            return {...state, data, info, products};
        default:
            return {...state};
    }
};

const INITIAL_STATE = {
    selectedProduct: null,
    sizes: [],
    productAdded: false,
    productAddedID: -1
};

const selectedProductReducer = (state=INITIAL_STATE, action) => {
    let size, id, productAdded, productAddedID;

    switch(action.type) {        
        case REFRESH_ADD_BUTTON:
            productAdded = false;
            productAddedID = -1;
            return {...state, productAdded, productAddedID }; 
        case PRODUCT_SIZE_SELECTED:
            size = action.payload.size;
            id = action.payload.id;
            const others = state.sizes.filter((item)=>item.id!==id);
            state.sizes= [...others];
            state.sizes.push({id, size});
            return {...state, sizes:[...state.sizes] }; 
        case ADD_PRODUCT_TO_CART:
            productAdded = true;
            productAddedID = action.payload.id; 
            return {...state, productAdded, productAddedID};   
        case CLEAR_CART:           
            return {...state, selectedProduct: null, sizes: []};  
        default: 
            return {...state};
    }
}


const shoppingCartReducer = (products=[], action) => {
    let size, id, itemExists, productInfo, updatedProducts;

    switch(action.type) {               
        case CLEAR_CART:           
            return []; 
        case ADD_PRODUCT_TO_CART:            
            id = action.payload.id;
            size = action.payload.size;           
            itemExists = products.filter((item)=> item.id===id && item.size===size);
            if (itemExists.length===1) {
                updatedProducts= products
                    .map((item)=> 
                    item.id===itemExists[0].id && item.size===itemExists[0].size ? 
                        {id:item.id, size:item.size, amount:(itemExists[0].amount+1)}: 
                        {id:item.id, size:item.size, amount:item.amount});

            } else {
                updatedProducts = [...products]
                updatedProducts.push({id, size, amount:1}); 
            }                
            return updatedProducts;
        case MODIFY_PRODUCT_SIZE_IN_CART:
            productInfo = action.payload.productInfo;
            const newSize = action.payload.newSize;
            itemExists = products.filter(
                (item)=> item.id===productInfo.id && item.size===newSize);
            if(itemExists.length>0) {
                updatedProducts = products
                    .map((item)=> 
                    item.id===itemExists[0].id && item.size===itemExists[0].size ? 
                        {id:item.id, size:item.size, amount:item.amount + productInfo.amount}: 
                        {id:item.id, size:item.size, amount:item.amount});
                        updatedProducts = products
                        .filter((item)=> 
                        !(item.id===productInfo.id && item.size===productInfo.size));
                           
            } else {
                updatedProducts = products
                    .map((item)=> 
                    item.id===productInfo.id && item.size===productInfo.size ? 
                        {id:item.id, size:newSize, amount:item.amount }: 
                        {id:item.id, size:item.size, amount:item.amount});
            }
            return updatedProducts;
        case MODIFY_PRODUCT_AMOUNT_IN_CART:
            productInfo = action.payload;
            itemExists = products.filter(
                (item)=> item.id===productInfo.id && item.size===productInfo.size);
            if (itemExists.length===1) {
                if( productInfo.amount>0) {
                    updatedProducts = products
                    .map((item)=> 
                    item.id===itemExists[0].id && item.size===itemExists[0].size ? 
                        {id:item.id, size:item.size, amount:productInfo.amount}: 
                        {id:item.id, size:item.size, amount:item.amount});
                } else {
                    updatedProducts = products
                    .filter((item)=> 
                     !(item.id===itemExists[0].id && item.size===itemExists[0].size ));                    
                }     
            }
            return updatedProducts;
        default: 
            return products;
    }
}


export default combineReducers( {
    products: productReducer,
    selectedProduct: selectedProductReducer,
    payment: paymentReducer,
    shoppingCart: shoppingCartReducer
})