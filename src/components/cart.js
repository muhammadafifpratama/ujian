import React, { Component } from 'react';
import { View, FlatList, Button, TouchableOpacity, Text } from 'react-native';
import { Header } from 'react-native-elements';
import Table from './cartable'
import axios from 'axios'
import { mysqlapi } from '../helper/url'
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, DrawerActions } from '@react-navigation/native';

class Cart extends Component {
    state = { data: [], totalharga: 0, loading: true, username: "", saldo: 0 }

    async componentDidMount() {
        let username = await AsyncStorage.getItem('nama')
        let response = await axios.get(mysqlapi + 'cart/' + username)
        let saldo = await axios.get(mysqlapi + 'profile/' + username)
        console.log(saldo.data[0].saldo);
        var i = 0;
        var j = 0
        for (i = 0; i < response.data.length; i++) {
            j += response.data[i].harga;
        }
        this.setState({ data: response.data, totalharga: j, loading: false, username: username, saldo: saldo.data[0].saldo })
        // console.log(response.data);
        // console.log(response.data[0]);
    }

    deletecart = (idcart) => {
        let username = this.state.username
        axios.delete(mysqlapi + 'cart/' + idcart)
            .then((res) => {
                console.log(username)
                axios.get(mysqlapi + 'cart/' + username)
                    .then((res) => {
                        // console.log(res.data + "kosong");
                        var i = 0;
                        var j = 0
                        for (i = 0; i < res.data.length; i++) {
                            j += res.data[i].harga;
                        }
                        this.setState({ data: res.data, totalharga: j })
                        alert('Delete Successful!')
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => { this.deletecart(item.idcart) }} >
                <Table data={item} />
            </TouchableOpacity>
        )
    }

    onloading = () => {
        let username = this.state.username
        axios.get(mysqlapi + 'cart/' + username)
            .then((res) => {
                console.log(res.data + "kosong");
                var i = 0;
                var j = 0
                for (i = 0; i < res.data.length; i++) {
                    j += res.data[i].harga;
                }
                this.setState({ data: res.data, totalharga: j })
            })
    }

    render() {
        return (
            <View>
                <Header
                    rightComponent={{
                        text: `saldo anda : ${this.state.saldo}`,
                        style: { color: 'white', fontSize: 18, fontWeight: '700' }
                    }}
                    leftComponent={{
                        icon: 'ticket-account',
                        color: 'white',
                        type: 'material-community'
                    }}
                    containerStyle={{
                        backgroundColor: 'tomato',
                        justifyContent: 'space-around',
                        elevation: 2,
                        marginTop: Platform.OS === 'ios' ? 0 : - 25
                    }}
                    rightContainerStyle={{
                        flex: 3
                    }}
                />
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.id}
                    onRefresh={() => { this.onloading() }}
                    refreshing={this.state.loading}
                >
                </FlatList>
                <Text>
                    Total price : Rp. {this.state.totalharga}
                </Text>
                <Button title="Confirm Order" ></Button>
            </View>
        )
    }
}

export default Cart;