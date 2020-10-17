import * as actions from '../actions/cart';
import CartItem from "../../models/cart-item";

const initialState = {
    items: {},
    totalAmount: 0
}

export default (state = initialState, action) => {
    switch(action.type){
        case actions.ADD_TO_CART:
            return addToCart(state, action);
        default:
            return state
    }
};


const addToCart = (state, action) => {
    const addedProduct = action.product;
    const productPrice = addedProduct.price;
    const productTitle = addedProduct.title;

    let cartItem;

    if(state.items[addedProduct.id]){
        cartItem = new CartItem(
            state.items[addedProduct.id].quantity + 1,
            productPrice,
            productTitle,
            state.items[addedProduct.id].sum + productPrice
        );
    }else{
        cartItem = new CartItem(1, productPrice, productTitle, productPrice);
    }
    return {
        ...state,
        items: {...state.items, [addedProduct.id]: cartItem},
        totalAmount: state.totalAmount + productPrice
    }
};
