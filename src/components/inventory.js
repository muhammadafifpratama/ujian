import React, { Component } from 'react';
import { View, FlatList, Button, TouchableOpacity, Text } from 'react-native';
import Table from './cartable'
import axios from 'axios'
import { mysqlapi } from '../helper/url'
import AsyncStorage from '@react-native-community/async-storage';

class Inventory extends Component {
    state = { data: [] }

    async componentDidMount() {
        let username = await AsyncStorage.getItem('nama')
        let response = await axios.get(mysqlapi + 'inventory/' + username)
        this.setState({ data: response.data })
    }

    renderItem = ({ item }) => {
        return (
            <Table data={item} />
        )
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.id}
                >
                </FlatList>
            </View>
        );
    }
}

export default Inventory;