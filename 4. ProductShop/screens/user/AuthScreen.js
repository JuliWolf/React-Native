import React, {useReducer, useCallback, useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, KeyboardAvoidingView, Button, Alert} from "react-native";
import {useDispatch} from "react-redux";
import {LinearGradient} from "expo-linear-gradient";

import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Spinner from "../../components/UI/Spinner";

import * as authActions from '../../store/actions/auth';

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

const AuthScreen = (props) => {
    const [isSignup, setIsSignup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false
    });

    useEffect(() => {
        if(error){
            Alert.alert('An Error Occurred!', error, [
                {
                    text: 'Okay'
                }
            ])
        }
    }, [error])

    const authHandler = async () => {
        let action;
        if(isSignup){
           action = authActions.signup(formState.inputValues.email, formState.inputValues.password);
        }else{
            action = authActions.login(formState.inputValues.email, formState.inputValues.password);
        }
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(action);
            props.navigation.navigate('Shop');
        }catch(err){
            setError(err.message);
            setIsLoading(false);
        }
    };

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity)  => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        });
    }, []);


    return (
        <KeyboardAvoidingView
            style={styles.screen}
            behavior='padding'
            keyboarVerticalOffset={50}
        >
            <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input
                            id='email'
                            label='E-mail'
                            keyboardType='email-address'
                            required
                            email
                            autoCapitalize='none'
                            errorText='Please enter a valid email address.'
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                        <Input
                            id='password'
                            label='Password'
                            keyboardType='default'
                            secureTextEntry
                            required
                            minLength={6}
                            autoCapitalize='none'
                            errorText='Please enter a valid password.'
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                        <View style={styles.buttonContainer}>
                            {isLoading ? <Spinner/> :
                                <Button
                                    title={isSignup ? "Sign up" : "Login"}
                                    color={Colors.primary}
                                    onPress={authHandler}/>
                            }

                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title={`Switch to ${isSignup ? "Login" : "Sign up"}`}
                                    color={Colors.accent}
                                    onPress={() => {
                                        setIsSignup(prevState => !prevState);
                                    }}/>
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

AuthScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Authentication'
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        marginTop: 10
    }
});

export default AuthScreen;