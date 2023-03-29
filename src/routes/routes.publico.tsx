import React from 'react';
import { createNativeStackNavigator} from '@react-navigation/native-stack';

import Inicial from '../pages/Inicial'
import Cadastro from '../pages/Cadastro'
import Login from '../pages/Login';
import Header from '../components/Header';



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
                name="Login"
                component={Login}
                options ={{
                    headerShown:true,
                    header: ()=><Header  title='Faça seu login'/>

                }}
                />
                
        </Navigator>
        

       

    );
}

export default RoutesPublico;