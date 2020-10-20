import * as actions from '../actions/products';

import Product from "../../models/product";

const initialState = {
    availableProducts: [],
    userProducts: []
};

export default (state = initialState, action) => {
    switch(action.type){
        case actions.SET_PRODUCTS:
            return setProducts(state, action);
        case actions.DELETE_PRODUCT:
            return deleteProduct(state, action);
        case actions.CREATE_PRODUCT:
            return createProduct(state, action);
        case actions.UPDATE_PRODUCT:
            return updateProduct(state, action);
        default:
            return state;
    }
};

const setProducts = (state, action) => {
    return {
        availableProducts: action.products,
        userProducts: action.userProducts
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
    };
};

const createProduct = (state, action) => {
    const newProduct = new Product(
        action.productData.id,
        action.productData.ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
    );
    return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
    }
};

const updateProduct = (state, action) => {
    const productIndex = state.userProducts.findIndex(prod => prod.id === action.pid);
    const updatedProduct = new Product(
        action.pid,
        state.userProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[productIndex].price
    );
    const updatedUserProducts = [...state.userProducts];
    updatedUserProducts[productIndex] = updatedProduct;

    const availableProductIndex = state.availableProducts.findIndex(prod => prod.id === action.pid);
    const updatedAvailableProducts = [...state.availableProducts];
    updatedAvailableProducts[availableProductIndex] = updatedProduct;

    return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts
    }

};