import React, { Component } from 'react';
import { Text, Input, Icon, Button } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';

class Profile extends Component {
    state = {}
    render() {
        return (
            <View>
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
                        // value={this.props.loginForm.email}
                        // onChangeText={(val) => this.props.onInputText('email', val)}
                    />
                <Button
                    title="Confirm"
                    containerStyle={{ width: '100%', marginBottom: 10, marginTop:50 }}
                    buttonStyle={{ backgroundColor: 'tomato', color: 'white' }}
                    onPress={this.onBtnEnterPress}
                />
            </View>
        );
    }
}

export default Profile;