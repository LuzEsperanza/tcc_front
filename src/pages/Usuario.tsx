import React, {useEffect,useState} from 'react';
import { View, StyleSheet, Text,TextInput, Pressable,ScrollView ,  TouchableOpacity} from 'react-native';
import {useNavigation, useRoute}  from '@react-navigation/native';
import {useMyContext} from '../context/AuthProvider';
import api from '../services/api';
import {Ionicons} from '@expo/vector-icons';

interface ParamsId{
   id: number;
}



const Usuario : React.FC = () => {
    const route = useRoute();
    const {denunciante} = useMyContext();
    const [senha, setSenha] = useState(String);
    const [validSenha, setValidSenha] = useState(false);
    const [hidePass, setHidePass] = useState(true);
       
    const navigation = useNavigation();
    const handleValidSenha= (text) => {
        let re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
        
        setSenha(text)
        if(re.test(text)){
            setValidSenha(false)
        }
        else{
            setValidSenha(true)
        }

    } 

    async function Atualizar (){
        const consulta = '/denunciante/';
        const teste = consulta.concat(denunciante.denuncianteID.toString())
        await api.patch(teste, {senha});

        navigation.navigate('Principal')
    }
    return (
        <ScrollView style={styles.container}>
           
                <View>
                   
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
                        (<Text style={styles.textError}>Senha fraca</Text>) 
                        :
                        (<Text></Text>)
                    }                   
                   
                    <Pressable  style={styles.atualizar} onPress={()=>Atualizar()}>
                        <Text style={styles.text}>Atualizar</Text>
                    </Pressable>                    
            
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
    textError :{
        fontFamily: 'Roboto',
        fontSize: 13,
        marginTop: 0.5,
        color: '#8B0000'

    },
    tinyLogo: {
        width: 166,
        height: 200,
        left: 100,
        marginTop: 10
      },
    
 })


export default Usuario;