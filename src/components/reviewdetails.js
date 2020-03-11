import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { Header, Card } from 'react-native-elements';

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
        console.log(this.state.data);
        return (
            <View>
                <Text>
                    ini detail
                </Text>
            </View>
        );
    }
}

const mapStateToProps = ({ restaurantDetails, reviewdetails }) => {
    return { restaurantDetails, reviewdetails }
}


export default connect(mapStateToProps)(reviewdetail);