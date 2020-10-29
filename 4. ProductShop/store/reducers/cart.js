import * as actions from '../actions/cart';
import CartItem from "../../models/cart-item";
import {ADD_ORDER} from "../actions/order";
import {DELETE_PRODUCT} from "../actions/products";

const initialState = {
    items: {},
    totalAmount: 0
}

export default (state = initialState, action) => {
    switch(action.type){
        case actions.ADD_TO_CART:
            return addToCart(state, action);
        case actions.REMOVE_FROM_CART:
            return removeFromCart(state, action);
        case ADD_ORDER:
            return initialState;
        case DELETE_PRODUCT:
            return deleteProductFromCart(state, action)
        default:
            return state
    }
};


const addToCart = (state, action) => {
    const addedProduct = action.product;
    const productPrice = addedProduct.price;
    const productTitle = addedProduct.title;
    const pushToken = addedProduct.pushToken;

    let cartItem;

    if(state.items[addedProduct.id]){
        cartItem = new CartItem(
            state.items[addedProduct.id].quantity + 1,
            productPrice,
            productTitle,
            pushToken,
            state.items[addedProduct.id].sum + productPrice
        );
    }else{
        cartItem = new CartItem(1, productPrice, productTitle, pushToken, productPrice);
    }
    return {
        ...state,
        items: {...state.items, [addedProduct.id]: cartItem},
        totalAmount: state.totalAmount + productPrice
    }
};

const removeFromCart = (state, action) => {
    const selectedCartItem = state.items[action.pid]
    const currentQuantity = selectedCartItem.quantity;
    let updatedCartItems;
    if(currentQuantity > 1){
        const updatedCartItem = new CartItem(
            selectedCartItem. quantity - 1,
            selectedCartItem.productPrice,
            selectedCartItem.productTitle,
            selectedCartItem.sum - selectedCartItem.productPrice
        );
        updatedCartItems = {...state.items, [action.pid]: updatedCartItem}
    }else{
        updatedCartItems = {...state.items};
        delete updatedCartItems[action.pid];
    }

    return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice
    }
};

const deleteProductFromCart = (state, action) => {
    if(!state.items[action.pid]){
        return state;
    }
    const updatedItems = {...state.items};
    const itemTotal = state.items[action.pid].sum;
    delete updatedItems[action.pid];

    return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal
    }
};
