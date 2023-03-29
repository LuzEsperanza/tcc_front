import React from 'react';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import Denunciar from '../pages/Denunciar';
import Usuario from '../pages/Usuario';
import Principal from '../pages/Principal';
import Check from '../pages/Check';
import Mapa from '../pages/Mapa';
import Header from '../components/Header';
import HeaderP from '../components/HeaderP';
import HeaderU from '../components/HeaderU'

const {Navigator, Screen} = createNativeStackNavigator();
const RoutesPrivado : React.FC = () => {
    return (
      
        <Navigator>
             
            <Screen
                name="Usuario"
                component={Usuario}
                options ={{
                    headerShown:true,
                    header: ()=><HeaderU  title='Meu Perfil'/>

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
                name="Check"
                component={Check}
                options ={{
                    headerShown:true,
                    header: ()=><Header  title='Selecione um possivel delito'/>

                }}
                />
            <Screen 
                name="Mapa"
                component={Mapa}
                options ={{
                    headerShown:true,
                    header: ()=><Header  title='Selecione um local'/>

                }}
                />
                               
        </Navigator>

      

    );
}

export default RoutesPrivado;