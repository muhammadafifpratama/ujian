import React from 'react';
import { Button, View } from 'react-native'
import { Row } from 'react-native-table-component';

const RestaurantCard = ({ data }) => {
    return (
        <View>
            <Row data={[data.namagame, data.harga]} />
            <Button title="delete" onPress={() =>console.log(data.idcart)} />
        </View>
    )
}

export default RestaurantCard;