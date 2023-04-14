export declare global {
    namespace ReactNavigation {
      interface RootParamList {
        Principal: {numero: number};
        Cadastro: {numero: number};
        Denunciar: {
          position: {
            latitude:number;
            longitude:number;
            latitudeDelta:number;
            longitudeDelta:number
          }
        };
        Inicial: undefined;
        Usuario:  {id: number};
        Login: {numero: number};
        Check: {id: number};
        Mapa: {id:number};
        CadastroAnonimo: {id:number};
        LoginAnonimo: {numero: number};
        PrincipalAnonimo: {id: number};
        MapaAnonimo: {id:number};
        DenunciarAnonimo: {
          position: {
            latitude:number;
            longitude:number;
            latitudeDelta:number;
            longitudeDelta:number
          }
        };
        CheckAnonimo: {id: number};       
        
      }
    }
  }