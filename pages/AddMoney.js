import React,{useState} from 'react';
import { Image, View ,StyleSheet, Text, TextInput, TouchableOpacity,ToastAndroid} from 'react-native';
import AllHeader from '../components/AllHeader';
import { Body } from '../styles/AdduserStyle';
import { useNavigation } from '@react-navigation/native';
import RadioButtonRN from 'radio-buttons-react-native';
import ApiUrl from './config';


const AddMoney = () => {
    const navigation = useNavigation();
    const [buttonOnePressDisabled, setbuttonOnePressDisabled] = useState(false);
    
    const data = [
        {
          label: 'Mobile Bank'
         },
         {
          label: 'Bank'
         },
         {
          label: 'Cash'
         }
        ];

        const myData={
            type:data?.label,
            donner:'',
            amount:'',
            status:'add',
            created_at:new Date().getDate()+"-"+new Date().getMonth()+1+"-"+new Date().getFullYear()
        }
        const savetheData = async ()=>{
            setbuttonOnePressDisabled(true)
            if(myData?.donner!=='' && myData?.amount!==''){
                try {
                    const respon = await fetch(ApiUrl+"addmoney",{
                        method:"POST",
                        body: JSON.stringify(myData),
                        headers: {
                            'Content-Type': 'application/json'
                        },
            
                    })
                    const resp = await respon.json();
                    if(resp.message==='Add success'){
                        ToastAndroid.show('Add success', ToastAndroid.SHORT);
                        navigation.navigate("Records")
                    }else{
                        ToastAndroid.show('Insert Failed', ToastAndroid.SHORT);
                        setbuttonOnePressDisabled(false)
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
            <AllHeader title="Add Money"/>
            <View style={styles.formDiv}>
                <View style={{marginBottom:5}}>
                    <Text>Donner Name:</Text>
                    <TextInput onChangeText={(v)=>{
                        myData.donner=v
                    }} style={styles.inputFild} placeholder='Shaki Hussain' />
                </View>
                
                <View style={{marginBottom:5}}>
                    <Text>Ammount:</Text>
                    <TextInput onChangeText={(v)=>{
                        myData.amount=v
                    }} style={styles.inputFild} placeholder='200000' keyboardType='number-pad' />
                </View>
                <View style={{marginBottom:5}}>
                    <RadioButtonRN
                        data={data}
                        selectedBtn={(e) => myData.type=e.label}
                        animationTypes= {['pulse']}
                        initial={1}
                    />
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

export default AddMoney;
