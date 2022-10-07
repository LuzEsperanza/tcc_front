import React from 'react';
import { View, StyleSheet, Text,TextInput, Pressable,ScrollView} from 'react-native';
import {useNavigation}  from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons'



const Denunciar : React.FC = () => {
    const navigation = useNavigation();
    function handleNextStep (){
        // navigation.navigate('denunciar')
    }
    return (
        <ScrollView style={styles.container}>
             
            <Text style={styles.title}>Nome do suspeito</Text>
            <TextInput style={styles.input}/>

            <Text  style={styles.title}>Tipo de atividade inlicita</Text>
            <TextInput style={styles.input}/>

            <Text style={styles.local}>Local do ocorrido</Text>
            <Text  style={styles.title}>Rua</Text>
            <TextInput style={styles.input}/>

            <Text  style={styles.title}>Numero</Text>
            <TextInput style={styles.input} keyboardType="numeric"/>

            <Text style={styles.title}>Complemento</Text>
            <TextInput style={styles.input}/>

            <Text style={styles.title}>Horário de abordagem</Text>
            <TextInput style={styles.input}/>

            <Text  style={styles.title}>Descrição</Text>
            <TextInput multiline style={[styles.input,{height:110}]}/>

            <Text  style={styles.title}>Foto</Text>
            <View style={styles.caixa}>
            <TouchableOpacity style={styles.imageInput} >
                <Feather name="plus" size={24}/>

            </TouchableOpacity>
            <TouchableOpacity style={styles.imageInput} >
                <Feather name="plus" size={24}/>

            </TouchableOpacity>
            <TouchableOpacity style={styles.imageInput} >
                <Feather name="plus" size={24}/>

            </TouchableOpacity>
            <TouchableOpacity style={styles.imageInput} >
                <Feather name="plus" size={24}/>

            </TouchableOpacity>

            </View>
           


            
           
            <Pressable  style={styles.cadastro} onPress={()=>handleNextStep()}>
                <Text style={styles.buttonText}>Enviar</Text>
            </Pressable>


       

        </ScrollView>
      
    );
}
const styles = StyleSheet.create({
    container : {
        flex: 1,
        width: "100%",
        marginHorizontal: 12,
        paddingTop:24
        
    },
    title : {
        fontWeight: 'bold',
        fontSize: 15,
        fontFamily: 'Roboto',
        marginBottom: 0,
        paddingBottom: 0,
        paddingTop: 2,
        marginLeft: 20, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    local : {
        fontWeight: 'bold',
        fontSize: 18,
        fontFamily: 'Roboto',
        marginBottom: 2,
        paddingBottom: 2,
        paddingTop: 2,
        marginLeft: 20, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        height: 54,
        margin: 12,
        width: 1300,
        borderWidth: 1.4,
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 18,
        paddingHorizontal: 24,
        marginBottom: 16,
        textAlignVertical: 'top'
       
    
    },
    caixa: {
        height: 110,
        margin: 12,
        width: 1300,
        borderWidth: 1.4,
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 18,
        paddingHorizontal: 24,
        marginBottom: 16,
        textAlignVertical: 'top'
    },

    imageInput: {
        borderStyle: 'dashed',
        borderWidth: 1.4,
        borderRadios: 20,
        height: 80,
        width: 250,
        justifyContent:'center',
        alignItems: 'center',
        marginBottom: 10
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
        margin: 620,
        width: 200,
        justifyContent: 'center',
        padding: 10,
        
    },
    buttonText : {
        fontFamily: 'Roboto',
        fontSize: 20,
        color: '#f9fafc'

    },
    
 })


export default Denunciar;