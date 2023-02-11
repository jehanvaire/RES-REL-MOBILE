import React, { useContext, useEffect, useMemo, useReducer } from "react";
import { MMKV } from "react-native-mmkv";

const AuthContext = React.createContext({} as any);

const AUTHENTICATED = "AUTHENTICATED";
const ACCESS_TOKEN_KEY = "access_token";
export const storage = new MMKV();

// clear storage
// storage.clearAll();

const getUtilisateurToken = () => {
  // Récupère le token de l'utilisateur
  return fetch("https://run.mocky.io/v3/dd598227-c275-48e8-9840-c588293ead84", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName: "bony-a",
    }),
  }).then((result) => result.json());
};

const getUtilisateur = (token: string) => {
  return fetch("https://run.mocky.io/v3/5910a865-8ebf-4fab-b27f-70f96551c5d4", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((result) => result.json());
};

// Récupère le
export const AuthContainer = ({ children }: any) => {
  const [authState, dispatch] = useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        // Handle the AUTHENTICATED action and set the state to be authenticated
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

  const facade = useMemo(
    () => ({
      register: async () => {
        try {
          const result = await getUtilisateurToken();

          storage.set(ACCESS_TOKEN_KEY, String(result.access_token));

          dispatch({ type: AUTHENTICATED });
        } catch (error) {
          console.error(error);
        }
      },

      resume: async () => {
        const token = storage.getString(ACCESS_TOKEN_KEY);

        // When no token is found, don't try to fetch the user
        if (!token) {
          return;
        }

        const user = await getUtilisateur(token);
        console.log(`user`, user.userName);

        dispatch({ type: AUTHENTICATED });
      },
    }),
    []
  );

  // Déclenche la fonction resume au chargement de l'application
  useEffect(() => {
    facade.resume();
  }, []);

  return (
    <AuthContext.Provider value={facade}>
      {children(authState)}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
