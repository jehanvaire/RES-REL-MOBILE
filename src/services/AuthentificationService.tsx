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

export const getUtilisateurToken = () => {
  return storage.getString(ACCESS_TOKEN_KEY);
};

const getUtilisateur = async (token: string) => {
  const BearerToken = token || getUtilisateurToken();

  const response = await axios.get("utilisateurs", {
    headers: {
      Authorization: `Bearer ${BearerToken}`,
    },
  });

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
          mail: mail,
          motDePasse: motDePasse,
        }
      );

      if (!response.data == null) {
        console.log("Log de la réponse:", response.data);
        throw new Error("Erreur lors de la connexion");
      }

      return response.data;
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
    }
  };

  const inscription = async (utilisateur: UtilisateurEntity) => {
    // try {
    const formattedDate = utilisateur.dateNaissance
      ? `${utilisateur.dateNaissance.toISOString().split("T")[0]} 00:00:00`
      : null;
    console.log("Before axios call", utilisateur);
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
    // } catch (error) {
    //   console.error("Erreur lors de l'inscription:", error);
    // }
  };

  const facade = useMemo(
    () => ({
      login: async (mail: string, password: string) => {
        console.log("email:", mail, "password:", password);
        try {
          const result = await login(mail, password);
          console.log("result:", result);

          storage.set(ACCESS_TOKEN_KEY, String(result.access_token));

          let user = (await getUtilisateur(
            result.access_token
          )) as UtilisateurEntity;

          storage.set(CURRENT_USER, JSON.stringify(user));

          dispatch({ type: AUTHENTICATED });
        } catch (error) {
          console.error(error);
        }
      },
      inscription: async (utilisateur: UtilisateurEntity) => {
        try {
          //console.log("nom", nom, "prenom", prenom, "dateNaissance", dateNaissance, "codePostal", codePostal, "mail", mail, "motDePasse", motDePasse, "bio", bio)
          const result = await inscription(utilisateur);
          console.log("result:", result);
          storage.set(ACCESS_TOKEN_KEY, String(result.token));

          let user = (await getUtilisateur(result.token)) as UtilisateurEntity;

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
export const useAuth = () => useContext(AuthContext);
