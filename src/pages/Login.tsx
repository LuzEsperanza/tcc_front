import React, {useState} from 'react';
import { View, StyleSheet, Text,TextInput, Pressable,ScrollView , Image,  TouchableOpacity,} from 'react-native';
import {useNavigation}  from '@react-navigation/native';
import api from '../services/api'
import {useMyContext} from '../context/AuthProvider'
import {Ionicons, MaterialIcons} from '@expo/vector-icons';


// import { TouchableOpacity } from 'react-native-gesture-handler';

const Login : React.FC = () => {
    const [email, setEmail] = useState(String);
    const [validEmail, setValidEmail] = useState(false);
    const [senha, setSenha] = useState(String);
    
    const [hidePass, setHidePass] = useState(true)
    const navigation = useNavigation();
    const {logar} = useMyContext();

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
        
        await logar(email, senha);
        navigation.navigate('Foto');
        
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
        height: '100%',
        backgroundColor: '#F5F5F5',
        
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
    textError :{
        fontFamily: 'Roboto',
        fontSize: 13,
        marginTop: 0.5,
        color: '#8B0000'

    }
    
 })


export default Login;