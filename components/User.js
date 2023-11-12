import React,{useState} from 'react';
import {View, StyleSheet,Text, TouchableOpacity,Alert,ToastAndroid } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserCircle,faMessage } from '@fortawesome/free-solid-svg-icons'
import ApiUrl from '../pages/config';
import { text } from 'react-native-communications';

const UserComponent = ({name,phone,address,id,refr}) => {
   
    function sendThesms() {
        
        let numP = phone.toString();
        text(numP,name);
    }
    const touchLon = ()=>{
        Alert.alert(
            'DELETE '+name,
            'Are sure to Delete this user?',
            [
               { 
                text:"cencel",
                onPress: () => ToastAndroid.show("cancel", ToastAndroid.SHORT),
                style: 'cancel',
               },
               { 
                text:"Yes",
                onPress: async () => {
                    try {
                        const resp = await fetch(ApiUrl+"delete-user/"+id,{
                            method:"DELETE"
                        });
                        const respon = await resp.json();
                        if(respon?.message==="Delete Successful"){
                            refr()
                            ToastAndroid.show("Delete Successful", ToastAndroid.LONG)
                        }else{
                            ToastAndroid.show("Delete Failed", ToastAndroid.LONG)
                        }
                        console.log(respon)
                        
                    } catch (error) {
                        
                    }
                },
                style: 'ok',
               },


            ]
        )
    }
    return (
        <View >
            <TouchableOpacity onLongPress={touchLon} style={styles.memeberDiv}>
                <FontAwesomeIcon color="black" icon={ faUserCircle } size={40}/>
                <View style={{marginLeft:10,width:280}}>
                    <Text style={{fontSize:20,color:"black"}}>{name}</Text>
                    <Text>Address: {address}</Text>
                    <Text>Phone: {phone}</Text>
                </View>
                <TouchableOpacity onPress={sendThesms}>
                    <FontAwesomeIcon color="green" icon={ faMessage } size={20}/>
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    memeberDiv:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:'white',
        borderColor:'grey',
        borderWidth:1,
        padding:10,
        margin:10,
        borderRadius:4,
        marginBottom:0,
        
    }
})

export default UserComponent;
