import { ADD_PRODUCT_TO_CART, REFRESH_ADD_BUTTON}  from './types.js'


export const AddProductToCart = (id, size) => {
    return {
        type: ADD_PRODUCT_TO_CART,
        payload: {id, size}
    };
};

export const RefreshAddButton = () => {
    return {
        type: REFRESH_ADD_BUTTON
    };
};

