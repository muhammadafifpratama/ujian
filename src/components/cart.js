import React, { Component } from 'react';
import { View, FlatList,Button} from 'react-native';
import Table from './cartable'
import axios from 'axios'
import { mysqlapi } from '../helper/url'
import AsyncStorage from '@react-native-community/async-storage';

class Cart extends Component {
    state = { data: [] }

    async componentDidMount() {
        let username = await AsyncStorage.getItem('nama')
        let response = await axios.get(mysqlapi + 'cart/' + username)
        this.setState({ data: response.data })
        console.log(response.data);
        console.log(response.data[0]);
    }

    renderItem = ({ item }) => {
        return (
            <Table data={item} />
        )
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.id}
                >
                    <Button title="asxd">

                    </Button>
                    <Button title="asxd">

                    </Button>
                    </FlatList>
            </View>
        )
    }
}

export default Cart;