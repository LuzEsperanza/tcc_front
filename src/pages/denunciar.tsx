import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MapView, {Marker,PROVIDER_GOOGLE} from 'react-native-maps';

// import mapMarker from '../images/map.png';





const Denunciar : React.FC = () => {
    return (
       <View style={styles.container}>
        <MapView
           style={styles.map}
           provider={PROVIDER_GOOGLE}
           initialRegion={
            {
                latitude: -6.5205485,
                longitude: -38.4155765,
                latitudeDelta: 0.008,
                longitudeDelta: 0.008,
            }
           }
        >
             {/* <Marker
           icon={mapMarker}
        >

    //     </Marker> */}

        </MapView>
       

    </View>
    
    );
}
 const styles = StyleSheet.create({
    container : {
        flex: 1,
    },
    map : {
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }
 })

export default Denunciar;