import React, {useState} from 'react';
import { View, StyleSheet, Text,TextInput, Pressable,ScrollView , Image,  TouchableOpacity,} from 'react-native';
import * as AuthSession from 'expo-auth-session';
import {useNavigation}  from '@react-navigation/native';
import {useMyContext} from '../context/AuthProvider'
import {Ionicons, MaterialIcons, AntDesign} from '@expo/vector-icons';

const Login : React.FC = () => {
    const [email, setEmail] = useState(String);
    const [validEmail, setValidEmail] = useState(false);
    const [senha, setSenha] = useState(String);
    const [error, setError] = useState('');

    const [hidePass, setHidePass] = useState(true)
    const navigation = useNavigation();
    const {logar} = useMyContext();

    type AuthResponse = {
        type: string;
        params: {
          access_token: string;
        }
      }

    const handleValidEmail = (text) => {
        let re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        setEmail(text)
        if(re.test(text)){
            setValidEmail(false)
        }
        else{
            setValidEmail(true)
        }

    }
    

    async function handleNextStep (){
        if (!senha.trim() || senha.length < 8){
            setError('Senha muito pequena!')
        }
        else{
            await logar(email, senha);
            navigation.navigate('Principal');

        }
          
        
        
    }
    async function handleSingIn (){
        const CLIENT_ID = '602969099493-c5a9bhs7flc50ji66hbkb4d2tpdc43sb.apps.googleusercontent.com';
        const REDIRECT_URI = 'https://auth.expo.io/@luzesperanza/teste';
        const RESPONSE_YPE = 'token';
        const SCOPE = encodeURI('profile email');

        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_YPE}&scope=${SCOPE}`;
        const {type, params} = await AuthSession.
        startAsync({authUrl}) as AuthResponse;
        console.log({token: params.access_token})
      
        
    }
    return (
        <ScrollView style={styles.container}>
            <View  style={styles.inputArea}>
                <TextInput 
                    style={styles.input} 
                    placeholder="Email" 
                    keyboardType="email-address" 
                    autoComplete='email' 
                    value={email}
                    onChangeText={(text)=>handleValidEmail(text)}
                />
                <MaterialIcons name="email" size={24} color="black" />
            

            </View>
            {validEmail ? 
            (<Text style={styles.textError}>Formato de email incorreto</Text>) 
            : (<Text></Text>)}
            
            <View style={styles.inputArea}>
                <TextInput style={styles.input}
                    placeholder="Senha" 
                    secureTextEntry={hidePass} 
                    value={senha}
                    onChangeText={(text)=> setSenha(text)}
                />
               
                <TouchableOpacity onPress={()=>setHidePass(!hidePass)}>
                   {hidePass ? 
                   <Ionicons  name="eye" color="black" size={25}/>
                   :
                   <Ionicons  name="eye-off" color="black" size={25}/>
                   }
                    
                </TouchableOpacity>

            </View>
            {error ? (
                <Text style={styles.textError}>
                    {error}
                </Text>
            ) : null} 

            <Pressable  style={styles.atualizar} onPress={()=>handleNextStep()}>
                <Text style={styles.text}>Enviar</Text>
            </Pressable>
            <Text style={styles.ou}>Ou</Text>
            <Pressable  style={styles.google} onPress={()=>handleSingIn()}>
                <AntDesign name="google" size={24} color="black" />
                <Text style={styles.buttonText}>Continuar pelo google</Text>
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


export default Login;