import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginForm from '../components/LoginForm';
import TabNav from './TabNav';

const Stack = createStackNavigator()

export default (props) => {
    return (
        <Stack.Navigator 
          initialRouteName="Login"
          headerMode="none"
        >
          <Stack.Screen name="Login" component={LoginForm} />
          <Stack.Screen name="TabMenu" component={TabNav} />
        </Stack.Navigator>
    )
}