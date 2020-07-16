import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button,Input, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import { onUserLogout } from '../actions';

class LogOutPage extends React.Component {
    componentDidUpdate() {
        if(!this.props.user.username) {
            const resetAction = CommonActions.reset({
                index: 0,
                routes: [
                    { name: 'Login' }
                ]
            });
            this.props.rootStackNavigation.dispatch(resetAction);
        }
    }

    cekvocer = () => {
        let code = this.state.voucher
        console.log(this.state.voucher);
        Axios.post(mysqlapi + 'voucher', {
            code
        }).then(res => {
            if (res.data.length === 0) {
                alert("voucher is not found or has been used or expired")
            }
            else {
                console.log(res.data[0].status);
                if (res.data[0].status == 'unused') {
                    let username = this.state.profile.username
                    let saldo = this.state.profile.saldo + res.data[0].value
                    Axios.patch(mysqlapi + 'saldo', {
                        username,
                        saldo
                    }).then(a => {
                        alert("voucher has been successfully redeemed")
                        Axios.patch(admin + 'saldo', {
                            code
                        })
                    })
                }
                else {
                    alert("voucher is not found or has been used or expired")
                }
            }
            console.log(res.data.length)
        }).catch(err => {

        })
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <Input
                            placeholder='masukan kode vocer'
                            leftIcon={
                                <Icon
                                    name='user'
                                    size={24}
                                    type='feather'
                                    color='tomato'
                                />
                            }

                        />
                    <Button
                        title="Enter"
                        containerStyle={{ width: '95%', marginBottom: 10 }}
                        buttonStyle={{ backgroundColor: 'tomato', color: 'white' }}
                        onPress={this.onBtnEnterPress}
                    />
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

const mapStateToProps = ({ user }) => {
    return { user }
}

export default connect(mapStateToProps, { onUserLogout })(LogOutPage);