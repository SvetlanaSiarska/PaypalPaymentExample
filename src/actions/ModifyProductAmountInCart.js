import { MODIFY_PRODUCT_AMOUNT_IN_CART}  from './types.js'


const ModifyProductAmountInCart = (productInfo) => {
    return {
        type: MODIFY_PRODUCT_AMOUNT_IN_CART,
        payload: productInfo
    };
};

export default ModifyProductAmountInCart;