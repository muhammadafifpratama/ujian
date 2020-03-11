import React, { Component } from 'react';
import { View, Text, FlatList, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { Header, Card } from 'react-native-elements';
import { Icon, Button } from 'native-base'

class reviewdetail extends Component {
    state = { data: [] }
    componentDidMount() {
        var restoran = this.props.restaurantDetails.id
        console.log(this.props.restaurantDetails.id);
        axios.get(`https://developers.zomato.com/api/v2.1/reviews?res_id=${restoran}&start=1&count=10`, {
            headers: {
                "user-key": "75162bb707dfc9544420513e4f7bb699"
            }
        }).then((res) => {
            console.log(res.data.user_reviews[0].review.rating_text);
            this.setState({ data: res.data.user_reviews })
        })
    }
    render() {
        var asd = this.state.data[0]
        // console.log(this.state.data[0] + 'yang ini');
        var myJSON = JSON.stringify(asd)
        console.log(myJSON + 'yang ini');
        return (
            <View>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <View style={{ width: '50%' }}>
                            <Card data={item}>
                                <Text>
                                    {item.review.user.name}
                                    <Icon
                                        type='FontAwesome'
                                        name='star'
                                        style={{
                                            fontSize: 10,
                                            color: 'gold'
                                        }}
                                    />
                                    {item.review.rating}
                                    ({item.review.rating_text})
                                    {item.review.review_time_friendly}
                                    {item.review.review_text}
                                </Text>
                            </Card>
                        </View>
                    )}
                    // keyExtractor={item => item.restaurant.name}
                    style={{ width: '98%' }}
                />
            </View>
        );
    }
}

const mapStateToProps = ({ restaurantDetails, reviewdetails }) => {
    return { restaurantDetails, reviewdetails }
}


export default connect(mapStateToProps)(reviewdetail);