import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import { StyleSheet, Platform, FlatList } from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import CustomHeaderButton from "../components/HeaderButton";
import PlaceItem from "../components/PlaceItem";

import * as placesActions from '../store/places-actions';

const PlacesListScreen = props => {
    const places = useSelector(state => state.places.places);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(placesActions.loadPlaces());
    }, [dispatch]);

    return (
        <FlatList
            data={places}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <PlaceItem
                    onSelect={() => {
                        props.navigation.navigate('PlaceDetail', {
                            placeTitle: itemData.item.title,
                            placeId: itemData.item.id
                        });
                    }}
                    title={itemData.item.title}
                    address={itemData.item.address}
                    image={itemData.item.imageUri}
                />
            )}
        />
    );
};

PlacesListScreen.navigationOptions = navData =>  {
    return {
        headerTitle: 'All Places',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Add Place'
                    iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                    onPress={() => {
                        navData.navigation.navigate('NewPlace');
                    }}
                />
            </HeaderButtons>
        )
    }

};

const styles = StyleSheet.create({});

export default PlacesListScreen;
