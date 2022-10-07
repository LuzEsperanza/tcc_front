import React from 'react';
import { View,Text, StyleSheet, Pressable, Image} from 'react-native';
import {RectButton, ScrollView, TextInput} from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons';
import {useNavigation}  from '@react-navigation/native';
import {Card} from 'react-native-paper'





const AcompanhamentoDenuncia : React.FC = () => {
    const navigation = useNavigation();
    function handleNextStep (){
        // navigation.navigate('denunciar')
    }
    return (
        <ScrollView >
        <Text style={styles.titulo}>Minhas Denúncias</Text>
        <View style={styles.caixa}>
            
            <Text style={styles.title}>Abandono de animais</Text>
            
            
            <View style={styles.caixa2}>
                <View>
                    <Text style={styles.status}>Status da denúncia</Text>
                    
                        <TextInput style={styles.input}>
                            <Text>PENDENTE</Text>
                        </TextInput>

                </View>
                <View>
                    <Text style={styles.status}>Data de criação</Text>
                    <View style={styles.input}>
                    <Feather  size={20} style={styles.calendario} name='calendar'/>
                    <Text  style={styles.data}>12/09/2019</Text>

                    </View>
                   

                </View>
                
                
            </View>
            <View style={styles.caixa2}>
                <View>
                    <Text style={styles.status}>Descrição</Text>
                    
                        <TextInput style={styles.input}>
                            <Text>Abandono de gatos na praça</Text>
                        </TextInput>

                </View>
                <View>
                    <Text style={styles.status}>Encaminhada</Text>
                    <View style={styles.input}>
                    
                    <Text  style={styles.data}>Ministério Público</Text>

                    </View>
                   

                </View>
                
            </View>
        </View>


   </ScrollView>
       
    );
}
const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titulo : {
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        fontSize : 28,
        alignItems: 'center',
        textAlign: 'center',

    },
    
    caixa: {
        
        margin: 12,
        
        borderWidth: 1.4,
        padding: 10,
        borderRadius: 10,
        flex: 1,        

        
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 18,
        paddingHorizontal: 24,
        marginBottom: 16,
        textAlignVertical: 'top',
        backgroundColor: '#C4C4C4',
        borderColor: '#808080',
        marginLeft: 20
    },
    title : {
       
        fontSize: 20,
        fontFamily: 'Roboto',
       
       
    },
    caixa2 : {
        flex:1,
        
        width: 310,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 1,
        
      
        textAlignVertical: 'top',
      
       
    },
    input : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1.4,
        borderRadios: 20,
        flex: 1,
        padding: 5,
        alignItems: 'center',
        marginBottom: 1,
        textAlign: 'center'
    },
    status : {
        fontWeight: 'bold',
        fontSize: 16,
        
    },
    calendario: {
        paddingLeft:2,


    },
    data :{
        paddingRight: 1,

    },
    caixa3 : {
        height: 20,
      
        width: 324,
       
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 1,
        paddingHorizontal: 2,
        
        textAlignVertical: 'top',
      
       
    },

    
    
 })

export default AcompanhamentoDenuncia;