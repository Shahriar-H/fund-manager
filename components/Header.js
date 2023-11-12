import React,{useEffect,useState} from 'react'
import { View,Text,ToastAndroid, TouchableOpacity } from 'react-native'
import { HeaderView,AvailableBalace,Bdt,BdtDiv,Ammount,Div,AccountType,ActivityIndicator } from '../styles/HeaderStyle';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faRefresh,faBars } from '@fortawesome/free-solid-svg-icons'

import ApiUrl from '../pages/config';
import {text} from 'react-native-communications'

export default function Header() {
  const [Alldata, setAlldata] = useState({});
  const [isLoading, setisLoading] = useState(true);
 
  
  
  function sendThesms() {
      text('01303954432',"Shahriar,");
  }
  const getMoneyAmmount = async ()=>{
    try {
      const allResult = await fetch(ApiUrl+"records");
      let resp = await allResult.json();
      const resps = resp?.results;
      let bank= 0;
      let cash = 0;
      let mbank = 0;
      let total = 0;
      let expence=0;
      
      resps?.forEach((data)=>{
        if(data?.type.toLowerCase()==='bank' && data?.status==='add'){
          bank += data?.amount;
        }else if(data?.type.toLowerCase()==='mobile bank' && data?.status==='add'){
          mbank += data?.amount;
        }else if(data?.type.toLowerCase()==='cash' && data?.status==='add'){
          cash += data?.amount;
        }
        if(data?.status==='add'){
         
          total += data?.amount;
          
        }
        if(data?.status==='expence'){
          expence += data?.amount;
          
        }

        if(data?.type.toLowerCase()==='bank' && data?.status==='expence'){
          bank -= data?.amount;
        }else if(data?.type.toLowerCase()==='mobile bank' && data?.status==='expence'){
          mbank -= data?.amount;
        }else if(data?.type.toLowerCase()==='cash' && data?.status==='expence'){
          cash -= data?.amount;
          
        }
        
      })
      console.log(total);
      setAlldata({
        cash,
        mbank,
        bank,
        total,
        expence
      })
      ToastAndroid.show('Refreshed', ToastAndroid.LONG);
     

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMoneyAmmount()
  }, []);
  
  return (
    <HeaderView>

          <View>
            <AvailableBalace>Available balance is</AvailableBalace>
          </View>
          <View>
            <Div>
              <BdtDiv>
                  <Bdt>৳</Bdt>
              </BdtDiv>
              <Ammount>{Alldata?.total - Alldata?.expence>=0?Alldata?.total - Alldata?.expence:0}</Ammount>
            </Div>
            
            <TouchableOpacity onPress={sendThesms}>
              <Text style={{color:'#6A769F',fontSize:13, textAlign:"center"}}>Powered by- Creative Muslims</Text>
              <Text style={{fontSize:13,fontWeight:'bold',textAlign:'center',marginBottom:20}}>
                Developed by Shahriar Hussain
              </Text>
            </TouchableOpacity>
            

          </View>

          <Div>
              <AccountType>
                <View>
                  <Text style={{color:'white',fontSize:19,textAlign:"center"}}>{Alldata?.total - Alldata?.expence<0?Alldata?.total - Alldata?.expence:0}</Text>
                  <Text style={{textAlign:'center'}}>Debit </Text>
                </View>
                <View>
                  <Text style={{color:'white',fontSize:19,textAlign:"center"}}>{Alldata?.total - Alldata?.expence>=0?Alldata?.total - Alldata?.expence:0}</Text>
                  <Text style={{textAlign:'center'}}>Credit</Text>
                </View>
                
                <TouchableOpacity onPress={getMoneyAmmount} >
                  <FontAwesomeIcon style={{marginTop:11}} color="white" icon={ faRefresh } size={25}/>
                </TouchableOpacity>
                
              </AccountType>
          </Div>
          {/* <FloatigBtn fbtn={showFloatBnt}/> */}
    </HeaderView >
  )
}
