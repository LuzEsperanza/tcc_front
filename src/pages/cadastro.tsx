import React from 'react';
import { View, StyleSheet, Text,TextInput, Pressable,ScrollView } from 'react-native';
import {useNavigation}  from '@react-navigation/native';



const Cadastro : React.FC = () => {
    const navigation = useNavigation();
    function handleNextStep (){
        // navigation.navigate('Denunciar')
    }
    return (
        <ScrollView style={styles.container}>
             
            
            <TextInput style={styles.input} placeholder="Email" keyboardType="email-address"/>
           
            <TextInput placeholder="Nome" style={styles.input}/>

            
            <TextInput style={styles.input} placeholder="Senha" secureTextEntry={true}/>
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
        width: 1300,
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
        height: 40,
        margin: 580,
        width: 200,
       
        padding: 10,
        
    },
    buttonText : {
        fontFamily: 'Roboto',
        fontSize: 20,
        color: '#f9fafc'

    },
    
 })


export default Cadastro;