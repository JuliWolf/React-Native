import React from 'react';
import {useSelector} from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import ShopNavigator from "./ShopNavigator";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";

const myStack = createStackNavigator();

const AppNavigation = (props) => {
    const isAuth = useSelector(state => !!state.auth.token);

    return (
        <NavigationContainer>
            <MyStack.Navigator>
                <MyStack.Screen
                    name="ProductsOverview"
                    component={ProductsOverviewScreen}
                />
            </MyStack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;