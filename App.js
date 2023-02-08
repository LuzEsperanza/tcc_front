import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {AppLoading} from 'expo';
import { StyleSheet, Text, View} from 'react-native';
import {useFonts } from 'expo-font';
import {Nunito_600SemiBold, Nunito_800ExtraBold, Nunito_700Bold} from '@expo-google-fonts/nunito'
import {AuthProvider} from './src/context/AuthProvider';
import Routes from './src/routes/routes';

export default function App() {
  // const [fontsLoaded] = useFonts({
  //   Nunito_600SemiBold,
  //   Nunito_800ExtraBold,
  //   Nunito_700Bold
  // })
  // if(!fontsLoaded){
  //   return <AppLoading/>

  // }
  return (
    <AuthProvider>
       <Routes/>

    </AuthProvider>
   
  );
}

