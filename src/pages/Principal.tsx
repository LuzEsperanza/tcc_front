import React, {useEffect,useState} from 'react';
import { View,Text, StyleSheet} from 'react-native';
import { ScrollView, TextInput} from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons';
import api from '../services/api';
import {useMyContext} from '../context/AuthProvider';

interface Denuncia{
    id:number;    
    descricao:string;
    horaDenuncia: string;
    encaminhado: string;
    condicao: string;
    CrimeAmbiental:{
        tilulo:string;
    };
    Pertence:{
        id:number;
    }     
}


const Principal : React.FC = () => {
       
    const [denuncias, setDenuncias] = useState<Denuncia[]>([]);
    const {denunciante} = useMyContext();
    
    console.log(denunciante.denuncianteID)
    const getUsers = async () => {
        const consulta = '/denuncia/';
        const teste = consulta.concat(denunciante.denuncianteID.toString())
        const users = await api.get(teste);
        setDenuncias(users.data);
    };
   
    useEffect(() => {
        getUsers();
    }, []); 
    
    return (
        <ScrollView >
            <Text style={styles.titulo}>Minhas denúncias</Text>

            {denuncias.map(denuncia =>(
                <View key={denuncia.Pertence.id} style={styles.caixa}>
            
                    <Text style={styles.title}>{denuncia.CrimeAmbiental.tilulo}</Text>

                    <Text style={styles.status}>Data de criação</Text>
                            <View style={styles.input}>
                                <Feather  size={20} style={styles.calendario} name='calendar'/>
                                <Text  style={styles.data}>{denuncia.horaDenuncia}</Text>

                            </View>
            
            
                    <View style={styles.caixa2}>
                        <View>
                            <Text style={styles.status}>Status da denúncia</Text>
                    
                                <TextInput style={styles.inputStatus}>
                                    <Text>{denuncia.condicao}</Text>
                                </TextInput>

                        </View>

                        <View>
                            <Text style={styles.status}>Encaminhada</Text>

                            <View style={styles.inputStatus}>

                                <Text  style={styles.data}>{denuncia.encaminhado}</Text>

                            </View>
                            
                   
                        </View>
                                
                    </View>
                    
                    <Text style={styles.descricao}>Descrição</Text>
                    
                    <TextInput style={styles.inputdescricao}>
                        <Text>{denuncia.descricao}</Text>
                    </TextInput>


                  
                    
                </View>)
            )}

        </ScrollView>
       
    );
}
const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        top: '20%'
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
        borderColor: '#A9A9A9',
        marginLeft: 20
    },
    title : {
        fontSize: 20,
        fontFamily: 'Roboto',   
    },
    caixa2 : {
        flex:1,        
        width: 360,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        textAlign: 'center',
        width: 200,
    },
    inputStatus : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1.4,
        borderRadios: 20,
        flex: 1,
        padding: 5,
        alignItems: 'center',
        marginBottom: 1,
        width: 175,
       
    },
    inputdescricao : {
        
        borderWidth: 1.4,
        borderRadios: 20,
        flex: 1,
        padding: 5,        
        marginBottom: 1,        
        width: 360,
       
    },
    status : {
        fontWeight: 'bold',
        fontSize: 16,
        
    },
    descricao : {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'right'
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

export default Principal;