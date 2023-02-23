import React from 'react';
import { View, StyleSheet, Text, Pressable, TouchableOpacity} from 'react-native';
import { Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Entypo} from '@expo/vector-icons'

interface HeaderProps {
    title:string;
    showX?:boolean;
}



const Header: React.FC<HeaderProps> = ({title, showX=true}) => {
    const navigation = useNavigation();

    
   
    return (
       <View style={styles.container}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Entypo name='feather' size={24} color="black"/>                 
          </TouchableOpacity>
           
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