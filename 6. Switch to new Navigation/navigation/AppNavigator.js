import React from 'react';
import {useSelector} from "react-redux";
import {NavigationContainer} from "@react-navigation/native";
import {  }

import ShopNavigator from "./ShopNavigator";

const AppNavigation = (props) => {
    const isAuth = useSelector(state => !!state.auth.token);

    return ;
};

export default AppNavigation;