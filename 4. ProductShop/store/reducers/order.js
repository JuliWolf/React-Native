import * as actions from '../actions/order';
import Order from "../../models/order";

const initialState = {
    orders: []
}

export default (state = initialState, action) => {
    switch(action.type){
        case actions.ADD_ORDER:
            return addOrder(state, action);
        default:
            return state;
    }
}

const addOrder  = (state, action) => {
    const newOrder = new Order(
        new Date.toString(),
        action.orderData.items,
        action.orderData.amount,
        new Date()
    );

    return {
        ...state,
        orders: state.orders.concat(newOrder)
    }
}