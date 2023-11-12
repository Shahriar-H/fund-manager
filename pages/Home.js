import React,{useEffect,useState} from 'react';
import { View,Text,Button } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';

import Header from '../components/Header';
import Options from '../components/Options';
import { HomeView } from '../styles/HomeStyle';
import NoInternet from '../components/NoInternet';
import ApiUrl from './config';
import Intro from '../components/Intro';

const Home = () => {
    const netInfo = useNetInfo();
    const [isConnected, setisConnected] = useState(true);
    const [endEntro, setendEntro] = useState(false);

    const checkConnection = async ()=>{
        try {
            const responses = await fetch(ApiUrl+'records');
            const data = await responses.json();
            // console.log(data);
        } catch (error) {
            setisConnected(false)
            
            console.log(error);
        }
       
    }

    
    setTimeout(() => {
        setendEntro(true)
       
    }, 5000);
        
    

    useEffect(() => {
        checkConnection()
       
    }, []);

    return (
        <HomeView>
            {
                netInfo.isConnected&&isConnected?(<View>
                    <Header/>
                    <Options/>
                </View>):<NoInternet/>
            
            }
            {
                !endEntro&&<Intro/>
            }
            
            
           
        </HomeView>
    );
}

export default Home;
