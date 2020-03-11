import React from 'react'
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, View } from 'native-base';
import { Image } from 'react-native'


const RestaurantCard = ({ data })=>{
    return(
        <Card>
            <View style={{ borderTopStartRadius: 20 }}>
                <Image 
                    source={{ uri:data.restaurant.featured_image }} 
                    style={{ height: 200, width:"100%" }}
                />
            </View>            
            <CardItem style={{ marginTop:-10 }}>
                <Left>
                    <Icon 
                        type='FontAwesome'
                        name='star' 
                        style={{ 
                            fontSize:10,
                            color:'gold' 
                        }} 
                    />
                    <Text 
                        style={{
                            fontSize:10,
                            color:'black'
                        }}
                    >
                        {data.restaurant.user_rating.aggregate_rating}
                    </Text>
                </Left>
            </CardItem>
            <CardItem style={{ marginTop: -15 }}>
                <Text 
                    style={{
                        fontWeight:'bold',
                        marginRight:5,
                        fontSize:13
                    }}
                >
                    {data.restaurant.name} 
                </Text>
            </CardItem>
        </Card>
        
    )
}

export default RestaurantCard;