import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Header, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { initreviewdetail, getreviewlist } from '../actions';
import axios from 'axios';
import { Icon, Button } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage';
import { mysqlapi } from '../helper/url'

class RestaurantDetails extends React.Component {
    state = { nama: '', harga: '', gambar: '', developers: '', publishers: '', genre: "", description: "", username: "" }
    componentDidMount() {
        // const username = AsyncStorage.getItem('nama')
        //     .then((username) => {
        //         console.log(username);
        //         this.setState({
        //             username: username
        //         })
        //     })
        var id = this.props.restaurantDetails.id
        axios.get(`https://store.steampowered.com/api/appdetails?appids=${id}`)
            .then((res) => {
                this.setState({
                    nama: res.data[id].data.name,
                    harga: (res.data[id].data.price_overview.final / 100),
                    gambar: res.data[id].data.header_image,
                    developers: res.data[id].data.developers,
                    publishers: res.data[id].data.publishers,
                    genre: res.data[id].data.genres[0].description,
                    description: res.data[id].data.short_description,
                })
            })
    }

    addtocart = async () => {
        const username = await AsyncStorage.getItem('nama')
        let namagame = this.state.nama
        let harga = this.state.harga
        let response = await axios.post(mysqlapi + 'cart', {
            username,
            namagame,
            harga
        })
        alert('game has been added to cart ')
        console.log(username + namagame + harga);
        console.log(response);
    }

    render() {
        // console.log(this.state.username);
        return (
            <ScrollView>
                <Header
                    // rightComponent={{
                    //     text: `Hallo,${this.state.username}`,
                    //     style: { color: 'white', fontSize: 18, fontWeight: '700' }
                    // }}
                    placement='left'
                    centerComponent={{
                        text: this.state.nama,
                        style: { color: 'white', fontSize: 18, fontWeight: '700' }
                    }}
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
                />
                <View>
                    <Card
                        featuredTitle={this.state.nama}
                        image={{ uri: this.state.gambar }}
                        wrapperStyle={{ justifyContent: 'center', alignItems: 'center' }}
                        imageWrapperStyle={{ width: '100%' }}
                        imageStyle={{ height: 250, resizeMode: "cover", flex: 1 }}
                    >
                        <Text style={{
                            marginBottom: 10,
                            fontSize: 18,
                            textDecorationLine: 'underline'
                        }}>
                            Harga
                    </Text>
                        <Text style={{ marginBottom: 10 }}>
                            Rp. {this.state.harga}
                        </Text>
                        <Text style={{
                            marginBottom: 10,
                            fontSize: 18,
                            textDecorationLine: 'underline'
                        }}>
                            Developers
                    </Text>
                        <Text style={{ marginBottom: 10 }}>
                            {this.state.developers}
                        </Text>
                        <Text style={{
                            marginBottom: 10,
                            fontSize: 18,
                            textDecorationLine: 'underline'
                        }}>
                            Publishers
                    </Text>
                        <Text style={{ marginBottom: 10 }}>
                            {this.state.publishers}
                        </Text>
                        <Text style={{
                            marginBottom: 10,
                            fontSize: 18,
                            textDecorationLine: 'underline'
                        }}>
                            Genre
                    </Text>
                        <Text style={{ marginBottom: 10 }}>
                            {this.state.genre}
                        </Text>
                    </Card>
                </View>
                <Button
                    title="add to cart"
                    containerStyle={{ width: '95%', marginBottom: 10, backgroundColor: 'tomato', }}
                    buttonStyle={{ backgroundColor: 'tomato', color: 'tomato' }}
                    onPress={this.addtocart}
                />
            </ScrollView>
        )
    }
}

const mapStateToProps = ({ restaurantDetails, reviewdetails }) => {
    return { restaurantDetails, reviewdetails }
}

export default connect(mapStateToProps, { getreviewlist })(RestaurantDetails);