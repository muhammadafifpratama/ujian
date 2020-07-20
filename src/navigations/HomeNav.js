import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../components/Home';
import RestaurantDetails from '../components/RestaurantDetails';
import reviewdetail from '../components/reviewdetails'

const Stack = createStackNavigator()

export default (props) => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      headerMode="none"
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="RestaurantDetails" component={RestaurantDetails} />
      <Stack.Screen name="reviewdetail" component={reviewdetail} />
    </Stack.Navigator>
  )
}