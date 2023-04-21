import React, { useContext, useEffect, useMemo, useReducer } from "react";
import { MMKV } from "react-native-mmkv";

import { AuthentificationEnum } from "../ressources/enums/AuthentificationEnum";
import { UtilisateurEntity } from "../ressources/models/UtilisateurEntity";

const AuthContext = React.createContext({} as any);

const AUTHENTICATED = AuthentificationEnum.AUTHENTICATED;
const ACCESS_TOKEN_KEY = AuthentificationEnum.ACCESS_TOKEN_KEY;
const CURRENT_USER = AuthentificationEnum.CURRENT_USER;
const token = "11|R8yFnLwc8PQsCdQlU3Djwvr57z1TWLaZTZGar3yH"; // A ENLEVER QUAND LOGIN FONCTIONNEL
export const storage = new MMKV();
//storage.clearAll();

// clear storage
// TODO: a supprimer
// storage.clearAll();

const getUtilisateurToken = () => {
  // Récupère le token de l'utilisateur
  return fetch("https://api.victor-gombert.fr/api/v1", {
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
  return fetch("https://api.victor-gombert.fr/api/v1", {
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

          // storage.set(ACCESS_TOKEN_KEY, String(result.access_token));
          storage.set(ACCESS_TOKEN_KEY, String(token));

          let user = (await getUtilisateur(token)) as UtilisateurEntity;

          // Add all other user Attributes here
          // TODO: à supprimer après
          user.id = 1;
          user.prenom = "Adrien";
          user.nom = "Bony";
          user.bio = "Bonjour je suis du contenu";
          user.dateNaissance = new Date("1995-01-01");
          user.dateInscription = new Date("2020-01-01");
          user.role = 1;

          storage.set(CURRENT_USER, JSON.stringify(user));

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

        let user = await getUtilisateur(token);

        // Add all other user Attributes here
        // TODO: à supprimer après
        user.id = 1;
        user.prenom = "Adrien";
        user.nom = "Bony";
        user.contenu = "Bonjour je suis du contenu";
        user.dateNaissance = new Date("1995-01-01");
        user.dateInscription = new Date("2020-01-01");
        user.role = 1;

        storage.set(CURRENT_USER, JSON.stringify(user));

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
export function getTokenFromStorage() {
  return storage.getString(ACCESS_TOKEN_KEY);
}
export const useAuth = () => useContext(AuthContext);