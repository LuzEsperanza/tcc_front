import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text,TextInput, Pressable,ScrollView, Button, Image} from 'react-native';
import {useNavigation, useRoute}  from '@react-navigation/native';
import MapView, {Marker, MapEvent}  from 'react-native-maps';
import mapMaker from '../images/marcador.svg'
import * as ImagePicker from 'expo-image-picker';
import api from '../services/api';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useMyContext} from '../context/AuthProvider';
import CheckBox from '../components/CheckdBox';

const Denunciar : React.FC = () => {
    
    const route = useRoute();
    const {denunciante} = useMyContext();
   
    const navigation = useNavigation();
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
     
    const [imagensURI, setImagesURI] = useState<string[]>([]);
    const [image, setImage] = useState(null);
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [geometria, setGeometria] = useState({latitude:0, longitude:0})
    const latitude = geometria.latitude
    const longitude= geometria.longitude
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [informacaoDenunciado, setInformacao] = useState('');

    const options = [
        {text: 'Abandono de animais', id: 1},
        {text: 'Transporte ilegal', id: 2},
        {text: 'Comércio ilegal', id: 3},
        {text: 'Caça ilegal', id: 4},

    ]
    
  
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
       const identificado = denunciante.denuncianteID;
        console.log(titulo,descricao,numero, rua, horarioAbordagem, identificado, informacaoDenunciado)
        
        await api.post('/denuncia', {identificado, informacaoDenunciado, descricao, horarioAbordagem, rua, numero, longitude, latitude  }).then((response) =>
        {
           return response.data
          
           
        })
        
        // navigation.navigate('Principal')
        
        
    }    
    
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };

    return (
        <ScrollView style={styles.container}>
            
            <Text  style={styles.title}>Informações dos possiveis suspeitos</Text>
            <TextInput placeholder='Ex: descrição física, onde reside, nome' multiline style={[styles.input,{height:110}]} 
            value={informacaoDenunciado} onChangeText={setInformacao}/>

            <Text  style={styles.title}>Tipo de atividade inlicita</Text>
            <TextInput style={styles.input} value={titulo} onChangeText={setTitulo}/>
            {/* <CheckBox options={options} onChange={op => alert(op)}/> */}

            <Text style={styles.local}>Local do ocorrido</Text>
            <Text  style={styles.title} >Rua</Text>
            <TextInput style={styles.input}   value={rua} onChangeText={setRua}/>

            <Text  style={styles.title}>Numero</Text>
            <TextInput style={styles.input} keyboardType="numeric" value={numero} onChangeText={setNumero}/>

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
            <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            {/* <View style={styles.hora}>
                <Button title='selecione imagem' onPress={() => pickImage()}/>

            </View> */}
            

            
                     
            {/* <TouchableOpacity style={styles.imageInput} onPress={() => pickImage()}>
                <Feather name="plus" size={24}/>

            </TouchableOpacity> */}
            {image && <Image source={{uri : image}}/>}



           
           


            
           
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
    nome : {
        flex: 1,
    height: 47,
    paddingHorizontal: 20,
   
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderRightWidth: 1,
    borderRightColor: '#EBEBEB',
    color: '#666666'
    },
    addButton :{
        backgroundColor: '#FFF',
        height: 47,
        paddingHorizontal: 13,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,

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