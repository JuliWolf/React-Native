import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from "react-native";

import CategoryGridTile from '../components/CategoryGridTile';

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

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

})

export default CategoriesScreen;