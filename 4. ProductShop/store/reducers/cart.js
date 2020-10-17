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
        case actions.REMOVE_FROM_CART:
            return removeFromCart(state, action);
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
