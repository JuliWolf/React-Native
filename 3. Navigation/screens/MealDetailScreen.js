import React from 'react';
import {View, Text, StyleSheet, Button} from "react-native";
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';

import {MEALS} from '../data/dummy-data';

const MealDetailScreen = (props) => {
    const mealId = props.navigation.getParam('mealId');

    const selectedMeal = MEALS.find(meal => meal.id === mealId);

    return (
        <View style={styles.screen}>
            <Text>{selectedMeal.title}</Text>
            <Button title="Go back to Categories" onPress={() => {
                props.navigation.popToTop();
            }}/>
        </View>
    );
};

MealDetailScreen.navigationOptions = (navigationData) => {
    const mealId = navigationData.navigation.getParam('mealId');

    const selectedMeal = MEALS.find(meal => meal.id === mealId);

    const headerRightButton = () => {
        return (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Favourite'
                    iconName='ios-star'
                    onPress={() => {
                        console.log('Mark as Favourite')
                    }}
                />
            </HeaderButtons>
        );
    }
    return {
        headerTitle: selectedMeal.title,
        headerRight: (headerRightButton)
    };
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default MealDetailScreen;