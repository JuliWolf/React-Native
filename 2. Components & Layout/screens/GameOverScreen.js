import React from 'react';
import {View, StyleSheet, Button, Image, Text} from "react-native";

import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";

import Colors from '../constants/color';

const GameOverScreen = (props) => {
    return (
        <View style={styles.screen}>
            <TitleText>The Game is Over!</TitleText>
            <View style={styles.imageContainer}>
                <Image
                    resizeMode="cover"
                    style={styles.image}
                    source={require('../assets/success.png')}
                    // source={{uri: 'https://liveinthenowalaska.files.wordpress.com/2013/05/view-of-the-summit1.jpg'}}
                />
            </View>
            <View style={styles.resultContainer}>
                <BodyText style={styles.resultText}>Your phone needed
                    <Text style={styles.highlight}> {props.roundsNumber} </Text>
                    rounds to guess the number
                    <Text style={styles.highlight}> {props.userNumber} </Text>
                </BodyText>
            </View>
            <MainButton onPress={props.onRestart}>
                New Game
            </MainButton>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        width: 300,
        height: 300,
        overflow: 'hidden',
        marginVertical: 30
    },
    image: {
        width: '100%',
        height: '100%'
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: 50
    },
    resultText: {
        textAlign: 'center',
        fontSize: 20
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    }
})

export default GameOverScreen;