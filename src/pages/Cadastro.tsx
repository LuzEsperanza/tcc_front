import React, { useState } from 'react';
import { View, StyleSheet, Text,TextInput, Pressable,ScrollView } from 'react-native';
import {useNavigation}  from '@react-navigation/native';
import api from '../services/api';


const Cadastro : React.FC = () => { 
    const [email, setEmail] = useState(String);
    const [senha, setSenha] = useState(String);
    const [nome, setNome] = useState(String);
    const navigation = useNavigation();

    async function handleNextStep (){
        
        await api.post('/denunciante/cadastro', {nome, email, senha}).then((response) =>
        {
           console.log(response)
           
           
        })
        navigation.navigate('Login')
    }

    return (
        <ScrollView style={styles.container}>
             
            
            <TextInput 
            style={styles.input} 
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={setEmail}/>
           
            <TextInput 
            placeholder="Nome" 
            style={styles.input}
            onChangeText={setNome}/>

            
            <TextInput
            style={styles.input} 
            placeholder="Senha" 
            secureTextEntry={true}
            onChangeText={setSenha}
            />
            <Pressable  style={styles.cadastro} onPress={()=>handleNextStep()}>
                <Text style={styles.buttonText}>Cadastrar</Text>
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


export default Cadastro;