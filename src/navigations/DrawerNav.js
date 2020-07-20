import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from '../components/profile'
import TabNav from './TabNav';
import cart from '../components/cart'
import inventory from '../components/inventory'

const Drawer = createDrawerNavigator();

export default (props) => {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={TabNav} />
            <Drawer.Screen name="Cart" component={cart} />
            <Drawer.Screen name="Inventory" component={inventory} />
            <Drawer.Screen name="Voucher" component={Profile} />
        </Drawer.Navigator>
    );
};