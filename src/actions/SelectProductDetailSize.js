import { PRODUCT_SIZE_SELECTED } from './types.js'


const SelectProductDetailSize = (id, size ) => {
    return {
        type: PRODUCT_SIZE_SELECTED,
        payload: {id, size}
    };
};

export default SelectProductDetailSize;