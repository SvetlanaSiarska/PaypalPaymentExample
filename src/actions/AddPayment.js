import { ADD_PAYMENT_INFO}  from './types.js'


const AddPayment = (payment, info) => {
    return {
        type: ADD_PAYMENT_INFO,
        payload: {payment, info}
    };
};

export default AddPayment;