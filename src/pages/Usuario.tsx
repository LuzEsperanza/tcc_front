import React, {useEffect,useState} from 'react';
import { View, StyleSheet, Text,TextInput, Pressable,ScrollView , Image} from 'react-native';
import {useNavigation, useRoute}  from '@react-navigation/native';

import api from '../services/api'
import AppLoading from 'expo-app-loading';
interface ParamsId{
   id: number;
}

interface Denunciante{
    DenuncianteID:number;
    nome:string;
    senha:string;
    email:string
}

const Usuario : React.FC = () => {
    const route = useRoute();
    const paramsId = route.params as ParamsId;
    
    const [denunciante, setDenunciante] = useState<Denunciante>();
    useEffect(()=>{
        api.get('/denunciante/${1}').then(response=>{
            setDenunciante(response.data)
            console.log(denunciante)
        });
    },[paramsId.id]);
    if(!denunciante){
        return <AppLoading/>
    }
    const navigation = useNavigation();
    function handleNextStep (){
        navigation.navigate('Principal')
    }
    return (
        <ScrollView style={styles.container}>
           
                <View  >
                    <Image  style={styles.tinyLogo} source={require('../images/images.png')}/>

                    <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" autoComplete='email'>
                        {denunciante.email}    
                    </TextInput>    
           
                    <TextInput placeholder="Nome" style={styles.input} autoComplete='name'>
                        {denunciante.nome}
                    </TextInput>
            
                   <TextInput style={styles.input} placeholder="Senha" secureTextEntry={true}/>
                        {denunciante.senha}
                   <View style={styles.button}>

                        <Pressable  style={styles.deletar} onPress={()=>handleNextStep()}>
                            <Text style={styles.buttonText}>Deletar</Text>
                        </Pressable>

                        <Pressable  style={styles.atualizar} onPress={()=>handleNextStep()}>
                            <Text style={styles.text}>Atualizar</Text>
                        </Pressable>

                    </View>
            
                </View>           
            


       

        </ScrollView>
      
    );
}
const styles = StyleSheet.create({
    container : {
        flex: 1,
        width: "100%",
        marginHorizontal: 12,
        height: '100%'
        
    },
    input: {
        height: 40,
        margin: 12,
        width: '90%',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f9fafc',
        borderColor: '#000000',
    
    },
    button :{
        height: 110,
        margin: 12,
        width: '90%',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 1,
        paddingHorizontal: 2,
        marginBottom: 16,
        textAlignVertical: 'top'
    },
    deletar: {
        height: 50,
        width: '40%',
        borderRadius: 10,
        backgroundColor: '#f9fafc',
        borderWidth: 4,
        borderColor: '#000000',
        justifyContent:'center',
        alignItems: 'center',
        marginBottom: 10   
        
        
    },
   
    atualizar: {
        height: 50,
        width: '40%',
        borderRadius: 10,
        backgroundColor: '#808080',
        borderWidth: 4,
        borderColor: '#808080',
        justifyContent:'center',
        alignItems: 'center',
        marginBottom: 10
        
    },
    buttonText : {
        fontFamily: 'Roboto',
        fontSize: 20,
        color: '#000000'

    },
    text : {
        fontFamily: 'Roboto',
        fontSize: 20,
        color: '#f9fafc'

    },
    tinyLogo: {
        width: 166,
        height: 200,
        left: 100,
        marginTop: 10
      },
    
 })


export default Usuario;