import { ADD_PRODUCT_TO_CART, REFRESH_ADD_BUTTON, CLEAR_PAYMENT_INFO}  from './types.js'

export const AddProductToCart = (id, size) => {
    return function(dispatch, getState) {

    dispatch({
        type: CLEAR_PAYMENT_INFO
    });  
    dispatch({
        type: ADD_PRODUCT_TO_CART,
        payload: {id, size}
    });

    setTimeout(() => {
        dispatch({  type: REFRESH_ADD_BUTTON });
    }, 3000); 
       
    };
};

