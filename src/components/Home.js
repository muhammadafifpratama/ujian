import React from 'react';
import { View, Text, StyleSheet, Platform, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { getHomeListPost, initRestaurantDetails } from '../actions';
import IconHome from './IconHome';
import RestaurantCard from './RestaurantCard';

class Home extends React.Component {
    componentDidMount() {
        this.props.getHomeListPost()
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
                        text: `Hallo,${this.props.user.username}`,
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
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    paddingTop: 10
                }}>
                    <IconHome icons={'credit-card'} types={'entypo'} name={'Credit'} />
                    <IconHome icons={'food-variant'} types={'material-community'} name={'Variant'} />
                    <IconHome icons={'food-fork-drink'} types={'material-community'} name={'Recipe'} />
                    <IconHome icons={'location-pin'} types={'entypo'} name={'Location'} />
                    <IconHome icons={'shopping-cart'} types={'font-awesome'} name={'Cart'} />
                    <IconHome icons={'local-pizza'} types={'material'} name={'Pizza'} />
                    <IconHome icons={'hamburger'} types={'material-community'} name={'Burger'} />
                    <IconHome icons={'more-horizontal'} types={'feather'} name={'More'} />
                </View>
                <FlatList
                    data={this.props.homeListPost.listPost}
                    renderItem={({ item }) => (
                        <TouchableWithoutFeedback
                            onPress={() => this.restaurantItemPress(item.restaurant)}
                        >
                            <View style={{ width: '50%' }}>
                                <RestaurantCard data={item} />
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                    keyExtractor={item => item.restaurant.name}
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