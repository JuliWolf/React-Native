import React from 'react';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector} from "react-redux";
import {View, StyleSheet} from "react-native";

import HeaderButton from '../components/HeaderButton';
import MealList from '../components/MealList';
import DefaultText from "../components/DefaultText";


const FavoritesScreen = (props) => {
    const favMeals = useSelector(state => state.meals.favoriteMeals);

    if(favMeals.length  === 0 || !favMeals){
        return <View style={styles.content}>
            <DefaultText>No Favorite meals found. Start adding some</DefaultText>
        </View>
    }

    return (
        <MealList listData={favMeals} navigation={props.navigation}/>
    );
};

FavoritesScreen.navigationOptions = (navData) => {
    const headerLeftButton = () => {
        return (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Menu" iconName="ios-menu" onPress={() => {
                    navData.navigation.toggleDrawer();
                }}/>
            </HeaderButtons>
        )
    }
    return {
        headerTitle: 'Your Favourites',
        headerLeft: (headerLeftButton)
    }
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default FavoritesScreen;