import React, { useContext, useMemo, useReducer } from "react";
import { MMKV } from "react-native-mmkv";

import { AuthentificationEnum } from "../ressources/enums/AuthentificationEnum";
import { UtilisateurEntity } from "../ressources/models/UtilisateurEntity";
import axios from "axios";

const AuthContext = React.createContext({} as any);

const AUTHENTICATED = AuthentificationEnum.AUTHENTICATED;
const ACCESS_TOKEN_KEY = AuthentificationEnum.ACCESS_TOKEN_KEY;
const CURRENT_USER = AuthentificationEnum.CURRENT_USER;

export const storage = new MMKV();

const getUtilisateurToken = () => {
  return storage.getString(ACCESS_TOKEN_KEY);
};

const getUtilisateur = async (token: string) => {
  const BearerToken = token || getUtilisateurToken();
  console.log("Before axios call");
  const response = await axios.get("https://api.victor-gombert.fr/api/v1/utilisateur", {
    headers: {
      Authorization: `Bearer ${BearerToken}`,
    },
  });
  console.log("After axios call");

  if (!response.data == null) {
    throw new Error("Erreur lors de la connexion");
  }

  return response.data;
};

export const AuthContainer = ({ children }: any) => {
  const [authState, dispatch] = useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case AUTHENTICATED:
          return {
            ...prevState,
            authenticated: true,
          };
        default:
          throw new Error(
            `${action.type} est un type d'action non pris en charge`
          );
      }
    },
    {
      authenticated: false,
      initialized: false,
    }
  );

  const login = async (mail: string, motDePasse: string) => {
    console.log("Before axios call", mail, motDePasse);
    try {
      const response = await axios.post(
        "https://api.victor-gombert.fr/api/v1/connexion",
        {
          mail,
          motDePasse,
        },
      );
      console.log("After axios call", response);

      if (!response.data == null) {
        console.log("Log de la réponse:", response.data);
        throw new Error("Erreur lors de la connexion");
      }

      return response.data;
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
    }
  };

  const facade = useMemo(
    () => ({
      login: async (mail: string, password: string) => {
        console.log("email:", mail, "password:", password);
        try {
          const result = await login(mail, password);
          console.log("result:", result)

          storage.set(ACCESS_TOKEN_KEY, String(result.access_token));

          let user = (await getUtilisateur(result.access_token)) as UtilisateurEntity;

          storage.set(CURRENT_USER, JSON.stringify(user));

          dispatch({ type: AUTHENTICATED });
        } catch (error) {
          console.error(error);
        }
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={facade}>
      {children(authState)}
    </AuthContext.Provider>
  );
};

// export function getTokenFromStorage() {
//   return storage.getString(ACCESS_TOKEN_KEY);
// }

export const getTokenFromStorage = () => {
  return storage.getString(ACCESS_TOKEN_KEY);
};
export const useAuth = () => useContext(AuthContext);
