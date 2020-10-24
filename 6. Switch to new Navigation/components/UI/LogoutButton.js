import React from 'react';
import {View, StyleSheet, SafeAreaView, Button} from "react-native";
import {DrawerItemList} from "@react-navigation/drawer";
import {useDispatch} from "react-redux";

import * as authActions from '../../store/actions/auth';

import Colors from "../../constants/Colors";


const LogoutButton = (props) => {
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(authActions.logout());
    };

    return (
        <View style={styles.buttonContainer}>
            <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                <DrawerItemList {...props}/>
                <Button title='Logout' color={Colors.primary} onPress={logout}/>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        paddingTop: 20
    }
});

export default LogoutButton;