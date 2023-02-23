import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CheckBox = ({options = [], onChange})=>{
    const [selected, setSelected] = useState([]);
    function toggle(id){
        let index = selected.findIndex((i)=> i === id);
        let arrSelecteds = [...selected];

        if(index !== -1){
            arrSelecteds.splice(index, 1);

        }else{
            arrSelecteds.push(id);
        }

    }
    useEffect(()=> onChange(selected), [selected])
    return(
        <View style={styles.container}>
            {options.map((op, index) =>(
                <View style={styles.optionContainer}>
                    <TouchableOpacity
                       style={[styles.touchable,{
                        backgroundColor:selected.findIndex(i=> i === op.id) !== -1
                        ?'#3EBD93'
                        :'#fff'

                       
                       }]} 
                       onPress={() => toggle(op?.id)}
                    >
                        {
                            selected.findIndex(i=> i === op.id) !== -1 ? (
                                // <Icon name="check-bold" size={16} color="#3EBD93" />
                                // <Ionicons name="check" color={'#3EBD93'} size={16} />
                                <Text>+</Text>

                            ) : null 
                        }
                        
                    </TouchableOpacity>
                    <Text style={styles.optext}>{op?.text}</Text>
                </View>
               
            ))}           
       
        </View>
    );
};
const styles = StyleSheet.create({
    container : {
        marginLeft: 12

    },

  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7

  },
  touchable:{
    height: 20,
    width: 20,
    borderRadius: 4,
    borderColor: '#3EBD93', 
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'

  },
  optext : {
    marginLeft: 12,
    color: '#555',
    fontSize: 16,
    
  }
 })
export default CheckBox;