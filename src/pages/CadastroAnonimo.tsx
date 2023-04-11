import React, { useState }  from 'react';
import { View, StyleSheet, Text,Pressable,ScrollView, Button, TouchableHighlight,TouchableOpacity, ClipboardStatic, TextInput } from 'react-native';
import {useNavigation}  from '@react-navigation/native';
import api from '../services/api';
import uuid from 'react-native-uuid';
import Clipboard from '@react-native-community/clipboard';
const CadastroAnonimo : React.FC = () => { 
    const navigation = useNavigation();
    
    const [codi, setCod] = useState('');
      
    async function handleCadastro (){
        const cod = uuid.v4();
        const codigo = cod.toString();               
        const anonimo = await api.post('/anonimo/',{codigo})
        setCod(anonimo.data.codigo)
       console.log(anonimo.data.codigo)       
      
    }
    async function handleNextLogin (){
        
        navigation.navigate('LoginAnonimo')        
    }

    return (
        <ScrollView style={styles.container}>
            <View>
                 <Text style={styles.texto}>
                O código gerado deve ser usado para fazer login,
                 onde será possível acompanhar a denúncia e denunciar
                </Text>
                

            </View>
            
             
            <Pressable  style={styles.cadastro} onPress={()=>handleCadastro()}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </Pressable>
                      
            <TextInput
                style={styles.input}
                placeholder={codi} 
                value={codi}/>
            
            <Pressable  style={styles.cadastro} onPress={()=>handleNextLogin()}>
                <Text style={styles.buttonText}>Login</Text>
            </Pressable>
               

        </ScrollView>
      
    );
}
const styles = StyleSheet.create({
    container : {
        flex: 1,
        width: "100%",
        marginHorizontal: 12
        
    },
    texto :{
        textAlign: 'center',
        marginTop : 80,
        marginRight: 15,
        fontSize: 19

    },
    input: {
        flexDirection: 'row',
        width: '90%',
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        height: 50,
        alignItems: 'center',
        marginTop: 25,
        borderColor: '#121212',
        borderWidth: 2,
        textAlign: 'center'
    },
    cadastro: {        
        backgroundColor: '#000000',
        borderWidth: 4,
        borderColor: '#000000',
        paddingTop: 6,
        paddingBottom: 6,
        borderRadius: 10,
        alignItems: 'center',
        marginTop : 50,        
        margin: 20,
        width: 200,
        justifyContent: 'center',
        padding: 10,
        marginLeft: 80,
       
        
    },
    buttonText : {
        fontFamily: 'Roboto',
        fontSize: 20,
        color: '#f9fafc'

    },
    copiedText: {
        marginTop: 10,
        color: 'red',
      },
    
    
 })


export default CadastroAnonimo;