import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import { onUserLogout, onInputText } from '../actions';
import AsyncStorage from '@react-native-community/async-storage';

class LogOutPage extends React.Component {
    componentDidUpdate() {
        if (!this.props.user.username) {
            const resetAction = CommonActions.reset({
                index: 0,
                routes: [
                    { name: 'Login' }
                ]
            });
            this.props.rootStackNavigation.dispatch(resetAction);
        }
    }

    render() {
        console.log(this.props.loginForm.voucher);
        return (
            <View style={styles.containerStyle}>
                <Button
                    title="Log Out"
                    containerStyle={{
                        marginVertical: 15,
                        borderWidth: 0.5,
                        borderColor: 'tomato',
                        width: '90%'
                    }}
                    titleStyle={{ color: 'tomato' }}
                    type='outline'
                    onPress={this.props.onUserLogout}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const mapStateToProps = ({ user, loginForm }) => {
    return { user, loginForm }
}

export default connect(mapStateToProps, { onUserLogout, onInputText })(LogOutPage);