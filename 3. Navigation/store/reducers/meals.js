import * as mealActions from '../actions/meals';
import {MEALS} from "../../data/dummy-data";

const initialState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favoriteMeals: []
}

const mealReducer = (state = initialState, action) => {
    switch(action.type){
        case mealActions.TOGGLE_FAVORITE:
            return toggleFavoriteHandler(state, action);
        default:
            return state;
    }
    return state;
}

function toggleFavoriteHandler(state, action){
    const existingIndex = state.favoriteMeals.findIndex(meal => meal.id === action.mealId);
    if(existingIndex > 0){
        const updatedFavMeals = [...state.favoriteMeals];
        updatedFavMeals.splice(existingIndex, 1);
        return {...state, favoriteMeals: updatedFavMeals}
    }else{
        return {...state, favoriteMeals: state.favoriteMeals.concat(
            state.meals.find(meal =>
                meal.id === action.mealId
            ))
        }
    }
}

export default mealReducer;