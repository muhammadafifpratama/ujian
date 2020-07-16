import React from 'react'
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, View } from 'native-base';
import { Image } from 'react-native'


const RestaurantCard = ({ data }) => {
    return (
        <Card>
            <View style={{ borderTopStartRadius: 20 }}>
                <Image
                    source={{ uri: data.header_image }}
                    style={{ height: 200, width: "100%" }}
                />
            </View>
            <CardItem style={{ marginTop: -10 }}>
                <Left>
                    <Text
                        style={{
                            fontSize: 10,
                            color: 'black'
                        }}
                    >
                        Rp. {(data.final_price/100)}
                    </Text>
                </Left>
            </CardItem>
            <CardItem style={{ marginTop: -15 }}>
                <Text
                    style={{
                        fontWeight: 'bold',
                        marginRight: 5,
                        fontSize: 13
                    }}
                >
                    {data.name}
                </Text>
            </CardItem>
        </Card>

    )
}

export default RestaurantCard;