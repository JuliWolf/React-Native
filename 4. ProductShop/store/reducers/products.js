import * as actions from '../actions/products';

import PRODUCTS from "../../data/dummy-data";

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
}

export default (state = initialState, action) => {
    switch(action.type){
        case actions.DELETE_PRODUCT:
            return deleteProduct(state, action);
        default:
            return state;
    }
};
const deleteProduct = (state, action) => {
    return {
        ...state,
        userProducts: state.userProducts.filter(product =>
            product.id !== action.pid
        ),
        availableProducts: state.userProducts.filter(product =>
            product.id !== action.pid
        )
    }
}
