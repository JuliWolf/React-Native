import * as FileSystem from 'expo-file-system';
import {insertPlace} from "../helpers/db";

export const ADD_PLACE = 'ADD_PLACE';

export const addPlace = (title, image) => {
    return async dispatch => {
        const fileName = image.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;

        try{
            await FileSystem.moveAsync({
                from: image,
                to: newPath
            });
            const dbResult = await insertPlace(title, newPath, 'Dummy Address', 16.6, 12.3);
            dispatch({ type: ADD_PLACE, placeData: { id: dbResult.insertId, title, image: newPath } });
        }catch(error){
            console.log(error);
            throw error;
        }
    }
}