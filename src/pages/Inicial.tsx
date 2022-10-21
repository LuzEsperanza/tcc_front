import React from 'react';
import { View,Text, StyleSheet, Pressable, Image} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons';
import {useNavigation}  from '@react-navigation/native';




const Inicial : React.FC = () => {
    const navigation = useNavigation();
    function Login (){
        navigation.navigate('Login')
    }
    function Anonimo (){
        navigation.navigate('Denunciar')
    }
    function Cadastrar (){
        navigation.navigate('Cadastro')
    }
    

    return (
       <View style={styles.container}>
        
            <Image  style={styles.tinyLogo} source={require('../images/b.png')}/>
            <Text  style={styles.titulo}>Butterfly </Text>
            <Text style={styles.subtitulo}>Denuncie crimes ambientais aqui!</Text>
            <Text style={styles.aviso}>Como deseja entrar?</Text>
            <Pressable  style={styles.tenhoConta} onPress={()=>Login()}>
                {/* <Feather name="user" size={20} color="#000000"></Feather> */}
                <Text style={styles.buttonText}>Tenho conta</Text>
            </Pressable>
            <Pressable  style={styles.anonimamente} onPress={()=>Anonimo()}>
                <Text style={styles.buttonText}>Anonimamente</Text>
            </Pressable>
            <Pressable  style={styles.cadastro} onPress={()=>Cadastrar()}>
                <Text style={styles.buttonTextCadastro}>Cadastre-se</Text>
            </Pressable>

       </View>
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
    subtitulo : {
        fontFamily: 'Roboto',
        fontSize : 24,
        alignItems: 'center',
        textAlign: 'center',
        marginTop : 10,
        lineHeight: 37,

    },
    aviso : {
        fontFamily: 'Roboto',
        fontSize : 22,
        alignItems: 'center',
        textAlign: 'center',
        marginTop : 10,
        marginBottom : 10

    },
    tenhoConta : {
        padding: 2,
        backgroundColor: '#f9fafc',
        borderWidth: 4,
        borderColor: '#000000',
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 6,
        paddingRight: 6,
        borderRadius: 10,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop : 9,
        marginBottom : 8
        

    },
    anonimamente : {
        padding: 2,
        backgroundColor: '#808080',
        borderWidth: 4,
        borderColor: '#000000',
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 10,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop : 9,
        marginBottom : 8

    },
    cadastro: {
        padding: 2,
        backgroundColor: '#f9fafc',
        borderBottomWidth: 2,
        borderColor: '#1C1C1C',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop : 9,
        marginBottom : 8

    },
   
    buttonText : {
        fontFamily: 'Roboto',
        fontSize: 20,
        color: '#000000'

    },

    buttonTextCadastro : {
        fontFamily: 'Roboto',
        fontSize: 20,
        color: '#1C1C1C'

    },
    tinyLogo: {
        width: 166,
        height: 100,
      },
      logo: {
        width: 66,
        height: 58,
      },
    
 })

export default Inicial;