import React from 'react';
import { Button, View} from 'react-native'
import { Row, Table } from 'react-native-table-component';
import { connect } from "react-redux"
import { kirimid } from '../actions'

const RestaurantCard = ({ data }) => {
    return (
        <View>
            <Table borderStyle={{ borderColor: 'black' }}>
                <Row data={[data.namagame, data.harga, "DELETE "]} style={{margin:26}} />
                <Row>afdfdfdfcvc</Row>
                {/* <Button title="delete" onPress={() => this.props.kirimid("asd")} /> */}
            </Table>
        </View>
    )
}

export default connect(null, { kirimid })(RestaurantCard)