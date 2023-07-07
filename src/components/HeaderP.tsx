import React from 'react';
import { View, StyleSheet, Text, Pressable} from 'react-native';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {useMyContext} from '../context/AuthProvider';

interface HeaderProps {
    title:string;
    showX?:boolean;
}



const Header: React.FC<HeaderProps> = () => {

    const navigation = useNavigation();
    const {denunciante} = useMyContext();
    const {deslogar} = useMyContext();
    async function handleNextInicial (){ 
        await deslogar()       
       
    }

    function handleNextStep (){
        
        navigation.navigate('Mapa');
    }

    function usuario (){
               
        navigation.navigate('Usuario');
    }

    
   
    return (
        <View style={styles.container}>
            <Pressable onPress={()=>handleNextInicial()}>
                <Text  style={styles.deslogar}>Sair</Text>
                
            </Pressable>         
               
            <Pressable  style={styles.denunciar} onPress={()=>handleNextStep()}>
                <Text style={styles.title}>Denunciar</Text>
            </Pressable>
        
           
            <Pressable onPress={()=>usuario()}>
                <Feather name="user" size={24} color="#000000"/>
            </Pressable>
     
        </View>
    );
}
const styles = StyleSheet.create({
    container : {
        padding: 15,
        backgroundColor: '#f9fafc',
        borderBottomWidth: 1,
        borderColor: '#dde3f0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        top: 0,
    },
    title : {        
        color: '#000000',
        fontSize: 25,
    },
    denunciar :{
        height: 50,
        width: 200,
        borderRadius: 10,
        backgroundColor: '#f9fafc',
        borderWidth: 4,
        borderColor: '#000000',
        justifyContent:'center',
        alignItems: 'center',
        marginBottom: 10  
    },
    deslogar : {        
        color: '#15b6d5',
        fontSize: 20,
    },
    
 })

export default Header;