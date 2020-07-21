import React, { Component } from 'react';
import { Text, Input, Icon, Button } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { onInputText } from '../actions';
import Axios from 'axios';
import { mysqlapi } from '../helper/url';
import AsyncStorage from '@react-native-community/async-storage';

class Profile extends Component {
    state = { username: "", saldo: 0 }

    async componentDidMount() {
        let username = await AsyncStorage.getItem('nama')
        let profile = await Axios.get(mysqlapi + 'profile/' + username)
        let saldo = profile.data[0].saldo
        this.setState({ username: username, saldo: saldo })
    }

    onBtnEnterPress = () => {
        let code = this.props.loginForm.voucher
        Axios.post(mysqlapi + 'voucher', {
            code
        }).then(res => {
            if (res.data.length === 0) {
                alert("voucher is not found ")
            }
            else if (res.data[0].status == 'used') {
                alert("voucher is already been used ")
            }
            else {
                let username = this.state.username
                let saldo = this.state.saldo + res.data[0].value
                Axios.patch(mysqlapi + 'saldo', {
                    username, saldo
                })
                alert("oke saldo masuk")
                Axios.patch('http://192.168.1.10:2000/admin/saldo', {
                    code
                })
            }
        })
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <View style={styles.inputContainerStyle}>
                    <Input
                        placeholder='please input asociated email'
                        leftIcon={
                            <Icon
                                name='mail'
                                size={24}
                                type='feather'
                                color='tomato'
                            />
                        }
                        value={this.props.loginForm.voucher}
                        onChangeText={(val) => this.props.onInputText('voucher', val)}
                    />
                </View>
                <Button
                    title="Confirm"
                    containerStyle={{ width: '95%', marginBottom: 10 }}
                    buttonStyle={{ backgroundColor: 'tomato', color: 'white' }}
                    onPress={this.onBtnEnterPress}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerSplashStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'tomato'
    },
    containerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    inputContainerStyle: {
        marginTop: 50,
        marginBottom: 100,
        width: '100%'
    }
})

const mapStateToProps = ({ loginForm }) => {
    return { loginForm }
}

export default connect(mapStateToProps, { onInputText })(Profile);