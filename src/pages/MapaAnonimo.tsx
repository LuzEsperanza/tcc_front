import React , {useState} from 'react';
import { View, StyleSheet, Dimensions, Text, Pressable } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { useNavigation,useRoute } from '@react-navigation/native';
interface Anonimo{
    id : number;
   
}
const Mapa : React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const anonimo = route.params as Anonimo;
   
    const [position, setPosition] = useState({
        latitude: -6.886532,
        longitude: -38.563994,
        latitudeDelta: 0.0010,
        longitudeDelta: 0.0010,
    });

    
    function handlerDenunciar(){ 
        const id = anonimo.id;
        console.log(id)
        console.log("ola")

        navigation.navigate('DenunciarAnonimo', {position,id})
    }

    return(
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={position}
                onPress={e =>
                    setPosition({
                        ...position,
                        latitude: e.nativeEvent.coordinate.latitude,
                        longitude: e.nativeEvent.coordinate.longitude,
                    })
                }>
                <Marker
                    coordinate={position}
                    title={'Marcador'}
                    description={'Testando o marcador no mapa'}
                />
                

            </MapView>
            
            <Pressable style={styles.button} onPress={handlerDenunciar}>
                <Text style={styles.texto}>Próximo</Text>
            </Pressable>      
             
           
        </View>
    )
}
const styles = StyleSheet.create({
    container : {
        flex: 1,
        position: 'relative'
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height

    },   
    button : {
        backgroundColor: '#15c3d6',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,

        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 40,      
    },
    texto : {
        color:'#fff',
        fontSize: 16,
        fontFamily: 'Roboto',
    },
    
 })
export default Mapa;