import {StatusBar} from 'expo-status-bar';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export default function App() {
    useEffect(() => {
        Permissions.getAsync(Permissions.NOTIFICATIONS)
            .then(statusObj => {
                if(statusObj.status !== 'granted'){
                    return Permissions.askAsync(Permissions.NOTIFICATIONS);
                }
                return statusObj;
            })
            .then(statusObj => {
                if(statusObj.status !== 'granted'){
                    return;
                }
            });
    }, []);
    const triggerNotificationHandler = () => {
        Notifications.scheduleNotificationAsync({
            content: {
                title: 'My first local notification',
                body: 'This is the first local notification we are sending!'
            },
            trigger: {
                seconds: 10
            }
        });
    };
    return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <Button title="Trigger notification" onPRress={triggerNotificationHandler}/>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
