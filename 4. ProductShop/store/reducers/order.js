import * as actions from '../actions/order';
import Order from "../../models/order";

const initialState = {
    orders: []
}

export default (state = initialState, action) => {
    switch(action.type){
        case actions.SET_ORDERS:
            return setOrders(action);
        case actions.ADD_ORDER:
            return addOrder(state, action);
        default:
            return state;
    }
}

const setOrders = (action) => {
    return {
        orders: action.orders
    }
};

const addOrder  = (state, action) => {
    const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.amount,
        action.orderData.date
    );

    return {
        ...state,
        orders: state.orders.concat(newOrder)
    }
}