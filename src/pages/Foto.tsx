import React, { useState } from 'react';
import { View,Text, StyleSheet, Pressable, Button, Image, FlatList} from 'react-native';
import {useNavigation, useRoute}  from '@react-navigation/native';
import { ScrollView, TextInput} from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';
import api from '../services/api';
import * as ImagePicker from 'expo-image-picker';
import {Entypo} from '@expo/vector-icons';



const Foto : React.FC = () => {
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [images, setImages] = useState<string[]>([]);
    const [imagesPath, setImagesPath] = useState<string[]>([]);
    var fotos = []
    async function handleSelectImages() {
        // tenho acesso a galeria de fotos e não a câmera
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        /* console.log(status); */
        if(status !== 'granted'){// granted é quando o usuário deu permissão
          alert('Eita, precisamos de acesso às suas fotos...');
          return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
          // permite ao usuario editar a imagem (crop), antes de subir o app
          allowsEditing: true,
          quality: 1,
          //quero apensas imagems e não vídeo tb
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });
        /* console.log(result); */
        if(!result.canceled) { // se cancelou o upload da imagem
          // questão do conceito de imutabilidade. sempre que uma imagem for adicionado, 
          //temos que copiar as imagens que tinha antes no array. 
          //se não vai apagar na próxima renderização. pois começa sempre do zero
          setImagesPath([...imagesPath, result.assets[0].uri]);
          console.log(imagesPath[0]);
        }
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
    async function cadastro (){
        // const denunciante = await api.post('/anonimo').then((response) =>
        // {
        //    return response.data.id
      
               
        // })
       

        navigation.navigate('Denunciar')
    }

    
    

    return (
       <View style={styles.container}>
            <View>
                <Pressable style={styles.adicionar} onPress={handleSelectImages}>
                    <Text>Adicionar imagens</Text>
                    <Entypo name="plus" size={24} color="black" />
                </Pressable>
            </View>
            
            <ScrollView>
         {imagesPath.map(imgUri =><Image key={imgUri} source={{uri:imgUri}}/>)}
      
            </ScrollView>  
            
            
            
            <Pressable  style={styles.cadastro} onPress={cadastro}>
                <Text style={styles.buttonText}>Próximo</Text>
            </Pressable>
        
           

       </View>
    );
}
const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
    },

    adicionar : {
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
    
    buttonText : {
        fontFamily: 'Roboto',
        fontSize: 20,
        color: '#f9fafc'

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
    card: {

        padding: 10,

        margin: 5,

        flexDirection: 'row',

        justifyContent: 'space-between',

    },
    text: {

        textAlign: 'center',

        fontWeight: 'bold',

    },
    
    
 })

export default Foto;