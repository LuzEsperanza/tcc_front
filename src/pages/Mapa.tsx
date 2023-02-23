import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import mapMarker from '../images/marcador.svg'

const Mapa : React.FC = () => {
    const navigation = useNavigation();
    function handlerDenunciar(){
        navigation.navigate()
    }
    return(
        <View style={styles.container}>
            <MapView 
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion= {
                    {
                        latitude:-6.5205485,
                        longitude:-38.4155765,
                        latitudeDelta: 0.008,
                        longitudeDelta: 0.08,
                    }
                }
                >
                    <Marker
                        icon= {mapMarker}
                        coordinate = {
                            {
                                latitude:-6.5205485,
                                longitude:-38.4057993
                            }
                        }
                        calloutAnchor={{x:2.7, y:0.8}}>
                        <Callout
                            tooltip={true}
                            onPress={handlerDenunciar}>
                                <View style={styles.call}>
                                    <Text style={styles.texto}>Localização</Text>
                                </View>

                        </Callout>
                    </Marker>

            </MapView>
        </View>
    )
}
const styles = StyleSheet.create({
    container : {
        flex: 1,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height

    },
    call: {
        width: 168,
        height: 46,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 16,
        justifyContent: 'center'

    },
    texto : {
        color: '#8889a5',
        fontSize: 14,
        fontFamily: 'Nunito_700Bold'
    }
    
 })
export default Mapa;