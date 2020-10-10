import React, { Component } from 'react';
import { View, FlatList, Button, TouchableOpacity, Text } from 'react-native';
import Table from './cartable'
import axios from 'axios'
import { mysqlapi } from '../helper/url'
import AsyncStorage from '@react-native-community/async-storage';

class Inventory extends Component {
    state = { data: [], loading: true, username: "" }

    async componentDidMount() {
        let username = await AsyncStorage.getItem('nama')
        let response = await axios.get(mysqlapi + 'inventory/' + username + '/0')
        console.log(response.data);
        this.setState({ data: response.data, username: username, loading: false })
    }

    renderItem = ({ item }) => {
        return (
            <Table data={item} />
        )
    }

    onloading = () => {
        let username = this.state.username
        axios.get(mysqlapi + 'inventory/' + username + '/0')
            .then((res) => {
                this.setState({ data: res.data })
            })
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.id}
                    onRefresh={() => { this.onloading() }}
                    refreshing={this.state.loading}
                >
                </FlatList>
            </View>
        );
    }
}

export default Inventory;