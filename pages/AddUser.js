import React,{useState} from 'react';
import { Image, View ,StyleSheet, Text, TextInput, TouchableOpacity,ToastAndroid } from 'react-native';
import AllHeader from '../components/AllHeader';
import { Body } from '../styles/AdduserStyle';
import { useNavigation } from '@react-navigation/native';
import ApiUrl from './config';

const AddUser = () => {
    const navigation = useNavigation();
    const [buttonOnePressDisabled, setbuttonOnePressDisabled] = useState(false);

    const data = {
        'name':'',
        'occupation':'',
        'phone':'',
        'address':'',
        'membertype':'',
        'created_at':new Date().getDate()+"-"+new Date().getMonth()+1+"-"+new Date().getFullYear()
    }
   
    const nameSet =(v,name)=>{
        if(name==='name'){
            data.name=v
        }else if(name==='occupation'){
            data.occupation=v
        }
        else if(name==='phone'){
            data.phone=v
        }
        else if(name==='address'){
            data.address=v
        }
        else if(name==='type'){
            data.membertype=v
        }
        
    }

    const savetheData = async ()=>{
        setbuttonOnePressDisabled(true)
        if(data?.name!=='' && data?.phone!=='' && data?.address!=='' && data?.membertype!=='' && data?.occupation!==''){
            try {
                const respon = await fetch(ApiUrl+"signup",{
                    method:"POST",
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    },
        
                })
                const resp = await respon.json();
                if(resp.message==='Insert successful'){
                    ToastAndroid.show('Insert successful', ToastAndroid.SHORT);
                    navigation.navigate("Users")
                }
                console.log(resp)
                setbuttonOnePressDisabled(false)
            } catch (error) {
                console.log(error)
                setbuttonOnePressDisabled(false)
            }
        }else{
            ToastAndroid.show('Empty Filed Found', ToastAndroid.LONG);
            setbuttonOnePressDisabled(false)
        }
        console.log(data);
        
    }
    return (
        <Body>
            <AllHeader title="Add User"/>
            <View style={styles.dflex}>
                <Image style={{height:200,width:200}} source={{uri:'https://firebasestorage.googleapis.com/v0/b/testcurtd.appspot.com/o/fundmanager%2FuserAdd.png?alt=media&token=542ad4ab-cedd-47bb-b0ab-e25aa7810988'}} />
            </View>
            <View style={styles.formDiv}>
                <View style={{marginBottom:5}}>
                    <Text>Full Name:</Text>
                    <TextInput onChangeText={(v)=>nameSet(v,'name')} style={styles.inputFild} placeholder='Shaki Hussain' />
                </View>
                
                <View style={{marginBottom:5}}>
                    <Text>Occupation:</Text>
                    <TextInput onChangeText={(v)=>nameSet(v,'occupation')} style={styles.inputFild} placeholder='Teacher' />
                </View>
                <View style={{marginBottom:5}}>
                    <Text>Phone:</Text>
                    <TextInput onChangeText={(v)=>nameSet(v,'phone')} style={styles.inputFild} placeholder='01xxx-xxxxxx' keyboardType='decimal-pad' />
                </View>
                <View style={{marginBottom:5}}>
                    <Text>Address:</Text>
                    <TextInput onChangeText={(v)=>nameSet(v,'address')} style={styles.inputFild} placeholder='Dhaka, Bangladesh' />
                </View>
                <View style={{marginBottom:5}}>
                    <Text>Member Type:</Text>
                    <TextInput onChangeText={(v)=>nameSet(v,'type')} style={styles.inputFild} placeholder='Dhaka, Bangladesh' />
                </View>
                <View style={{display:'flex',flexDirection:'row'}}>
                    <TouchableOpacity disabled={buttonOnePressDisabled} onPress={savetheData} style={styles.sveBtn}>
                        <Text style={{color:"white",textAlign:'center'}}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={{...styles.sveBtn,backgroundColor:'red'}}>
                        <Text style={{color:"white",textAlign:'center'}}>Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Body>
    );
}

const styles = StyleSheet.create({
    dflex:{
        display:'flex',
        alignItems:'center',
        
    },
    formDiv:{
        backgroundColor:"white",
        padding:20,
        marginTop:20,
        marginVertical:10,
        marginHorizontal:15,
        borderRadius:4,


    },
    inputFild:{
        padding:5,
        borderColor:'grey',
        borderWidth:1,
        borderRadius:3
    },
    sveBtn:{
        padding:10,
        backgroundColor:'#1C3851',
        width:100,
        borderRadius:3,
        marginTop:10,
        marginRight:10
    }
})

export default AddUser;
