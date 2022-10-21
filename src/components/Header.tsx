import React from 'react';
import { View, StyleSheet, Text, Pressable} from 'react-native';
import {BorderlessButton} from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native'

interface HeaderProps {
    title:string;
    showX?:boolean;
}



const Header: React.FC<HeaderProps> = ({title, showX=true}) => {
    const navigation = useNavigation();

    
   
    return (
       <View style={styles.container}>
          <Pressable onPress={navigation.goBack}>
            <Feather name="arrow-left" size={24} color="#15b6d5"/>
       
          </Pressable>
           
        <Text style={styles.title}>{title}</Text>
       <View/>
        
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
        
        color: '#8fa7b3',
        fontSize: 16,

    }
    
 })

export default Header;