import React, { useState } from 'react';
import {View, StyleSheet, Text,TextInput, Pressable,ScrollView, Button, Image} from 'react-native';
import {useNavigation, useRoute}  from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import api from '../services/api';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useMyContext} from '../context/AuthProvider';
import {Entypo} from '@expo/vector-icons';

interface Anonimo{
    id : number;
   
}
interface Positions {
    latitude:number;
    longitude:number;
    latitudeDelta:number;
    longitudeDelta:number

}

interface ParamsPositions{
    position : Positions;
   
}

const Denunciar : React.FC = () => {
    
    const route = useRoute();
    const anonimo = route.params as Anonimo;
    console.log(anonimo)    
   
    const navigation = useNavigation();
    const paramsPositiom = route.params as ParamsPositions;
   
    const [descricao, setDescricao] = useState('');
    const [ValiDescricao, setValiDescricao] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const latitude = paramsPositiom.position.latitude
    const longitude= paramsPositiom.position.longitude
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [informacaoDenunciado, setInformacao] = useState('');
    const [imagesPath, setImagesPath] = useState<string[]>([]);

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
    let horarioAbordagem = data.substring(11,19);

    async function handleSelectImages() {
       
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        /* console.log(status); */
        if(status !== 'granted'){
          alert('Eita, precisamos de acesso às suas fotos...');
          return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
          // permite ao usuario editar a imagem (crop), antes de subir o app
          allowsEditing: true,
          quality: 1,
          //quero apensas imagems e não vídeo tb
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        //   allowsMultipleSelection: true,
        });
        //  console.log(result); 
        if(!result.canceled) { // se cancelou o upload da imagem
          // questão do conceito de imutabilidade. sempre que uma imagem for adicionado, 
          //temos que copiar as imagens que tinha antes no array. 
          //se não vai apagar na próxima renderização. pois começa sempre do zero
          setImagesPath([...imagesPath, result.assets[0].uri]);
        //   console.log(result);
        }
        
    }

    async function handleNextStep (){
       
        const anonima = anonimo.id
        if (!descricao.trim()){
            setValiDescricao('Escreva uma descrição do ocorrido')
        }
        else{
            // console.log(titulo,descricao,numero, rua, horarioAbordagem, identificado, informacaoDenunciado, latitude, longitude)
        
        const informacao = await api.post('/denuncia/anonimo', {anonima, informacaoDenunciado, descricao, horarioAbordagem, rua, numero, longitude, latitude  }).then((response) =>
        {
           return response.data
          
           
        })
        const data = new FormData();
        // console.log(informacao.id);
        const denuncia = informacao.id

        data.append('denuncia', informacao.id);       
        
        imagesPath.forEach( async (imageURI, index) =>{
          
            data.append('images', {
                name: `image${index}.jpg`,
                type: 'image/jpg',
                uri: imageURI,
            } as any);
            console.log(data)
            const config = {     
                headers: { 'content-type': 'multipart/form-data'}
            }
           
            await api.post('/foto/anonimo', data, config );
            
        
        })
              
        navigation.navigate('CheckAnonimo', {denuncia, anonima}); 

        }
               
        
    }    
    
   
    return (
        <ScrollView style={styles.container}>
            
            <Text  style={styles.title}>Informações dos possiveis suspeitos</Text>
            <TextInput placeholder='Ex: descrição física, onde reside, nome' multiline style={[styles.input,{height:110}]} 
            value={informacaoDenunciado} onChangeText={setInformacao}/>

            <Text style={styles.local}>Local do ocorrido</Text>
            <Text  style={styles.title} >Rua</Text>
            <TextInput style={styles.input}   value={rua} onChangeText={setRua}/>

            <Text  style={styles.title}>Número</Text>
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
            <TextInput multiline style={[styles.input,{height:110}]} 
            value={descricao} onChangeText={(text)=>setDescricao(text)}/>
            {ValiDescricao ? 
            (<Text style={styles.textError}>{ValiDescricao}</Text>) 
            : (<Text></Text>)}
           
            <Text  style={styles.title}>Insira fotos</Text>

            <View style={styles.caixa}>
                <ScrollView horizontal={true}>
                <Pressable style={styles.adicionar} onPress={handleSelectImages}>
                   
                   <Entypo name="plus" size={24} color="black"/>
                </Pressable>
            
            
           
                {imagesPath.map(imgUri =>
                    
                    <Image style={styles.image} key={imgUri} source={{uri:imgUri}}/>)}

            </ScrollView> 

            </View>
               
            
            
            <Pressable  style={styles.cadastro} onPress={handleNextStep}>
                <Text style={styles.buttonText}>Próximo</Text>
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
        alignItems: 'center',
        paddingVertical: 18,
        paddingHorizontal: 24,
        marginBottom: 16,
        textAlignVertical: 'top'
  
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
    adicionar : {
        alignItems: 'center',
	    justifyContent: 'center',
	    borderWidth: 1,
	    borderColor: 'gray',
	    width: 100,
	    height: 100,
        marginLeft: 3,
        marginTop: 3,
        marginBottom: 3
    },
    image: {
        marginTop: 3,
	    borderWidth: 1,
	    width: 100,
	    height: 100,
        marginLeft: 5,
        borderColor: 'gray',
    },
    caixa: {
        width: '90%',
        height: 120,
        justifyContent: 'center',
        borderWidth: 1.4,
        padding: 5,
        borderRadius: 10,
    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    textError :{
        fontFamily: 'Roboto',
        fontSize: 13,
        marginTop: 0.5,
        color: '#8B0000',
    }  
    
 })


export default Denunciar;