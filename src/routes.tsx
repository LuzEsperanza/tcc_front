import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';

import Inicial from './pages/inicial'
import cadastro from './pages/cadastro'
import Denunciar from './pages/denunciar';

import Header from './components/Header';

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
            
            
                
            <Screen name="Denunciar" component={Denunciar}/>
            
            
               
               
                
                
            </Navigator>

        </NavigationContainer>

    );
}

export default Routes;