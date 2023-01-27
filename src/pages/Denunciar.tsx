import React, { useState } from 'react';
import {View, StyleSheet, Text,TextInput, Pressable,ScrollView, Dimensions, Linking, Button} from 'react-native';
import {useNavigation, useRoute}  from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons';
import MapView, {Marker, Callout, PROVIDER_GOOGLE, MapEvent}  from 'react-native-maps';
import mapMaker from '../images/marcador.svg'
import * as ImagePicker from 'expo-image-picker';
import api from '../services/api';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const Denunciar : React.FC = () => {
    
    const route = useRoute();
    const anonima = route.params;
   
    const navigation = useNavigation();
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
   
    const [nome, setNome] = useState<string[]>([]);
    const [imagensURI, setImagesURI] = useState<string[]>([]);
   
    const [geometria, setGeometria] = useState({latitude:0, longitude:0})
    const latitude = geometria.latitude
    const longitude= geometria.longitude
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [datePickerVisible, setDatePickerVisible] = useState(false);
  
    const showDatePicker = () => {
      setDatePickerVisible(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisible(false);
    };
  
    const handleConfirm = (date) => {
      setSelectedDate(date);
      hideDatePicker();
    };
   
        
    const data =selectedDate.toISOString()
    let horarioAbordagem = data.substring(11,19)
   

    function handleSelectMapPosition(event:MapEvent){
       setGeometria(event.nativeEvent.coordinate)
    }
    async function handleNextStep (){
        console.log(nome, titulo,descricao,numero, rua,complemento,horarioAbordagem, geometria)
        
        await api.post('/denuncia', {descricao, horarioAbordagem, rua, numero, complemento, longitude, latitude  }).then((response) =>
        {
           return response.data
          
           
        })
        
        // navigation.navigate('Principal')
        
        
    }
    async function selectImagens() {
       const {status} = await ImagePicker.requestCameraPermissionsAsync();
       if(status != 'granted'){
        alert('permita acesso as suas fotos')
        return
       }
       const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing:true,
        quality: 1,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
       })
       console.log(result);

        if (result.cancelled) {
          return;
        }
        
    //    const { uri } = result; 

        // setImagesURI([...imagensURI, uri]);


        

    }

    return (
        <ScrollView style={styles.container}>
             
            <Text  style={styles.title}>Nome do suspeito</Text>
            <TextInput  style={styles.input} />

            <Text  style={styles.title}>Tipo de atividade inlicita</Text>
            <TextInput style={styles.input} value={titulo} onChangeText={setTitulo}/>

            <Text style={styles.local}>Local do ocorrido</Text>
            <Text  style={styles.title} >Rua</Text>
            <TextInput style={styles.input}   value={rua} onChangeText={setRua}/>

            <Text  style={styles.title}>Numero</Text>
            <TextInput style={styles.input} keyboardType="numeric" value={numero} onChangeText={setNumero}/>

            <Text style={styles.title}>Complemento</Text>
            <TextInput style={styles.input}  value={complemento} onChangeText={setComplemento}/>
            
            <Text style={styles.title}>Horário de abordagem</Text>

            <View style={styles.hora}>
                < Button  title="Selecione um horário" onPress={showDatePicker} />

            </View>         
               
            
            <DateTimePickerModal

              style={styles.title}
              date={selectedDate}
              isVisible={datePickerVisible}
              mode="time"
              is24Hour
              locale="en_GB"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />        
     
              
            <Text  style={styles.title}>Descrição</Text>
            <TextInput multiline style={[styles.input,{height:110}]} value={descricao} onChangeText={setDescricao}/>
           
           <View style={styles.mapContainer}>
           <MapView
                 initialRegion={{
                    latitude:-27.2092052,
                    longitude:-49.6401092,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.008,
                 }}
                 pitchEnabled={false}
                 scrollEnabled={false}
                 rotateEnabled={false}
                 style={styles.mapStyle}
                 onPress={handleSelectMapPosition}
                
            >
                {geometria.latitude != 0 && (
                    <Marker
                    icon={mapMaker}
                    coordinate={{
                       latitude:geometria.latitude,
                       longitude:geometria.latitude,
   
                    }}
                   />

                )}
               
               
            </MapView>

           </View>
                    
            


            <Text  style={styles.title}>Foto</Text>
                     
            <TouchableOpacity style={styles.imageInput} onPress={selectImagens}>
                <Feather name="plus" size={24}/>

            </TouchableOpacity>
            

           
           


            
           
            <Pressable  style={styles.cadastro} onPress={handleNextStep}>
                <Text style={styles.buttonText}>Enviar</Text>
            </Pressable>


       

        </ScrollView>
      
    );
}
const styles = StyleSheet.create({
    container : {
        flex: 1,
        width: "100%",
        marginHorizontal: 12,
        paddingTop:24
        
    },
    title : {
        fontWeight: 'bold',
        fontSize: 15,
        fontFamily: 'Roboto',
        marginBottom: 0,
        paddingBottom: 0,
        paddingTop: 2,
        marginLeft: 20, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    hora: {
        flex: 1,
        justifyContent: 'center',
        // marginHorizontal: 16,
        width: "90%",
        height: 54,
       
    },
    local : {
        fontWeight: 'bold',
        fontSize: 18,
        fontFamily: 'Roboto',
        marginBottom: 2,
        paddingBottom: 2,
        paddingTop: 2,
        marginLeft: 20, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        height: 54,
        justifyContent: 'center',
        width: '90%',
        borderWidth: 1.4,
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 18,
        paddingHorizontal: 24,
        marginBottom: 16,
        textAlignVertical: 'top'
       
    
    },
    caixa: {
        height: 110,
        
        width: '90%',
        borderWidth: 1.4,
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 18,
        paddingHorizontal: 24,
        marginBottom: 16,
        textAlignVertical: 'top'
    },

    imageInput: {
        borderStyle: 'dashed',
        borderWidth: 1.4,
        borderRadios: 20,
        height: 80,
        width: 300,
        justifyContent:'center',
        alignItems: 'center',
        marginBottom: 10
    },
    mapStyle: {
        width: '100%',
        height: 150,
        
        
        

    },
    mapContainer: {
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1.4,
        borderColor: '#000000',
        width: '90%',
        backgroundColor: '#f9fafc',
        height: 150,
        marginBottom: 10

    },
    cadastro: {
        
        backgroundColor: '#000000',
        borderWidth: 4,
        borderColor: '#000000',
        paddingTop: 6,
        paddingBottom: 6,
        borderRadius: 10,
        alignItems: 'center',
        marginTop : 9,
        
        margin: 20,
        width: 200,
        justifyContent: 'center',
        padding: 10,
        marginLeft: 80,
        marginBottom: 80
        
    },
    buttonText : {
        fontFamily: 'Roboto',
        fontSize: 20,
        color: '#f9fafc'

    },
    
 })


export default Denunciar;