import React, {useState, useCallback} from 'react';
import {useDispatch} from "react-redux";
import { View, Text, StyleSheet, TextInput, ScrollView, Button } from 'react-native';

import ImagePicker from '../components/ImagePicker';
import LocationPicker from "../components/LocationPicker";

import * as placesActions from '../store/places-actions';

import Colors from "../constants/Colors";

const NewPlaceScreen = props => {
    const [titleValue, setTitleValue] = useState('');
    const [imageValue, setImageValue] = useState();
    const [selectedLocation, setSelectedLocation] = useState();

    const dispatch = useDispatch();

    const titleChangeHandler = text => {
        setTitleValue(text);
    };

    const savePlaceHandler = () => {
        dispatch(placesActions.addPlace(titleValue, imageValue, selectedLocation));
        props.navigation.goBack();
    };

    const imageTakenHandler = (imagePath) => {
        setImageValue(imagePath);
    };

    const locationPickedHandler = useCallback((location) => {
        setSelectedLocation(location);
    }, []);

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.textInput} onChangeText={titleChangeHandler} value={titleValue}/>
                <ImagePicker onImageTaken={imageTakenHandler}/>
                <LocationPicker navigation={props.navigation} onLocationPicked={locationPickedHandler}/>
                <Button title='Save Place' color={Colors.primary} onPress={savePlaceHandler}/>
            </View>
        </ScrollView>
    );
};

NewPlaceScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Add Place'
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 30,
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
});

export default NewPlaceScreen;
