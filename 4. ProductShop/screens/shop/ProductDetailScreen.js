import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image, Button} from "react-native";
import {useSelector} from "react-redux";

const ProductDetailScreen = (props) => {
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state => state.products.availableProducts.find(product => product.id === productId));
    return (
        <ScrollView>
            <View>
                <Text>{selectedProduct.title}</Text>
            </View>
        </ScrollView>
    );
};

ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    }
};

const styles = StyleSheet.create({

})

export default ProductDetailScreen;