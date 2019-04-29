import { ADD_PAYMENT_INFO, CLEAR_CART}  from './types.js'

export const AddPayment = (payment, info) => {
    return function(dispatch, getState) {
      const products = [...getState().shoppingCart];
      
      dispatch({
        type: ADD_PAYMENT_INFO,
        payload: {payment, info, products}
      }); 
      dispatch({
        type: CLEAR_CART
      });  
    };
  };
  
export default AddPayment;