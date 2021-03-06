import React from 'react';
import { View, Text, StyleSheet, Platform, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { getHomeListPost, initRestaurantDetails } from '../actions';
import IconHome from './IconHome';
import RestaurantCard from './RestaurantCard';
import AsyncStorage from '@react-native-community/async-storage';

class Home extends React.Component {
    state = { namauser: '' }
    componentDidMount() {
        this.props.getHomeListPost()
        const username = AsyncStorage.getItem('username');
        const ngetes = AsyncStorage.getItem('nama')
            .then((res) => {
                this.setState({
                    namauser: res
                })
            })
    }

    restaurantItemPress = (resto) => {
        this.props.initRestaurantDetails(resto)
        this.props.navigation.navigate('RestaurantDetails')
    }


    render() {
        return (
            <View style={styles.containerStyle}>
                <Header
                    rightComponent={{
                        text: `Hallo,${this.state.namauser}`,
                        style: { color: 'white', fontSize: 18, fontWeight: '700' }
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
                    data={this.props.homeListPost.listPost}
                    renderItem={({ item }) => (
                        <TouchableWithoutFeedback
                            onPress={() => this.restaurantItemPress(item)}
                        >
                            <View style={{ width: '50%' }}>
                                <RestaurantCard data={item} />
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                    keyExtractor={item => item.name}
                    style={{ width: '98%' }}
                    numColumns={2}
                    onRefresh={() => this.props.getHomeListPost()}
                    refreshing={this.props.homeListPost.loading}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center'
    }
})

const mapStateToProps = ({ homeListPost, user }) => {
    return {
        homeListPost,
        user
    }
}

export default connect(mapStateToProps, { getHomeListPost, initRestaurantDetails })(Home);