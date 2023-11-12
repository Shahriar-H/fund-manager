import React,{} from 'react';
import { View,StyleSheet,Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAdd, faUser,faUserCheck,faHistory,faExplosion,faRocket } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native';
useNavigation


const Options = () => {
    const navigation = useNavigation();
    return (
        <View>
        <View style={{...styles.cardDiv,marginTop:50}}>
            <TouchableOpacity onPress={() => navigation.push('AddMoney')}>
                <View style={styles.card}>
                    <View style={styles.keepIconCenter}>
                        <FontAwesomeIcon style={styles.iconStyle}  color="black" icon={ faAdd } size={45}/>
                    </View>
                    <Text style={styles.cardTitle}>Add Money</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.push('Adduser')}>
                <View style={styles.card}>
                    <View style={styles.keepIconCenter}>
                        <FontAwesomeIcon style={styles.iconStyle}  color="black" icon={ faUser } size={45}/>
                    </View>
                    <Text style={styles.cardTitle}>Add User</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.push('Users')}>
                <View style={styles.card}>
                    <View style={styles.keepIconCenter}>
                        <FontAwesomeIcon style={styles.iconStyle}  color="black" icon={ faUserCheck } size={45}/>
                    </View>
                    <Text style={styles.cardTitle}>Users List</Text>
                </View>
            </TouchableOpacity>
        </View>
        <View style={{...styles.cardDiv,justifyContent:'flex-start'}}>
            <TouchableOpacity onPress={() => navigation.push('Records')}>
                <View style={{...styles.card,marginRight:15}}>
                    <View style={styles.keepIconCenter}>
                        <FontAwesomeIcon style={styles.iconStyle}  color="black" icon={ faHistory } size={45}/>
                    </View>
                    <Text style={styles.cardTitle}>Records</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.push('Expence')}>
                <View style={styles.card}>
                    <View style={styles.keepIconCenter}>
                        <FontAwesomeIcon style={styles.iconStyle}  color="black" icon={ faExplosion } size={45}/>
                    </View>
                    <Text style={styles.cardTitle}>Expence</Text>
                </View>
            </TouchableOpacity>
            {/* <TouchableOpacity>
                <View style={styles.card}>
                    <View style={styles.keepIconCenter}>
                        <FontAwesomeIcon style={styles.iconStyle}  color="black" icon={ faRocket } size={45}/>
                    </View>
                    <Text style={styles.cardTitle}>Send Notif.</Text>
                </View>
            </TouchableOpacity> */}
            
            
        </View>
        </View>
    );
}
const styles = StyleSheet.create({
    cardDiv:{
        display:'flex',
        justifyContent:"space-between",
        padding:20,
        flexDirection:"row",
        flexWrap:"wrap"
    },
    card:{
        height:110,
        width:110,
        shadowColor:"black",
        shadowOpacity:0.5,
        elevation:3,
        padding:14,
        backgroundColor:'white',
        marginBottom:15,
        textAlign:'center'
    },
    cardTitle:{
        textAlign:'center',
        paddingTop:15,
    },
    iconStyle:{
        textAlign:'center',
        color:"red"
    },
    keepIconCenter:{
        display:'flex',
        justifyContent:'center',
        flexDirection:'row',
        
    }

})

export default Options;
