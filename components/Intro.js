import React from 'react';
import {View, StyleSheet,Image} from 'react-native';
import logo from "../images/logo.png"
const Intro = () => {
    return (
        <View style={styles.logoDiv}>
            <Image source={logo} style={{ width: '90%', height: '90%', resizeMode: 'contain' }}/>
        </View>
    );
}

const styles = StyleSheet.create({
    logoDiv:{
        position:'absolute',
        zIndex:99999,
        backgroundColor:'rgba(255,255,255,0.99)',
        height:'130%',
        width:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'

    },
    LogoImage:{
       
        resizeMode:'contain'
    }
})

export default Intro;
