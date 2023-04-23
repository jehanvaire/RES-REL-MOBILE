import React, { useContext, useMemo, useReducer } from "react";
import { MMKV } from "react-native-mmkv";

import { AuthentificationEnum } from "../ressources/enums/AuthentificationEnum";
import { UtilisateurEntity } from "../ressources/models/UtilisateurEntity";

const AuthContext = React.createContext({} as any);

const AUTHENTICATED = AuthentificationEnum.AUTHENTICATED;
const ACCESS_TOKEN_KEY = AuthentificationEnum.ACCESS_TOKEN_KEY;
const CURRENT_USER = AuthentificationEnum.CURRENT_USER;

export const storage = new MMKV();

const getUtilisateurToken = () => {
  return storage.getString(ACCESS_TOKEN_KEY);
};

const getUtilisateur = async (token: string) => {
  const response = await fetch("https://api.victor-gombert.fr/api/v1", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
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

  const login = async (email: string, password: string) => {
    const response = await fetch("https://api.victor-gombert.fr/api/v1/connexion", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la connexion");
    }

    return response.json();
  };

  const facade = useMemo(
    () => ({
      login: async (email: string, password: string) => {
        try {
          const result = await login(email, password);

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

export function getTokenFromStorage() {
  return storage.getString(ACCESS_TOKEN_KEY);
}
export const useAuth = () => useContext(AuthContext);
