import React, { Component } from 'react';
import { Text, Input, Icon, Button } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { StackActions } from '@react-navigation/native';
import {
    onInputText,
    onUserEnter,
    userEnterCheck
} from '../actions';
import Axios from 'axios';
import { mysqlapi } from '../helper/url';
import { Header } from 'react-native-elements';

class Register extends Component {

    onbtnclick = () => {
        let { email, username, password, repassword } = this.props.loginForm
        if (password !== repassword) {
            alert('pastikan password dan confirm password sama')
        }
        else if (username === '' || password === '' || repassword === '' || email === '') {
            alert('please Fill in all the forms')
        }
        else {
            console.log(email, username, password, repassword);
            Axios.post(mysqlapi + 'register', {
                username,
                email,
                password
            }).catch((err) => {
                var error = JSON.stringify(err.response.data.message);
                console.log(err.response.data);
                alert(error)
            }).then((res) => {
                if (res === undefined) {
                    alert('registration unsuccessfull')
                }
                else {
                    alert('registration successfull')
                }
            })
        }
    }
    tologin = () => {
        this.props.navigation.dispatch(StackActions.replace('Login'))
    }
    render() {
        return (
            <View style={styles.containerStyle}>
                {/* <Header
                    leftComponent={{
                        icon: 'arrow-back',
                        color: 'white',
                        onPress: () => this.props.navigation.goBack()
                    }}
                    containerStyle={{
                        backgroundColor: 'tomato',
                        justifyContent: 'space-around',
                        elevation: 2,
                        marginTop: Platform.OS === 'ios' ? 0 : - 25
                    }}
                /> */}
                <Animatable.View animation={'fadeInDown'} duration={2000}>
                    <Text h3 style={{ color: 'tomato' }}>TomatoApp</Text>
                    <Icon
                        name='food'
                        size={80}
                        type='material-community'
                        color='tomato'
                    />
                </Animatable.View>
                <View style={styles.inputContainerStyle}>
                    <Input
                        placeholder='username'
                        leftIcon={
                            <Icon
                                name='user'
                                size={24}
                                type='feather'
                                color='tomato'
                            />
                        }
                        value={this.props.loginForm.username}
                        onChangeText={(val) => this.props.onInputText('username', val)}
                    />
                    <Input
                        placeholder='email'
                        leftIcon={
                            <Icon
                                name='mail'
                                size={24}
                                type='feather'
                                color='tomato'
                            />
                        }
                        value={this.props.loginForm.email}
                        onChangeText={(val) => this.props.onInputText('email', val)}
                    />
                    <Input
                        placeholder='password'
                        leftIcon={
                            <Icon
                                name='lock'
                                size={24}
                                type='feather'
                                color='tomato'
                            />
                        }
                        value={this.props.loginForm.password}
                        onChangeText={(val) => this.props.onInputText('password', val)}
                    />
                    <Input
                        placeholder='repeat password'
                        leftIcon={
                            <Icon
                                name='lock'
                                size={24}
                                type='feather'
                                color='tomato'
                            />
                        }
                        value={this.props.loginForm.repassword}
                        onChangeText={(val) => this.props.onInputText('repassword', val)}
                    />
                </View>
                <Button
                    title="confirm"
                    containerStyle={{ width: '95%', marginBottom: 10 }}
                    buttonStyle={{ backgroundColor: 'tomato', color: 'white' }}
                    onPress={this.onbtnclick}
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

const mapStateToProps = ({ user, loginForm }) => {
    return { user, loginForm }
}

export default connect(mapStateToProps, {
    onInputText,
    onUserEnter,
    userEnterCheck
})(Register);