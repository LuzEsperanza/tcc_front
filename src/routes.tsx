import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';

import Inicial from './pages/Inicial'
import cadastro from './pages/cadastro'
import Denunciar from './pages/Denunciar';
import PaginaUsuario from './pages/paginaUsuario';
import AcompanhamentoDenuncia from './pages/AcopanhamentoDenucia';

import Header from './components/Header';
import HeaderP from './components/HeaderP'

const {Navigator, Screen} = createNativeStackNavigator();
const Routes : React.FC = () => {
    return (

        <NavigationContainer >
            <Navigator>

            <Screen 
                name="Inicial"
                component={Inicial} 
                options ={{headerShown:false}}/>
            
            <Screen 
                name="Cadastro"
                component={cadastro}
                options ={{
                    headerShown:true,
                    header: ()=><Header  title='Cadastre-se'/>

                }}
                />
            <Screen
                name="Usuario"
                component={PaginaUsuario}
                options ={{
                    headerShown:true,
                    header: ()=><Header  title='Meu Perfil'/>

                }}
                />
            <Screen
                name="Acompanhemento"
                component={AcompanhamentoDenuncia}
                options ={{
                    headerShown:true,
                    header: ()=><HeaderP title='acompanhamento'/>

                }}
                />
                <Screen 
                name="Denunciar"
                component={Denunciar}
                options ={{
                    headerShown:true,
                    header: ()=><Header  title='Denunciar'/>

                }}
                />
                
                
            
            
            
            
            
            
                
            
            
            
               
               
                
                
            </Navigator>

        </NavigationContainer>

    );
}

export default Routes;