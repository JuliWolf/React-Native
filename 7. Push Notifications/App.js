import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

Notifications.setNotificationHandler({
    handleNotification: async () => {
        return {
            shouldShowAlert: true
        };
    }
});

export default function App() {
    const [pushToken, setPushToken] = useState('');
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
                    throw new Error('Permission not granted!')
                }
            })
            .then(() => {
                return Notifications.getExpoPushTokenAsync();
            })
            .then(response => {
                const token = response.data;
                setPushToken(token);
            })
            .catch((err) => {
                return null;
            });
    }, []);

    useEffect(() => {
        const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(notification => {
            console.log(notification);
        });

        const foregroundSubscription = Notifications.addNotificationReceivedListener(notification => {
            console.log(notification);
        });

        return () => {
            foregroundSubscription.remove();
            backgroundSubscription.remove();
        };
    }, []);

    const triggerNotificationHandler = async () => {
        // Notifications.scheduleNotificationAsync({
        //     content: {
        //         title: 'My first local notification',
        //         body: 'This is the first local notification we are sending!'
        //     },
        //     trigger: {
        //         seconds: 2,
        //         channelId: 'new-push'
        //     }
        // });

        fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Accept-Encoding': 'gzip, deflate',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                to: pushToken,
                data: {
                    extraData: 'Some data',
                },
                title: 'Sent via the app',
                body: 'This push was sent via the app!'
            })
        });
    };
    return (
        <View style={styles.container}>
            <Button title="Trigger notification" onPress={triggerNotificationHandler}/>
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
