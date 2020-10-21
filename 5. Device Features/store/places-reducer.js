import * as actions from './places-actions';

import Place from "../models/Place";

const initialState = {
    places: []
}
export default (state = initialState, action) => {
    switch (action.type){
        case actions.ADD_PLACE:
            return addPlace(state, action);
        case actions.SET_PLACES:
            return fetchPlaces(state, action);
        default:
            return state;
    }
}


const addPlace = (state, action) => {
    const newPlace = new Place(
        action.placeData.id,
        action.placeData.title,
        action.placeData.image
    );
    return {
        places: state.places.concat(newPlace)
    }
};

const fetchPlaces = (state, action) => {
    return {
        places: action.places.map(pl => new Place(pl.id, pl.title, pl.imageUri))
    };
}