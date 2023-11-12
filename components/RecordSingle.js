import React,{useState} from 'react';
import {View, StyleSheet,Text, TouchableOpacity,Alert,ToastAndroid } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserCircle,faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons'
import ApiUrl from '../pages/config';

const UserComponent = ({recorddata,refr}) => {
   
    const {donner:name,amount,type,id,status,created_at} = recorddata || {};
   
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
                        const resp = await fetch(ApiUrl+"delete-addedmoney/"+id,{
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
    let borderCol = "red";
    let statusOfExDD = "Expence"
    if(status==='add'){
        borderCol='green'
        statusOfExDD = 'Add';
    }

    return (
        <View >
            <TouchableOpacity onLongPress={touchLon} style={{...styles.memeberDiv,borderColor:borderCol}}>
                <FontAwesomeIcon color="black" icon={ faUserCircle } size={25}/>
                
                <View style={{marginLeft:10,display:'flex',justifyContent:'space-between',flexDirection:'row',width:'88%',alignItems:'center'}}>
                    <View>
                        <Text style={{fontSize:20,color:"black"}}>{statusOfExDD}</Text>
                        <Text style={{fontSize:13,color:"grey"}}>By {name}</Text>
                        <Text style={{fontSize:13,color:"grey"}}>at {created_at}</Text>
                    </View>
                    

                    <View>
                        <Text style={{fontSize:20,color:'black'}}>
                            <FontAwesomeIcon color="black" icon={ faMoneyBillTransfer } size={20}/> {amount}
                        </Text>
                        <Text style={{textAlign:'center'}}>{type}</Text>
                    </View>
                    
                   
                </View>
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
       
        borderWidth:1,
        padding:5,
        margin:10,
        borderRadius:4,
        marginBottom:0,
        
    }
})

export default UserComponent;
