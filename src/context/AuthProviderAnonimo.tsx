import React,{createContext, useContext, useEffect, useState} from 'react';
import api from '../services/api'

interface Anonimo{
  id:number;
  token: string;
}

interface IContexto{
    anonimo:Anonimo | null,
    logar: (codigo:string)=> Promise<void>;
    deslogar(): Promise<void>;
    isLogado:boolean;
  }
  const AuthContext = createContext<IContexto>({} as IContexto);
  
  interface ResponseData{
    anonimo:Anonimo | null;
    token: string;
    
  }
 
  
  interface IProps{
    children:React.ReactNode;
  }
  
  export function AuthProvider({children}:IProps){
    const [anonimo, setAnonimo] = useState<Anonimo | null>(null);
   
    
    async function logar(codigo:string){   
      try {
        const dados ={
          codigo
        }
        console.log("oi")
        const response = await api.post('/anonimo/login', codigo);
      
  
        const {anonimo, token} = response.data as ResponseData;
        console.log(anonimo.token);
  
        api.defaults.headers.common.Authorization = `Bearer ${anonimo.token}`;
      
       
        setAnonimo(anonimo);
      } catch (error) {
        console.log(error);
      }
    }
    
  
    async function deslogar(){
      setAnonimo(null);
      
    }
  
        
    return (
      <AuthContext.Provider
        value={{logar,anonimo,deslogar, isLogado:!!anonimo}} 
      >
        {children}
      </AuthContext.Provider>
    );
  }
  
  export function useMyContext(){
    const contexto = useContext(AuthContext);
    return contexto;
  }