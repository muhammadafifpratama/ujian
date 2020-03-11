import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Icon, Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { 
    onInputText, 
    onUserEnter,
    userEnterCheck
} from '../actions';

class LoginForm extends Component {

    componentDidMount() {
        this.props.userEnterCheck();
    }

    componentDidUpdate() {
        if (this.props.user.username) {
            this.props.navigation.dispatch(StackActions.replace('TabMenu'));
        } 
    }

    onBtnEnterPress = () => {
        this.props.onUserEnter(this.props.loginForm)
    }

    render() {
        if(this.props.user.authChecked && !this.props.user.username) {
            return (
                <View style={styles.containerStyle}>
                    <Animatable.View animation={'fadeInDown'} duration={2000}>
                        <Text h3 style={{ color: 'tomato'}}>TomatoApp</Text>
                        <Icon 
                            name='food'
                            size={80}
                            type='material-community'
                            color='tomato' 
                        />
                    </Animatable.View>
                    <View style={styles.inputContainerStyle}>
                        <Input
                            placeholder='Username'
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
                    </View>
                    <Text style={{ color: 'red' }}>{this.props.loginForm.error}</Text>
                    <Button
                        title="Enter"
                        containerStyle={{ width: '95%', marginBottom: 10 }}
                        buttonStyle={{ backgroundColor: 'tomato', color: 'white' }}
                        onPress={this.onBtnEnterPress}
                        loading={this.props.loginForm.loading}
                    />
                </View>
            )
        }
        
        return (
            <View style={styles.containerSplashStyle}>        
                <Text h3 style={{ color: 'white' }}>TomatoApp</Text>
                <Icon 
                    name='food'
                    size={80}
                    type='material-community'
                    color='white' 
                />
            </View>
        )
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
})(LoginForm);