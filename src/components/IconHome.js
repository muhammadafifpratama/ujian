import React from 'react';
import { View, Text } from 'react-native';
import { Card, CardItem, Thumbnail } from 'native-base';
import { Icon } from 'react-native-elements';


const IconHome=({icons,types,name})=>{
    return(
        <View style={{ alignItems: 'center', width: '25%', marginVertical: 10 }}>
            <Icon
                name={icons}
                size={30}
                type={types}
                color='tomato'
                containerStyle={{
                    borderWidth:2,
                    borderColor:'tomato',
                    borderRadius:45,
                    width:45,
                    height:45,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            />
            <Text style={{fontSize:13}}>{name}</Text>
        </View>
    )
}

export default IconHome;