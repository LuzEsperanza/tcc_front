import React from 'react';
import { View, StyleSheet, Text,TextInput, Pressable } from 'react-native';
import {useNavigation}  from '@react-navigation/native';



const Cadastro : React.FC = () => {
    const navigation = useNavigation();
    function handleNextStep (){
        // navigation.navigate('denunciar')
    }
    return (
        
       <View style={styles.container}>
            
            <TextInput style={styles.input} placeholder="Email" keyboardType="email-address"/>
           
            <TextInput placeholder="Nome" style={styles.input}/>

            
            <TextInput style={styles.input} placeholder="Senha"/>
            <Pressable  style={styles.cadastro} onPress={()=>handleNextStep()}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </Pressable>


       </View>
    );
}
const styles = StyleSheet.create({
    container : {
        flex: 1,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    cadastro: {
        padding: 2,
        backgroundColor: '#000000',
        borderWidth: 4,
        borderColor: '#000000',
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 4,
        paddingRight: 8,
        borderRadius: 10,
        
        alignItems: 'center',
        marginTop : 9,
        marginBottom : 8


    },
    buttonText : {
        fontFamily: 'Roboto',
        fontSize: 20,
        color: '#f9fafc'

    },
    
 })


export default Cadastro;