import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const AllHeader = ({title}) => {
    return (
        <View style={styles.headerDiv}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headerDiv:{
        padding:10,
        backgroundColor:'#1C3851'
    },
    title:{
        color:'white',
        textAlign:'center',
        fontSize:20
    }
})

export default AllHeader;
