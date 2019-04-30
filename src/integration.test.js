import { storeFactory } from '../test/testUtils';
import { AddProductToCart } from './actions/AddProductToCart';
import { SIZE_S } from './actions/types';


describe('AddProductToCart action dispatcher', () => {
    let store;
    let initialState = {};
  
    beforeEach(() => {
        store = storeFactory(initialState);
        initialState = store.getState()
        // console.log('initialState', initialState);
    });
   
    test('add product into empty cart', () => {
        store.dispatch(AddProductToCart(1, SIZE_S));
        const newState = store.getState()
        const expectedState = {
        ...initialState,
        shoppingCart: [{id:1, size:SIZE_S, amount:1}],
        selectedProduct: {
            productAdded: true,
            productAddedID:1,
            selectedProduct: null,
            sizes: []
        }};
        expect(newState).toEqual(expectedState);
        
    });
    test('add product into empty cart and check, if the add button changes the state', () => {
        store.dispatch(AddProductToCart(1, SIZE_S));
        const newState = store.getState()
        
        setTimeout(() => {           
            const expectedState = {
                ...initialState,
                shoppingCart: [{id:1, size:SIZE_S, amount:1}],
                selectedProduct: {
                    productAdded: false,
                    productAddedID: -1,
                    selectedProduct: null,
                    sizes: []
                }};
                expect(newState).toEqual(expectedState);
        }, 3000);
    });
});  
 
describe('AddProductToCart action dispatcher', () => {
    let store;
    let initialState;
    const shoppingCart = [{id:2, size:SIZE_S, amount:3}];
    beforeEach(() => {
        store = storeFactory({shoppingCart});
        initialState = store.getState()
        //console.log('initialState', initialState);
    });
   
    test('add product to not empty cart', () => {
        store.dispatch(AddProductToCart(1, SIZE_S));
        const newState = store.getState()
        const expectedState = {
        ...initialState,
        shoppingCart: [...shoppingCart, {id:1, size:SIZE_S, amount:1}],
        selectedProduct: {
            productAdded: true,
            productAddedID:1,
            selectedProduct: null,
            sizes: []
        }};
        expect(newState).toEqual(expectedState);
    });
});  
 
