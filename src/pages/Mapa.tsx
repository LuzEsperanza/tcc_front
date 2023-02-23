import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const Mapa : React.FC = () => {
    return(
        <View style={styles.container}>
            <MapView 
                initialRegion= {
                    {
                        latitude:-6.5205485,
                        longitude:-38.4155765,
                        latitudeDelta: 0.008,
                        longitudeDelta: 0.08,
                    }
                }>

            </MapView>
        </View>
    )
}
const styles = StyleSheet.create({
    container : {
        padding: 24,
        backgroundColor: '#f9fafc',
        borderBottomWidth: 1,
        borderColor: '#dde3f0',
        paddingTop: 44,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title : {
        
        color: '#8fa7b3',
        fontSize: 16,

    }
    
 })
export default Mapa;