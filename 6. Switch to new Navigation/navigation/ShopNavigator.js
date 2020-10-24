import React from 'react';
import {Platform} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {Ionicons} from "@expo/vector-icons";

import ProductsOverviewScreen, {screenOptions as productOverviewOptions} from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen, {screenOptions as productDetailOptions} from "../screens/shop/ProductDetailScreen";
import CartScreen, {screenOptions as cartOptions} from "../screens/shop/CartScreen";
import OrdersScreen, {screenOptions as ordersOptions} from "../screens/shop/OrdersScreen";
import UserProductsScreen, {screenOptions as userProductsOptions} from "../screens/user/UserProductsScreen";
import EditProductScreen, {screenOptions as editProductOptions} from "../screens/user/EditProductScreen";
import AuthScreen, {screenOptions as authOptions} from "../screens/user/AuthScreen";

import LogoutButton from "../components/UI/LogoutButton";

import Colors from "../constants/Colors";
import {useDispatch} from "react-redux";


const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
  return (
      <ProductsStackNavigator.Navigator
          screenOptions={defaultNavOptions}
      >
        <ProductsStackNavigator.Screen
            name="ProductsOverview"
            component={ProductsOverviewScreen}
            options={productOverviewOptions}
        />
        <ProductsStackNavigator.Screen
            name="ProductDetail"
            component={ProductDetailScreen}
            options={productDetailOptions}
        />
        <ProductsStackNavigator.Screen
            name="Cart"
            component={CartScreen}
            options={cartOptions}
        />
      </ProductsStackNavigator.Navigator>
  );
};

// const ProductsNavigator = createStackNavigator({
//     ProductsOverview: ProductsOverviewScreen,
//     ProductDetail: ProductDetailScreen,
//     Cart: CartScreen
// }, {
//     defaultNavigationOptions: defaultNavOptions,
//     navigationOptions: {
//         drawerIcon: drawerConfig => <Ionicons
//             name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
//             size={23}
//             color={drawerConfig.tintColor}
//         />
//     }
// });

const OrdersStackNavigation = createStackNavigator();

export const OrdersNavigator = () => {
    return (
        <OrdersStackNavigation.Navigator
            screenOptions={defaultNavOptions}
        >
            <OrdersStackNavigation.Screen
                name="Orders"
                component={OrdersScreen}
                options={ordersOptions}
            />
        </OrdersStackNavigation.Navigator>
    );
};

// const OrdersNavigator = createStackNavigator({
//     Orders: OrdersScreen
// }, {
//     defaultNavigationOptions: defaultNavOptions,
//     navigationOptions: {
//         drawerIcon: drawerConfig => <Ionicons
//             name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
//             size={23}
//             color={drawerConfig.tintColor}
//         />
//     }
// });

const AdminStackNavigation = createStackNavigator();

export const AdminNavigator = () => {
    return (
        <AdminStackNavigation.Navigator
            screenOptions={defaultNavOptions}
        >
            <AdminStackNavigation.Screen
                name="UserProducts"
                component={UserProductsScreen}
                options={userProductsOptions}
            />

            <AdminStackNavigation.Screen
                name="EditProduct"
                component={EditProductScreen}
                options={editProductOptions}
            />
        </AdminStackNavigation.Navigator>
    );
};

// const AdminNavigator = createStackNavigator({
//     UserProducts: UserProductsScreen,
//     EditProduct: EditProductScreen
// }, {
//     defaultNavigationOptions: defaultNavOptions,
//     navigationOptions: {
//         drawerIcon: drawerConfig => <Ionicons
//             name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
//             size={23}
//             color={drawerConfig.tintColor}
//         />
//     }
// });

const AuthStackNavigation = createStackNavigator();

export const AuthNavigator = () => {
    return (
        <AuthStackNavigation.Navigator
            screenOptions={defaultNavOptions}
        >
            <AuthStackNavigation.Screen
                name="Auth"
                component={AuthScreen}
                options={authOptions}
            />
        </AuthStackNavigation.Navigator>
    );
};

// const AuthNavigator = createStackNavigator({
//     Auth: AuthScreen
// }, {
//     defaultNavigationOptions: defaultNavOptions
// });

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
    const dispatch = useDispatch();
    return (
        <ShopDrawerNavigator.Navigator
            drawerContent={(props) => <LogoutButton dispatch={dispatch} {...props}/>}
            drawerContentOptions={
                {
                    activeTintColor: Colors.primary
                }
            }>
            <ShopDrawerNavigator.Screen
                name="Products"
                component={ProductsNavigator}
                options={
                    {
                        drawerIcon: props => <Ionicons
                            name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                            size={23}
                            color={props.color}
                        />
                    }
                }
            />
            <ShopDrawerNavigator.Screen
                name="Orders"
                component={OrdersNavigator}
                options={
                    {
                        drawerIcon: props => <Ionicons
                            name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                            size={23}
                            color={props.color}
                        />
                    }
                }
            />
            <ShopDrawerNavigator.Screen
                name="Admin"
                component={AdminNavigator}
                options={
                    {
                        drawerIcon: props => <Ionicons
                            name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                            size={23}
                            color={props.color}
                        />
                    }
                }
            />
        </ShopDrawerNavigator.Navigator>
    );
};

// const ShopNavigator = createDrawerNavigator({
//     Products: ProductsNavigator,
//     Orders: OrdersNavigator,
//     Admin: AdminNavigator
// }, {
//     contentOptions: {
//         activeTintColor: Colors.primary
//     },
//     contentComponent: LogoutButton
// });



// const MainNavigator = createSwitchNavigator({
//     Startup: StartupScreen,
//     Auth: AuthNavigator,
//     Shop: ShopNavigator
// });

// export default createAppContainer(MainNavigator);