import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Header, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { initreviewdetail, getreviewlist } from '../actions';
import axios from 'axios';
import { Icon, Button } from 'native-base'

class RestaurantDetails extends React.Component {
    state = { username: '', rating: '', time: '', text: '', star: '' }
    componentDidMount() {
        // this.props.getreviewlist()
        // var rese = (this.props.reviewdetails.review)
        // var myJSON = JSON.stringify(rese)
        // var myJSON = JSON.stringify(rese)
        var restoran = this.props.restaurantDetails.id
        console.log(this.props.restaurantDetails.id);
        axios.get(`https://developers.zomato.com/api/v2.1/reviews?res_id=${restoran}&start=1&count=2`, {
            headers: {
                "user-key": "75162bb707dfc9544420513e4f7bb699"
            }
        }).then((res) => {
            console.log(res.data.user_reviews[0].review.rating_text);
            this.setState({
                username: res.data.user_reviews[0].review.user.name,
                rating: res.data.user_reviews[0].review.rating_text,
                time: res.data.user_reviews[0].review.review_time_friendly,
                text: res.data.user_reviews[0].review.review_text,
                star: res.data.user_reviews[0].review.rating
            })
        })
    }

    reviewtItemPress = (review) => {
        // this.props.initreviewdetail(review)
        // this.props.navigation.navigate('RestaurantDetails')
    }

    render() {
        // var awal = (this.props.reviewdetails.review)
        // // var rese = (this.props.reviewdetails.review[0].review)
        // var myJSON = JSON.stringify(awal)
        // console.log(myJSON + 'yang ini');
        console.log(this.state.data + ' dirender');
        return (
            <ScrollView>
                <Header
                    placement='left'
                    centerComponent={{
                        text: this.props.restaurantDetails.name,
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
                        title={this.props.restaurantDetails.name + `\n(Rating : ${this.props.restaurantDetails.user_rating.aggregate_rating})`}
                        image={{ uri: this.props.restaurantDetails.featured_image }}
                        wrapperStyle={{ justifyContent: 'center', alignItems: 'center' }}
                        imageWrapperStyle={{ width: '100%' }}
                        imageStyle={{ height: 250 }}
                    >
                        <Text style={{
                            marginBottom: 10,
                            fontSize: 18,
                            textDecorationLine: 'underline'
                        }}>
                            Address
                        </Text>
                        <Text style={{ marginBottom: 10 }}>
                            {this.props.restaurantDetails.location.address}
                            {/* {this.props.reviewdetails.review[0].review.review_text} */}
                        </Text>
                        <Text style={{
                            marginBottom: 10,
                            fontSize: 18,
                            textDecorationLine: 'underline'
                        }}>
                            Cuisines
                        </Text>
                        <Text style={{ marginBottom: 10 }}>
                            {this.props.restaurantDetails.cuisines}
                        </Text>
                        <Text style={{
                            marginBottom: 10,
                            fontSize: 18,
                            textDecorationLine: 'underline'
                        }}>
                            Open Schedule
                        </Text>
                        <Text style={{ marginBottom: 10 }}>
                            {this.props.restaurantDetails.timings}
                        </Text>
                        <Text style={{
                            marginBottom: 10,
                            fontSize: 18,
                            textDecorationLine: 'underline'
                        }}>
                            Avg Cost for 2 Persons
                        </Text>
                        <Text style={{ marginBottom: 10 }}>
                            {this.props.restaurantDetails.currency}{this.props.restaurantDetails.average_cost_for_two}
                        </Text>
                    </Card>
                    <Card>
                        <Text>
                            {this.state.username}
                        </Text>
                        <Text><Icon
                            type='FontAwesome'
                            name='star'
                            style={{
                                fontSize: 10,
                                color: 'gold'
                            }}
                        />
                            {this.state.star}
                            ({this.state.rating})
                            {this.state.time}
                        </Text>
                        <Text>

                        </Text>
                        <Text>
                            {this.state.text}
                        </Text>
                        <Button onPress={() => this.props.navigation.navigate('reviewdetail')}>
                        </Button>
                    </Card>
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = ({ restaurantDetails, reviewdetails }) => {
    return { restaurantDetails, reviewdetails }
}

export default connect(mapStateToProps, { getreviewlist })(RestaurantDetails);