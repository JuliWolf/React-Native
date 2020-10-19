import React, {useEffect, useCallback, useReducer, useState} from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Platform,
    Alert,
    KeyboardAvoidingView,
    ActivityIndicator,
    Text, Button
} from "react-native";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {useSelector, useDispatch} from "react-redux";

import CustomHeaderButton from "../../components/UI/HeaderButton";
import Input from "../../components/UI/Input";

import * as productActions from '../../store/actions/products';

import Colors from "../../constants/Colors";

const FORM_INPUT_UPDATE = 'UPDATE';

const formReducer = (state, action) => {
    if(action.type === FORM_INPUT_UPDATE){
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }

        let updatedFormIsValid = true;

        for(const key in updatedValidities){
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }

        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }

    return state;
};

const EditProductScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state =>
        state.products.userProducts.find(prod =>
            prod.id === prodId
        )
    );

    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price: ''
        },
        inputValidities: {
            title: !!editedProduct,
            imageUrl: !!editedProduct,
            description: !!editedProduct,
            price: !!editedProduct,
        },
        formIsValid: !!editedProduct
    })

    const submitHandler = useCallback(async () => {
        if(!formState.formIsValid){
            Alert.alert('Wrong input!', 'Please check the errors in the form!', [
                {text: 'Okay'}
            ])
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            if(editedProduct){
                await dispatch(productActions.updateProduct(
                    prodId,
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl
                ));
            }else{
                await dispatch(productActions.createProduct(
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl,
                    +formState.inputValues.price
                ));
            }
            props.navigation.goBack();
        }catch(error){
            setError(error.message);
        }
        setIsLoading(false);
    }, [dispatch, formState]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler})
    }, [submitHandler]);

    useEffect(() => {
        if(error){
            Alert.alert('An error occurred!', error, [
                {text: 'Okay'}
            ])
        }
    }, [error]);

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity)  => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        });
    }, [dispatchFormState]);


    if(isLoading){
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primary}/>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100} style={{flex: 1}}>
            <ScrollView>
                <View style={styles.form}>
                    <Input
                        id='title'
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        label='Title'
                        errorText='Please enter a valid title!'
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.title : ''}
                        initiallyValid={!!editedProduct}
                        required
                    />
                    <Input
                        id='imageUrl'
                        keyboardType='default'
                        label='Image URL'
                        errorText='Please enter a valid Image URL!'
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.imageUrl : ''}
                        initiallyValid={!!editedProduct}
                        required
                    />
                    {   editedProduct ? null :
                        <Input
                            id='price'
                            keyboardType='decimal-pad'
                            label='Price'
                            errorText='Please enter a valid Price!'
                            onInputChange={inputChangeHandler}
                            initialValue={editedProduct ? editedProduct.price : ''}
                            initiallyValid={!!editedProduct}
                            required
                            min={0.1}
                        />
                    }
                    <Input
                        id='description'
                        keyboardType='decimal-pad'
                        label='Description'
                        errorText='Please enter a valid Description!'
                        autoCapitalize='sentences'
                        autoCorrect
                        multiline
                        numberOfLines={3}
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.description : ''}
                        initiallyValid={!!editedProduct}
                        required
                        minLength={5}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
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
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default EditProductScreen;