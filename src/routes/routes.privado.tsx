import React from 'react';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import Denunciar from '../pages/Denunciar';
import Usuario from '../pages/Usuario';
import Principal from '../pages/Principal';
import Header from '../components/Header';
import HeaderP from '../components/HeaderP'


const {Navigator, Screen} = createNativeStackNavigator();
const RoutesPrivado : React.FC = () => {
    return (
      
        <Navigator>
             
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
                     
        </Navigator>

      

    );
}

export default RoutesPrivado;