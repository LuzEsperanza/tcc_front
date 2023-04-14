import React,{createContext, useContext, useEffect, useState} from 'react';
import api from '../services/api';

export const AuthContext = createContext({})

function AuthProvider(children){
    return(
        <AuthContext.Provider value={{codigo : "0"}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;