import React, { useState }  from 'react';

import { StyleSheet, Text, View, Pressable, StatusBar, FlatList } from 'react-native';

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Card } from 'react-native-paper';

import Constants from 'expo-constants';

import {useNavigation, useRoute}  from '@react-navigation/native';

import api from '../services/api';
interface Anonimo{
    
    anonima: number;
    denuncia:number
   
}

const data = [

    { id: 1, txt: 'Maus tratos', isChecked: false },

    { id: 2, txt: 'Transporte ilegal', isChecked: false },

    { id: 3, txt: 'Comércio ilegal', isChecked: false },

    { id: 4, txt: 'Caça ilegal', isChecked: false },

    { id: 5, txt: 'Abandono de animais', isChecked: false },

    { id: 6, txt: 'Pesca predatória', isChecked: false },

    { id: 7, txt: 'Queimadas', isChecked: false },

];


const App = () => {

    const [products, setProducts] = React.useState(data);


    const handleChange = (id) => {

        let temp = products.map((product) => {

            if (id === product.id) {

                return { ...product, isChecked: !product.isChecked };

            }

            return product;

        });

        setProducts(temp);

    };


    let selected = products.filter((product) => product.isChecked);


    const renderFlatList = (renderData) => {

        return (

            <FlatList

                data={renderData}

                renderItem={({ item }) => (

                    <Card style={{ margin: 5 }}>

                        <View style={styles.card}>

                            <View

                                style={{

                                    flexDirection: 'row',

                                    flex: 1,

                                    justifyContent: 'space-between',

                                }}>

                                <Pressable onPress={() => handleChange(item.id)} >

                                    <MaterialCommunityIcons

                                        name={item.isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'} size={24} color="#000" />

                                </Pressable>

                                <Text>{item.txt}</Text>

                            </View>

                        </View>

                    </Card>

                )}

            />

        );

    }
    const route = useRoute();
    //Pegar id de Anonimo
    const informacao= route.params as Anonimo
    const denuncia = informacao.denuncia
    console.log(denuncia)
    
    const id = informacao.anonima
    console.log(id)    
    // const crimes = Array(5).fill(0)
    const [crimes, setCrimes] = useState<string[]>([]);
    var delito = [];
    const navigation = useNavigation();

    async function salvar(denuncia, crimeAmbiental) {
        console.log(typeof crimeAmbiental)
        await api.post('/pertence', {crimeAmbiental, denuncia}).then((response) =>
        {
           return response.data
          
           
        })
        
    }
   
    async function handleNextStep (){
        selected.map( selected =>{
            const id = selected.id
            delito.push(id)      
       
        })
        delito.forEach( d =>{
            salvar(denuncia, d)
        })
        console.log("oi")
        navigation.navigate('PrincipalAnonimo',{id})
         
    } 
    
    return (

        <View style={styles.container}>

            <View style={{ flex: 1 }}>

                {renderFlatList(products)}

            </View>

            <Text style={styles.text}>Selecionados </Text>

            <View style={{ flex: 1 }}>

                {renderFlatList(selected)}

            </View>
            <Pressable style={styles.cadastro} onPress={()=>handleNextStep()}>
                <Text style={styles.buttonText}>Salvar</Text>
            </Pressable>

            <StatusBar />

        </View>

    );

}


const styles = StyleSheet.create({

    container: {

        flex: 1,

        justifyContent: 'center',

        paddingTop: Constants.statusBarHeight,

        backgroundColor: '#ecf0f1',

        padding: 8,

    },

    card: {

        padding: 10,

        margin: 5,

        flexDirection: 'row',

        justifyContent: 'space-between',

    },

    modalView: {

        margin: 20,

        backgroundColor: 'white',

        borderRadius: 20,

        padding: 5,

        justifyContent: 'space-between',

        alignItems: 'center',

        elevation: 5,

    },

    text: {

        textAlign: 'center',

        fontWeight: 'bold',

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
        margin: 20,
        width: 200,
        justifyContent: 'center',
        padding: 10,
        marginLeft: 80,
        marginBottom: 80        
    },
    buttonText : {
        fontFamily: 'Roboto',
        fontSize: 20,
        color: '#f9fafc'

    },

});


export default App;