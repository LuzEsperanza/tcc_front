import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';

import Inicial from './pages/Inicial'
import Cadastro from './pages/Cadastro'
import Denunciar from './pages/Denunciar';
import Usuario from './pages/Usuario';
import Principal from './pages/Principal';
import Login from './pages/Login';

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
                component={Cadastro}
                options ={{
                    headerShown:true,
                    header: ()=><Header  title='Cadastre-se'/>

                }}
                />
            <Screen
                name="Usuario"
                component={Usuario}
                options ={{
                    headerShown:true,
                    header: ()=><Header  title='Meu Perfil'/>

                }}
                />
            <Screen
                name="Principal"
                component={Principal}
                options ={{
                    headerShown:true,
                    header: ()=><HeaderP title='Principal'/>

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
                 <Screen 
                name="Login"
                component={Login}
                options ={{
                    headerShown:true,
                    header: ()=><Header  title='Faça seu login'/>

                }}
                />
                
            
            
            
            
            
            
                
            
            
            
               
               
                
                
            </Navigator>

        </NavigationContainer>

    );
}

export default Routes;