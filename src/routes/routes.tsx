import {useMyContext} from '../context/AuthProvider';

import RoutesPrivado from './routes.privado';
import RoutePublico from './routes.publico';
import {NavigationContainer} from '@react-navigation/native'


export default function Routes(){
  const {isLogado} = useMyContext();
  console.log(isLogado);
  return (
    <NavigationContainer>
        {isLogado ? <RoutesPrivado/> : <RoutePublico />}
    </NavigationContainer>
  )
}