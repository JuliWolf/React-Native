import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView, Platform, Alert} from "react-native";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {useSelector, useDispatch} from "react-redux";

import CustomHeaderButton from "../../components/UI/HeaderButton";

import * as productActions from '../../store/actions/products';

const EditProductScreen = (props) => {
    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state =>
        state.products.userProducts.find(prod =>
            prod.id === prodId
        )
    );

    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [titleIsValid, setTitleIsValid] = useState(false);
    const [imageURL, setImageURL] = useState(editedProduct ? editedProduct.imageUrl : '');
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');
    const [price, setPrice] = useState('');

    const dispatch = useDispatch();

    const submitHandler = useCallback(() => {
        if(!titleIsValid){
            Alert.alert('Wrong input!', 'Please check the errors in the form!', [
                {text: 'Okay'}
            ])
            return;
        }
        if(editedProduct){
            dispatch(productActions.updateProduct(prodId, title, description, imageURL));
        }else{
            dispatch(productActions.createProduct(title, description, imageURL, +price));
        }
        props.navigation.goBack();
    }, [dispatch, title, description, imageURL, price]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler})
    }, [submitHandler]);

    const titleChangeHandler = text => {
        if(text.trim().length === 0){
            setTitleIsValid(false);
        }else{
            setTitleIsValid(true);
        }
        setTitle(text);
    };

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={titleChangeHandler}
                        value={title}
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        // returnKeyType='next'
                        // onEndEditing
                    />
                    {!titleIsValid && <Text>Please enter a valid title!</Text>}
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setImageURL(text)}
                        value={imageURL}
                    />

                </View>
                {   editedProduct ? null :
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Price</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => setPrice(text)}
                            value={price}
                            keyboardType='decimal-pad'
                        />

                    </View>
                }
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setDescription(text)}
                        value={description}
                    />

                </View>
            </View>
        </ScrollView>
    );
};

EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit');
    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Save'
                    iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                    onPress={submitFn}
                />
            </HeaderButtons>
    };
}

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
});

export default EditProductScreen;