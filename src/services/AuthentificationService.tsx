import React, { useContext, useMemo, useReducer } from "react";
import { MMKV } from "react-native-mmkv";

import { AuthentificationEnum } from "../ressources/enums/AuthentificationEnum";
import { UtilisateurEntity } from "../ressources/models/UtilisateurEntity";
import axios from "axios";

const AuthContext = React.createContext({} as any);

const AUTHENTICATED = AuthentificationEnum.AUTHENTICATED;
const UNAUTHENTICATED = AuthentificationEnum.UNAUTHENTICATED;
const ACCESS_TOKEN_KEY = AuthentificationEnum.ACCESS_TOKEN_KEY;
const CURRENT_USER = AuthentificationEnum.CURRENT_USER;

export const storage = new MMKV();
// storage.clearAll();

export const getUtilisateurToken = () => {
  return storage.getString(ACCESS_TOKEN_KEY);
};

const getUtilisateur = async (idUtilisateur: string) => {
  const utilisateur = await axios.get(
    "https://api.victor-gombert.fr/api/v1/utilisateurs/" + idUtilisateur
  );
  return utilisateur.data;
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
    const response = await axios.post(
      "https://api.victor-gombert.fr/api/v1/connexion",
      {
        mail: mail,
        motDePasse: motDePasse,
      }
    );

    if (!response.data == null) {
      console.log("Log de la réponse:", response.data);
      throw new Error("Erreur lors de la connexion");
    }

    return response.data;
  };

  const inscription = async (utilisateur: UtilisateurEntity) => {
    const formattedDate = utilisateur.dateNaissance
      ? `${utilisateur.dateNaissance.toISOString().split("T")[0]} 00:00:00`
      : null;
    const response = await axios.post(
      "https://api.victor-gombert.fr/api/v1/inscription",
      {
        motDePasse: utilisateur.motDePasse,
        mail: utilisateur.mail,
        dateNaissance: formattedDate,
        codePostal: utilisateur.codePostal,
        nom: utilisateur.nom,
        prenom: utilisateur.prenom,
        bio: utilisateur.bio,
      }
    );

    if (!response.data == null) {
      console.log("Log de la réponse:", response.data);
      throw new Error("Erreur lors de l'inscription");
    }

    return response.data;
  };

  const facade = useMemo(
    () => ({
      login: async (mail: string, password: string) => {
        const result = await login(mail, password);

        storage.set(ACCESS_TOKEN_KEY, String(result.access_token));

        let user = (await getUtilisateur(result.idUti)) as UtilisateurEntity;

        storage.set(CURRENT_USER, JSON.stringify(user));

        dispatch({ type: AUTHENTICATED });
      },
      inscription: async (utilisateur: UtilisateurEntity) => {
        const result = await inscription(utilisateur);
        console.log("result:", result);
        storage.set(ACCESS_TOKEN_KEY, String(result.token));
        storage.set(CURRENT_USER, JSON.stringify(result.response));

        if (result.response == null) {
          dispatch({ type: UNAUTHENTICATED });
          return;
        }

        dispatch({ type: AUTHENTICATED });
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
export const useAuth = () => useContext(AuthContext);
