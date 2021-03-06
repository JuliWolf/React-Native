import React, { useEffect, useState, useCallback } from 'react';
import {FlatList, Platform, Button, View, StyleSheet, Text} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import ProductItem from "../../components/shop/ProductItem";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import Spinner from "../../components/UI/Spinner";

import * as cartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/products';

import Colors from "../../constants/Colors";

const ProductsOverviewScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(productsActions.fetchProducts())
        }catch(error){
            setError(error.message);
        }

        setIsRefreshing(false);
    }, [dispatch, setError, setIsRefreshing]);

    useEffect(() => {
        setIsLoading(true);
        loadProducts().then(() => {
            setIsLoading(false);
        });
    }, [loadProducts, dispatch, setIsLoading]);

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', () => {
            loadProducts();
        });
        return () => {
            willFocusSub.remove();
        };
    }, [loadProducts]);

    const selectItemHandler = (id, title) => {
        props.navigation.navigate({
            routeName: 'ProductDetail',
            params: {
                productId: id,
                productTitle: title
            }
        });
    }
    if(error){
        return (
            <View style={styles.centered}>
                <Text> An error occurred!</Text>
                <Button title="Try again" onPress={loadProducts} color={Colors.primary}/>
            </View>
        )
    }

    if(isLoading){
        return (
            <Spinner/>
        )
    }

    if(!isLoading && products.length === 0){
        return (
            <View style={styles.centered}>
                <Text>No products found. Maybe start adding some!</Text>
            </View>
        )
    }

    return <FlatList
        onRefresh={loadProducts}
        refreshing={isRefreshing}
        data={products}
        keyExtractor={item => item.id}
        renderItem={itemData =>
            <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelect={() => {
                    selectItemHandler(itemData.item.id, itemData.item.title)
                }}
            >
                <Button color={Colors.primary} title="View Detail" onPress={() => {
                    selectItemHandler(itemData.item.id, itemData.item.title)
                }}/>
                <Button color={Colors.primary} title="To Cart" onPress={() => {
                    dispatch(cartActions.addToCart(itemData.item))
                }}/>
            </ProductItem>
        }
    />
};

ProductsOverviewScreen.navigationOptions = navData => {
    return{
        headerTitle: 'All Products',
        headerLeft: () =>
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Menu'
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>,
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Cart'
                    iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    onPress={() => {
                        navData.navigation.navigate('Cart')
                    }}
                />
            </HeaderButtons>
    }
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ProductsOverviewScreen;