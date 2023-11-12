import React,{useState,useEffect} from 'react';
import {View, StyleSheet,Text} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faNetworkWired } from '@fortawesome/free-solid-svg-icons'

const NoInternet = () => {
    
    return (
        <View style={styles.NoInterNetDiv}>
           
        </View>
    );
}

const styles = StyleSheet.create({
    NoInterNetDiv:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'100%',
        width:'100%',


    },
    NoInterNetDivIcon:{
        display:'flex',
        justifyContent:'center',
        width:'100%',
        flexDirection:'row'
    },
    InterNetText:{
        textAlign:'center',
        fontSize:30,
        color:'#000'
    }
})

export default NoInternet;
