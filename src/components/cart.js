import React, { Component } from 'react';
import { View, FlatList, Button, TouchableOpacity, Text } from 'react-native';
import { Header } from 'react-native-elements';
import Table from './cartable'
import axios from 'axios'
import { mysqlapi } from '../helper/url'
import AsyncStorage from '@react-native-community/async-storage';

class Cart extends Component {
    state = { data: [], totalharga: 0, loading: true, username: "", saldo: 0, disabled: true }

    async componentDidMount() {
        let username = await AsyncStorage.getItem('nama')
        let response = await axios.get(mysqlapi + 'cart/' + username)
        let saldo = await axios.get(mysqlapi + 'profile/' + username)
        var i = 0;
        var j = 0
        for (i = 0; i < response.data.length; i++) {
            j += response.data[i].harga;
        }
        this.setState({ data: response.data, totalharga: j, loading: false, username: username, saldo: saldo.data[0].saldo })
        if (this.state.totalharga > 0) {
            this.setState({ disabled: false })
        }
    }

    keygenerator = () => {
        var asd1 = Math.random().toString(16).substr(0, 7).split('.');
        var asd2 = Math.random().toString(36).substr(0, 7).split('.');
        var asd3 = Math.random().toString(36).substr(0, 7).split('.');
        var key = asd1[1] + '-' + asd2[1] + '-' + asd3[1]
        return key
    }

    onBtnEnterPress = () => {
        console.log(this.state.data);
        let username = this.state.username
        let hargatotal = this.state.totalharga
        let saldo = this.state.saldo - hargatotal
        if (saldo < 0) {
            alert("saldonya kurang")
        }
        else {
            for (let i = 0; i < this.state.data.length; i++) {
                let namagame = this.state.data[i].namagame
                try {
                    let key = this.keygenerator()
                    axios.post(mysqlapi + 'transaction', {
                        username,
                        key,
                        namagame
                    })
                } catch (err) {
                    alert(err.response.data)
                }
            }
            axios.delete(mysqlapi + "transaction/" + username)
            alert("silahkan cek inventory")
            axios.patch(mysqlapi + saldo, {
                saldo,
                username
            })
            this.setState({ saldo: saldo })
        }
    }

    deletecart = (idcart) => {
        let username = this.state.username
        axios.delete(mysqlapi + 'cart/' + idcart)
            .then((res) => {
                axios.get(mysqlapi + 'cart/' + username)
                    .then((res) => {
                        var i = 0;
                        var j = 0
                        for (i = 0; i < res.data.length; i++) {
                            j += res.data[i].harga;
                        }
                        this.setState({ data: res.data, totalharga: j })
                        alert('Delete Successful!')
                        if (this.state.totalharga === 0) {
                            this.setState({ disabled: true })
                        }
                    })
            })
            .catch((err) => {
                alert(err)
            })
    }

    renderItem = ({ item }) => {
        return (
            <View>
                <Table data={item} />
                <Button title="delete" onPress={() => { this.deletecart(item.idcart) }} />
            </View>
        )
    }

    onloading = () => {
        let username = this.state.username
        axios.get(mysqlapi + 'cart/' + username)
            .then((res) => {
                var i = 0;
                var j = 0
                for (i = 0; i < res.data.length; i++) {
                    j += res.data[i].harga;
                }
                this.setState({ data: res.data, totalharga: j })
                if (this.state.totalharga > 0) {
                    this.setState({ disabled: false })
                }
                else if (this.state.totalharga === 0) {
                    this.setState({ disabled: true })
                }
            })
    }

    render() {
        return (
            <View>
                <Header
                    centerComponent={{
                        text: `saldo anda : Rp. ${this.state.saldo}`,
                        style: { color: 'white', fontSize: 18, fontWeight: '700' }
                    }}
                    rightComponent={{
                        icon: 'arrow-back',
                        color: 'white',
                        onPress: () => this.onloading()
                    }}
                    containerStyle={{
                        backgroundColor: 'tomato',
                        justifyContent: 'space-around',
                        elevation: 2,
                        marginTop: Platform.OS === 'ios' ? 0 : - 25
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
                <Button
                    title="Confirm Order"
                    containerStyle={{
                        backgroundColor: 'tomato',
                        justifyContent: 'space-around',
                        elevation: 2,
                        marginTop: Platform.OS === 'ios' ? 0 : - 25
                    }}
                    buttonStyle={{ backgroundColor: 'tomato', color: 'black' }}
                    onPress={this.onBtnEnterPress}
                    disabled={this.state.disabled}
                />
            </View>
        )
    }
}

export default Cart;