import { MODIFY_PRODUCT_SIZE_IN_CART}  from './types.js'


const ModifyProductSizeInCart = (productInfo, newSize) => {
    return {
        type: MODIFY_PRODUCT_SIZE_IN_CART,
        payload: {productInfo, newSize}
    };
};

export default ModifyProductSizeInCart;