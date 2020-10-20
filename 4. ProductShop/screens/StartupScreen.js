import React, {useEffect} from 'react';
import {StyleSheet, AsyncStorage} from "react-native";
import {useDispatch} from "react-redux";

import * as authActions from '../store/actions/auth';

import Spinner from "../components/UI/Spinner";

const StartupScreen = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if(!userData){
                props.navigation.navigate('Auth');
                return;
            }
            const transformedData = JSON.parse(userData);
            const {token, userId, expirationDate} = transformedData;

            const expiryDate = new Date(expirationDate);
            if(expiryDate <= new Date() || !token || !userId){
                props.navigation.navigate('Auth');
                return;
            }

            props.navigation.navigate('Shop');
            dispatch(authActions.authenticate(userId, token));
        };
        tryLogin();
    }, [dispatch])

    return (
        <Spinner/>
    );
};

export default StartupScreen;