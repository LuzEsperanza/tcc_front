import React, {useState} from 'react';
import { View, StyleSheet, Text,TextInput, Pressable,ScrollView , Image} from 'react-native';
import {useNavigation}  from '@react-navigation/native';
import api from '../services/api'



const Login : React.FC = () => {
    const [email, setEmail] = useState(String);
    const [senha, setSenha] = useState(String);
    const navigation = useNavigation();
    
    async function handleNextStep (){
        const data = new FormData();
        data.append('email', email);
        data.append('senha', senha);
        
        const denunciante = await api.post('/denunciante/login', {email, senha}).then((response) =>
        {
           return response.data.denuncianteID
      
               
        })
        
        
        navigation.navigate('Principal', denunciante)
        
    }
    return (
        <ScrollView style={styles.container}>
             
            
            <TextInput 
            style={styles.input} 
             placeholder="Email" 
             keyboardType="email-address" 
             autoComplete='email' 
             value={email}
             onChangeText={setEmail}
             />
           
          

            
            <TextInput style={styles.input}
             placeholder="Senha" secureTextEntry={true} 
             value={senha}
             onChangeText={setSenha}
             />
           
            <Pressable  style={styles.atualizar} onPress={()=>handleNextStep()}>
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
   
   
   
    atualizar: {
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


export default Login;