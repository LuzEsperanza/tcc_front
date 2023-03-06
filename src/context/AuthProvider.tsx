import React,{createContext, useContext, useEffect, useState} from 'react';
import api from '../services/api'

interface Denunciante{
  denuncianteID:number;
  token: string;
}

interface IContexto{
    denunciante:Denunciante | null,
    logar: (email:string, senha:string)=> Promise<void>;
    deslogar(): Promise<void>;
    isLogado:boolean;
  }
  const AuthContext = createContext<IContexto>({} as IContexto);
  
  interface ResponseData{
    denunciante:Denunciante | null;
    token: string;
    
  }
  
  interface IProps{
    children:React.ReactNode;
  }
  
  export function AuthProvider({children}:IProps){
    const [denunciante, setDenunciante] = useState<Denunciante | null>(null);
  
    
    async function logar(email:string, senha:string){   
      try {
        const dados ={
          email, senha
        }
        const response = await api.post('/denunciante/login', dados);
      
  
        const {denunciante, token} = response.data as ResponseData;
        console.log(denunciante.token);
  
        api.defaults.headers.common.Authorization = `Bearer ${denunciante.token}`;
      
       
        setDenunciante(denunciante);
      } catch (error) {
        console.log(error);
      }
    }
  
    async function deslogar(){
      setDenunciante(null);
      
    }
  
        
    return (
      <AuthContext.Provider
        value={{logar,denunciante,deslogar, isLogado:!!denunciante}} 
      >
        {children}
      </AuthContext.Provider>
    );
  }
  
  export function useMyContext(){
    const contexto = useContext(AuthContext);
    return contexto;
  }