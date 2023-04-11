import React, {useState} from 'react';
import { View, StyleSheet, Text,TextInput, Pressable,ScrollView ,TouchableOpacity,} from 'react-native';
import {useNavigation}  from '@react-navigation/native';
import * as AuthSession from 'expo-auth-session';
import {useMyContext} from '../context/AuthProviderAnonimo';
import api from '../services/api';
const LoginAnonimo : React.FC = () => {
   
    const navigation = useNavigation();
    const [codigo, setCodigo] = useState(String);
    const {logar} = useMyContext();
    type AuthResponse = {
        type: string;
        params: {
          access_token: string;
        }
      }

    async function handleSingIn (){
        console.log(codigo)
        try {            
            const response = await api.post('/anonimo/login', {codigo});            
        } catch (error) {
            console.log(error);
        }     
        
    }
   
    return (
        <ScrollView style={styles.container}>
            <View  style={styles.inputArea}>
                <TextInput style={styles.input}
                    placeholder="Digite seu código" 
                    value={codigo}
                    onChangeText={(text)=> setCodigo(text)}
                />
            

            </View>
            
            <Pressable  style={styles.atualizar} onPress={()=>handleSingIn()}>
                <Text style={styles.text}>Enviar</Text>
            </Pressable>
        </ScrollView>
      
    );
}
const styles = StyleSheet.create({
    container : {
        flex: 1,
        width: "100%",
        marginHorizontal: 12,
        height: '100%',
        backgroundColor: '#F5F5F5',
        
    },
    inputArea: {
        flexDirection: 'row',
        width: '95%',
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        height: 50,
        alignItems: 'center',
        marginTop: 25,
        borderColor: '#121212',
        borderWidth: 2,


    },
    input: {
        height: 50,       
        width: '85%',        
        padding: 9,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'black',       
        fontSize:18,    
    },
    icon :{
        width: '15%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },   
    atualizar: {
        backgroundColor: '#000000',
        borderWidth: 4,
        borderColor: '#000000',
        paddingTop: 6,
        paddingBottom: 6,
        borderRadius: 10,
        alignItems: 'center',
        marginTop : 25,        
        margin: 20,
        width: 200,
        justifyContent: 'center',
        padding: 10,
        alignSelf: 'center',
        marginBottom: 40        
    },
    google:{
        backgroundColor: '#1e90ff',
        borderWidth: 4,
        borderColor: '#1e90ff',
        paddingTop: 6,
        paddingBottom: 6,
        borderRadius: 10,
        alignItems: 'center',
        marginTop : 25,        
        flexDirection: 'row',
        width: 300,
        justifyContent: 'space-between',
        padding: 20,
        alignSelf: 'center',
        marginBottom: 80  

    },
    buttonText : {
        fontFamily: 'Roboto',
        fontSize: 20,
        color: '#f9fafc',
        fontWeight: 'bold',
        paddingLeft: 20,
    },
   
    text : {
        fontFamily: 'Roboto',
        fontSize: 20,
        color: '#f9fafc',
        fontWeight: 'bold',

    },
    ou : {
        fontFamily: 'Roboto',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'     

    },
    tinyLogo: {
        width: 166,
        height: 200,
        left: 100,
        marginTop: 10
    },
    textError :{
        fontFamily: 'Roboto',
        fontSize: 13,
        marginTop: 0.5,
        color: '#8B0000'

    }
    
 })


export default LoginAnonimo;