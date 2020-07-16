import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginForm from '../components/LoginForm';
import TabNav from './TabNav';
import forgot from '../components/forgotpassword';
import register from '../components/register';

const Stack = createStackNavigator()

export default (props) => {
    return (
        <Stack.Navigator 
          initialRouteName="Login"
          headerMode="none"
        >
          <Stack.Screen name="Login" component={LoginForm} />
          <Stack.Screen name="TabMenu" component={TabNav} />
          <Stack.Screen name="forgotpassword" component={forgot} />
          <Stack.Screen name="register" component={register} />
        </Stack.Navigator>
    )
}