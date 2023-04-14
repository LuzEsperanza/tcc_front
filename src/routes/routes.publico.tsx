import React from 'react';
import { createNativeStackNavigator} from '@react-navigation/native-stack';

import Inicial from '../pages/Inicial'
import Cadastro from '../pages/Cadastro';
import CadastroAnonimo from '../pages/CadastroAnonimo';
import Login from '../pages/Login';
import LoginAnonimo from '../pages/LoginAnonimo';
import Header from '../components/Header';
import HeaderPA from '../components/HeaderPA';
import PrincipalAnonimo from '../pages/PrincipalAnonimo';
import MapaAnonimo from '../pages/MapaAnonimo';
import DenunciarAnonimo from '../pages/DenunciarAnonimo';
import CheckAnonimo from '../pages/CheckAnonimo';

const {Navigator, Screen} = createNativeStackNavigator();
const RoutesPublico : React.FC = () => {
    return (
      
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
                name="CadastroAnonimo"
                component={CadastroAnonimo}
                options ={{
                    headerShown:true,
                    header: ()=><Header  title='Cadastre-se anonimamente'/>

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
            <Screen 
                name="LoginAnonimo"
                component={LoginAnonimo}
                options ={{
                    headerShown:true,
                    header: ()=><Header  title='Faça seu login anonimamente'/>

                }}
                />
             <Screen 
                name="PrincipalAnonimo"
                component={PrincipalAnonimo}
                options ={{
                    headerShown:true,
                    header: ()=><HeaderPA  title='Principal'/>

                }}
                />
            <Screen 
                name="MapaAnonimo"
                component={MapaAnonimo}
                options ={{
                    headerShown:true,
                    header: ()=><Header  title='Selecione um local'/>

                }}
                />
            <Screen 
                name="Denunciar"
                component={DenunciarAnonimo}
                options ={{
                    headerShown:true,
                    header: ()=><Header  title='Denunciar'/>

                }}
                />
             <Screen 
                name="Check"
                component={CheckAnonimo}
                options ={{
                    headerShown:true,
                    header: ()=><Header  title='Selecione um possivel delito'/>

                }}
                />
            
                
        </Navigator>
        

       

    );
}

export default RoutesPublico;