import React, { useState } from 'react';
import { View, StyleSheet, Text,TextInput, Pressable,ScrollView, TouchableOpacity } from 'react-native';
import {useNavigation}  from '@react-navigation/native';
import api from '../services/api';
import {AntDesign, Ionicons, MaterialIcons} from '@expo/vector-icons';

const Cadastro : React.FC = () => { 
    const [email, setEmail] = useState(String);
    const [validEmail, setValidEmail] = useState(false);
    const [senha, setSenha] = useState(String);
    const [nome, setNome] = useState(String);
    const [hidePass, setHidePass] = useState(true)
    const navigation = useNavigation();
    const handleValidEmail = (text) => {
        let re = /\S+@\S+\.\S+/;
        setEmail(text)
        if(re.test(text)){
            setValidEmail(false)
        }
        else{
            setValidEmail(true)
        }

    }

    async function handleNextStep (){
        
        await api.post('/denunciante/cadastro', {nome, email, senha}).then((response) =>
        {
           console.log(response)
           
           
        })
        navigation.navigate('Login')
    }

    return (
        <ScrollView style={styles.container}>
             
            <View style={styles.inputArea}>
                <TextInput 
                    style={styles.input} 
                    placeholder="Email"
                    keyboardType="email-address"
                    onChangeText={(text)=>handleValidEmail(text)}/>
                <MaterialIcons name="email" size={24} color="black" />

            </View>
            {validEmail ? 
            (<Text style={styles.textError}>Formato de email incorreto</Text>) 
            :
             (<Text></Text>)}
            
           <View style={styles.inputArea}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome"               
                    onChangeText={setNome}/>
                <AntDesign name="user" size={24} color="black" />               

           </View>

           <View style={styles.inputArea}>
                <TextInput
                    style={styles.input} 
                    placeholder="Senha" 
                    secureTextEntry={true}
                    onChangeText={setSenha}
                />
                <TouchableOpacity onPress={()=>setHidePass(!hidePass)}>
                   {hidePass ? 
                   <Ionicons  name="eye" color="black" size={25}/>
                   :
                   <Ionicons  name="eye-off" color="black" size={25}/>
                   }
                    
                </TouchableOpacity>

           </View>        

            
            
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
    inputArea: {
        flexDirection: 'row',
        width: '90%',
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
        padding: 8,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'black',       
        fontSize:18,
    
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
    textError :{
        fontFamily: 'Roboto',
        fontSize: 13,
        marginTop: 0.5,
        color: '#8B0000'

    }
    
 })


export default Cadastro;