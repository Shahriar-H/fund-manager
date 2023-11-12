import React,{useEffect,useState} from 'react';
import { Image, View ,StyleSheet, Text, TextInput, TouchableOpacity,RefreshControl,ActivityIndicator} from 'react-native';
import AllHeader from '../components/AllHeader';
import { Body } from '../styles/AdduserStyle';
import { useNavigation } from '@react-navigation/native';

import ApiUrl from './config';
import UserComponent from '../components/User';

const UserList =  () => {
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();
    const [ALlUsers, setALlUsers] = useState();
    const [isLoading, setisLoading] = useState(true);
    let content;



    const allUsers = async ()=>{
        try {
            const usersRes = await fetch(ApiUrl+"users")
            users = await usersRes.json()
            
            //console.log(users?.results);
            content = users && users?.results;

            const items = content?.map((user,index)=> <UserComponent key={index} name={user?.name} phone={user?.phone} address={user?.address} id={user?.id} refr = {onRefresh}/>)
            
            setALlUsers(items)
            setisLoading(false)
    
        } catch (error) {
            console.log(error)
        }
    }


    const onRefresh = () => {
        setRefreshing(true);
        allUsers()
        // perform any tasks needed to refresh the content here
        setRefreshing(false);
    }

    

    useEffect(() => {
        allUsers()
        console.log(ALlUsers)
    }, []);
    
    
    return (
        <Body refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          } >
            <AllHeader title="All Members"/>
            {
                ALlUsers&&(
                    ALlUsers.map((user)=>{
                        return user
                    })
                    
                )
                
            }
            {
                ALlUsers?.length<=0&&<Text style={{textAlign:'center',marginTop:30}}>No User Found</Text>
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
    
    
})

export default UserList;

