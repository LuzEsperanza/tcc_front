import React from 'react';
import { View, StyleSheet, Text, Pressable} from 'react-native';
import {BorderlessButton} from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {useFocusEffect, useRoute}  from '@react-navigation/native';
import {useMyContext} from '../context/AuthProvider';

interface HeaderProps {
    title:string;
    showX?:boolean;
}



const Header: React.FC<HeaderProps> = ({title, showX=true}) => {

    const navigation = useNavigation();
    const {denunciante} = useMyContext();

    function handleNextStep (){
        
        navigation.navigate('Denunciar', {id:denunciante.denuncianteId});
    }

    function usuario (){
               
        navigation.navigate('Usuario', {id:denunciante.denuncianteId});
    }

    
   
    return (
        <View style={styles.container}>
            <Pressable onPress={navigation.goBack}>
                <Feather name="arrow-left" size={24} color="#15b6d5"/>
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
        padding: 24,
        backgroundColor: '#f9fafc',
        borderBottomWidth: 1,
        borderColor: '#dde3f0',
        paddingTop: 44,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title : {
        
        color: '#000000',
        fontSize: 16,

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
    }
    
 })

export default Header;