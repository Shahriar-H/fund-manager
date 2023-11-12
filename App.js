// In App.js in a new project

import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/Home';
import AddUser from './pages/AddUser';
import AddMoney from './pages/AddMoney';
import Expence from './pages/Expence';
import UserList from './pages/UserList';
import Records from "./pages/Records"

function HomeScreen({navigation}) {
  return <Home/>
}
function AddUserScreen() {
  return <AddUser/>
}
function AddMoneyScreen() {
  return <AddMoney/>
}
function ExpenceScreen() {
  return <Expence/>
}

function UsersScreen(){
  return <UserList/>
}
function RecordsScreen(){
  return <Records/>
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen options={{headerShown:false}} name="Home" component={HomeScreen} />
        <Stack.Screen options={{headerShown:false}} name="Adduser" component={AddUserScreen} />
        <Stack.Screen options={{headerShown:false}} name="AddMoney" component={AddMoneyScreen} />
        <Stack.Screen options={{headerShown:false}} name="Expence" component={ExpenceScreen} />
        <Stack.Screen options={{headerShown:false}} name="Users" component={UsersScreen} />
        <Stack.Screen options={{headerShown:false}} name="Records" component={RecordsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;