import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Alert, FlatList, Dimensions} from "react-native";
import {Ionicons} from '@expo/vector-icons';
import {ScreenOrientation} from "expo/build/removed.web";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import BodyText from "../components/BodyText";

import DefaultStyles from '../constants/default-styles';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if(rndNum === exclude){
        return generateRandomBetween(min, max, exclude);
    }else{
        return rndNum;
    }
}

const renderListItem = (listLength, itemData) => {
    return (
        <View style={styles.listItem}>
            <BodyText>#{listLength - itemData.index}</BodyText>
            <BodyText>{itemData.item}</BodyText>
        </View>
    )
}

const GameScreen = (props) => {
    // заблокировать возможность изменять ориентацию
    // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const {userChoice, onGameOver} = props;

    useEffect(() => {
        if(currentGuess === userChoice){
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, onGameOver, userChoice]);

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);
        };
        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        }
    })


    const nextGuessHandler = direction => {
        if(
            (direction === 'lower' && currentGuess < userChoice) ||
            (direction === 'greater' && currentGuess > userChoice)
        ){
            Alert.alert('Don\'t lie!', 'You know that this is wrong...', [
                { title: 'Sorry!', style: 'cancel' }
                ]
            );
            return;
        }
        if(direction === 'lower'){
            currentHigh.current = currentGuess;
        }else if(direction === 'greater'){
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        // setRounds(curRounds => curRounds + 1);
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses])
    };

    let listContainerStyle = styles.listContainer;
    if(availableDeviceWidth < 350){
        listContainerStyle = styles.listContainerBig
    }

    if(availableDeviceHeight < 500){
        return (
            <View style={styles.screen}>
                <Text style={DefaultStyles.title}>Opponent's Guess</Text>
                <View style={styles.controls}>
                    <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name="md-remove" size={24} color="white"/>
                    </MainButton>
                    <NumberContainer>
                        {currentGuess}
                    </NumberContainer>
                    <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                        <Ionicons name="md-add" size={24} color="white"/>
                    </MainButton>
                </View>

                <View style={listContainerStyle}>
                    <FlatList keyExtractor={item => item}
                              data={pastGuesses}
                              renderItem={renderListItem.bind(this, pastGuesses.length)}
                              contentContainerStyle={styles.list}/>
                </View>
            </View>
        )
    }else{
        return (
            <View style={styles.screen}>
                <Text style={DefaultStyles.title}>Opponent's Guess</Text>
                <NumberContainer>
                    {currentGuess}
                </NumberContainer>
                <Card style={Dimensions.get('window').height > 600 ? styles.buttonContainer : styles.buttonContainer}>
                    <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name="md-remove" size={24} color="white"/>
                    </MainButton>
                    <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                        <Ionicons name="md-add" size={24} color="white"/>
                    </MainButton>
                </Card>
                <View style={listContainerStyle}>
                    {/*<ScrollView contentContainerStyle={styles.list}>*/}
                    {/*    {pastGuesses.map((guess, index) =>*/}
                    {/*        renderListItem(guess, index, pastGuesses.length - index)*/}
                    {/*    )}*/}
                    {/*</ScrollView>*/}
                    <FlatList keyExtractor={item => item}
                              data={pastGuesses}
                              renderItem={renderListItem.bind(this, pastGuesses.length)}
                              contentContainerStyle={styles.list}/>
                </View>

            </View>
        )
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
        width: 400,
        maxWidth: '90%'
    },
    listContainer: {
        flex: 1,
        // width: Dimensions.get('window') > 350 ? '80%' : '60%'
        width: '60%'
    },
    listContainerBig: {
        flex: 1,
        width: '80%'
    },
    list: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    listItem: {
        flexDirection: 'row',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        justifyContent: 'space-around',
        width: '60%'
    }
});

export default GameScreen;