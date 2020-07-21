import React, { Component } from 'react';
import { Text, Input, Icon, Button } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { StackActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import {
    onInputText,
    onUserEnter,
    userEnterCheck
} from '../actions';
import Axios from 'axios';
import {mysqlapi} from '../helper/url';
import { Header } from 'react-native-elements';

class Forgot extends Component {

    onbtnclick = () => {
        let email = this.state.email
    }

    onBtnEnterPress = () => {
        let email = this.props.loginForm.email
        Axios.post(mysqlapi + 'kirimemail', {
            email
        }).catch((err) => {
            var error = JSON.stringify(err.response.data.message);
            console.log(err.response.data.message);
            alert(error)
        }).then((res) => {
            if (res === undefined) {
                alert('email gagal terkirim');
            }
            else {
                alert('email terkirim')
            }
        })
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
                        placeholder='please input asociated email'
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
})(Forgot);