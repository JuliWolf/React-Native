import React from 'react';
import {TouchableOpacity, Platform, TouchableNativeFeedback} from "react-native";


const TouchableCmp = (props) => {
    let TouchableCmp = TouchableOpacity;

    if(Platform.OS === 'android' && Platform.Version >= 21){
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <TouchableCmp useForeground style={{...props.style}} onPress={props.onPress} >
            {props.children}
        </TouchableCmp>
    );
};

export default TouchableCmp;