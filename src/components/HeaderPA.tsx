import React from 'react';
import { View, StyleSheet, Text, Pressable} from 'react-native';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {useMyContext} from '../context/AuthProvider';

interface HeaderProps {
    title:string;
    showX?:boolean;
}
import {useRoute}  from '@react-navigation/native';
interface Anonimo{
    id : number;
   
}


const Header: React.FC<HeaderProps> = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const anonimo = route.params as Anonimo;
    const {deslogar} = useMyContext();
    async function handleNextInicial (){ 
        await deslogar()       
       
    }

    function handleNextStep (){
        const id = anonimo.id;
        console.log(id)
        console.log("oi")
        
        navigation.navigate('MapaAnonimo', {id});
    }

  

    
   
    return (
        <View style={styles.container}>
            <Pressable style={styles.deslogar} onPress={()=>handleNextInicial()}>
                <Text style={styles.sair} >Sair</Text>
                
            </Pressable>         
               
            <Pressable  style={styles.denunciar} onPress={()=>handleNextStep()}>
                <Text style={styles.title}>Denunciar</Text>
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
        paddingTop: 44,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title : {        
        color: '#000000',
        fontSize: 22,
    },
    denunciar :{
        height: 40,
        width: 150,
        borderRadius: 5,
        backgroundColor: '#15b6d5',
        borderWidth: 2,
        borderColor: '#15b6d5',
        justifyContent:'center',
        alignItems: 'center',
        marginBottom: 5,
        marginRight: 15,
        alignContent:'center',
        marginTop: 5  
    },
    deslogar : {        
        
        height: 40,
        width: 100,
        borderRadius: 10,
        backgroundColor: '#000000',
        borderWidth: 2,
        borderColor: '#000000',
        justifyContent:'center',
        alignItems: 'center',
        marginLeft: 5
    },
    sair : {        
        color: '#15b6d5',
        fontSize: 22,
    },
    
 })

export default Header;