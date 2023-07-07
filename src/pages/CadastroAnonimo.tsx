import React, { useState }  from 'react';
import { View, StyleSheet, Text,Pressable,ScrollView, Button, TouchableHighlight,TouchableOpacity, ClipboardStatic, TextInput } from 'react-native';
import {useNavigation}  from '@react-navigation/native';
import api from '../services/api';
import {AntDesign, Ionicons, MaterialIcons} from '@expo/vector-icons';
import uuid from 'react-native-uuid';
import Clipboard from '@react-native-community/clipboard';

const CadastroAnonimo : React.FC = () => { 
    const navigation = useNavigation();
    const [codigo, setCodigo] = useState(String);
    const [codi, setCod] = useState('');
    const [validSenha, setValidSenha] = useState(false);
    const [hidePass, setHidePass] = useState(true);

    const handleValidSenha= (text) => {
        let re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
        
        setCodigo(text)
        if(re.test(text)){
            setValidSenha(false)
        }
        else{
            setValidSenha(true)
        }

    } 
      
    async function handleCadastro (){
                       
        const anonimo = await api.post('/anonimo/',{codigo})
        setCod(anonimo.data.codigo)
       console.log(anonimo.data.codigo) 
       navigation.navigate('LoginAnonimo')      
      
    }
    

    return (
        <ScrollView style={styles.container}>
            <View>
                 <Text style={styles.texto}>
                    Crie uma senha de mínimo 8 dígitos.
                    Incluindo  caracteres especiais, números e letras maiúsculas e minúsculas
                </Text>
                <View style={styles.inputArea}>
                <TextInput
                    style={styles.input} 
                    placeholder="Senha" 
                    secureTextEntry={hidePass}
                    onChangeText={(text)=>handleValidSenha(text)}
                />
                <TouchableOpacity onPress={()=>setHidePass(!hidePass)}>
                   {hidePass ? 
                   <Ionicons  name="eye" color="black" size={25}/>
                   :
                   <Ionicons  name="eye-off" color="black" size={25}/>
                   }
                    
                </TouchableOpacity>

           </View>
           {validSenha ? 
            (<Text>Senha fraca</Text>) 
            :
             (<Text></Text>)}
                
                
                

            </View>
            
             
            <Pressable  style={styles.cadastro} onPress={()=>handleCadastro()}>
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
    texto :{
        textAlign: 'left',
        marginTop : 80,
        marginRight: 15,
        fontSize: 19

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
    
    
 })


export default CadastroAnonimo;