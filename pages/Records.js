import React,{useEffect,useState} from 'react';
import { Image, View ,StyleSheet, Text, TextInput, TouchableOpacity,RefreshControl,ActivityIndicator} from 'react-native';
import AllHeader from '../components/AllHeader';
import { Body } from '../styles/AdduserStyle';
import { useNavigation } from '@react-navigation/native';

import ApiUrl from './config';
import RecordSingle from "../components/RecordSingle"

const Records =  () => {
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();
    const [AllRecord, setAllRecord] = useState();
    const [filterData, setfilterData] = useState('expence');
    const [isLoading, setisLoading] = useState(true);
    let content;

    const setdatafun = (value)=>{
        setfilterData(value)
    }

    const fetchRecords = async ()=>{
        try {
            const Respon = await fetch(ApiUrl+"records");

            const AllRec = await Respon.json();
            let items = AllRec?.results?.map((record)=>record?.status === filterData || true &&(<RecordSingle key={Math.random()+Math.random()} refr = {onRefresh} recorddata={record}/>))

            // const t = items?.filter((record)=>record?.status === 'add'&&<RecordSingle key={Math.random()+Math.random()} name={record?.donner} amount={record?.amount} type={record?.type} id={record?.id} refr = {onRefresh} status={record.status}/>)

            setAllRecord(items)
            // console.log(t);
            setisLoading(false)

        } catch (error) {
            console.log(error);
        }
    }


    

    

    useEffect(() => {
        fetchRecords()
        // console.log(AllRecord);
    }, [filterData]);

    const onRefresh = () => {
        setRefreshing(true);
        fetchRecords()
        // perform any tasks needed to refresh the content here
        setRefreshing(false);
    }
    
    
    return (
        <Body refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          } >
            <AllHeader title="All Records"/>
            <View style={{display:'flex',justifyContent:'space-between',flexDirection:'row',marginHorizontal:10,marginTop:5}}>
                <TouchableOpacity onPress={()=>setdatafun(true)} style={styles.filterbtn}>
                    <Text>All</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setdatafun('expence')} style={styles.filterbtn}>
                    <Text>Adds</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setdatafun('add')} style={styles.filterbtn}>
                    <Text>Expance</Text>
                </TouchableOpacity>
                
            </View>
            
           {
            AllRecord&&(
                AllRecord?.map((record)=>{
                    return record
                })
            )
           }
           {
            AllRecord?.length===0&&<Text style={{textAlign:'center',marginTop:30}}>No Records Found</Text>
           }
           {
            isLoading&&<ActivityIndicator />
           }
            
            <View style={{height:30}}></View>
        </Body>
    );
}

const styles = StyleSheet.create({
    dflex:{
        display:'flex',
        alignItems:'center',
        
    },
    filterbtn:{
        paddingVertical:5,
        paddingHorizontal:20,
        backgroundColor:'grey',
        borderRadius:3

    }
    
    
})

export default Records;

