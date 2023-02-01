import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import api from '../services/api';

interface NomeInputProps {
  addTask: (task: string) => void;
}

export function NomeInput({ addTask }: NomeInputProps) {
    const [nomeDenunciado, setNome] = useState('');
    const [todo, setTodo] = useState<NomeInputProps>();

  async function handleAddNewTask() {
    
    todo.addTask(nomeDenunciado);
    console.log(nomeDenunciado)
    // await api.post('/foto', {nomeDenunciado }).then((response) =>
    // {
    //    return response.data
      
       
    // })

    
    //TODO - Call addTask if task not empty and clean input value 
  }

  return (
    
    <View style={styles.inputContainer}>

      <TextInput 
        style={styles.input} 
        
        placeholderTextColor="#B2B2B2"
        returnKeyType="send"
        selectionColor="#666666"
        onChangeText={setNome}
      />
      <Pressable
        
        
        style={styles.addButton}
        onPress={()=>handleAddNewTask()}
      >
        <Icon name="plus" size={24} color="#B2B2B2" />
      </Pressable>
    </View>
    
  
   
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1.4,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FFF',
    height: 54,
    marginBottom: 16,
    marginTop: 10,
    marginHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginLeft: 5,
    width: '90%',
  },
  input: {
    flex: 1,
    height: 47,
    paddingHorizontal: 20,
   
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderRightWidth: 1,
    borderRightColor: '#EBEBEB',
    color: '#666666'
  },
  addButton: {
    backgroundColor: '#FFF',
    height: 47,
    paddingHorizontal: 13,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
});