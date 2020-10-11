import React from 'react';
import {FlatList} from "react-native";
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import CategoryGridTile from '../components/CategoryGridTile';
import HeaderButton from '../components/HeaderButton';

import {CATEGORIES} from "../data/dummy-data";

const CategoriesScreen = (props) => {
    const renderGridItem = (itemData) => {
        return (
            <CategoryGridTile
                color={itemData.item.color}
                title={itemData.item.title}
                onSelect={() => {
                props.navigation.navigate({
                    routeName: 'CategoryMeals',
                    params: {
                        categoryId: itemData.item.id
                    }
                })
            }}/>
        );
    }

    return (
        <FlatList
            numColumns={2}
            data={CATEGORIES}
            renderItem={renderGridItem}/>
    );
};

CategoriesScreen.navigationOptions = (navData) => {
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
        headerTitle: 'Meal Categories',
        headerLeft: (headerLeftButton)
    }
}

export default CategoriesScreen;