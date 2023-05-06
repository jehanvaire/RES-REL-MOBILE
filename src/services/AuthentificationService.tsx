import React, { useContext, useEffect, useMemo, useReducer } from "react";
import { MMKV } from "react-native-mmkv";

import { AuthentificationEnum } from "../ressources/enums/AuthentificationEnum";
import { UtilisateurEntity } from "../ressources/models/UtilisateurEntity";
import axios from "axios";

const AuthContext = React.createContext({} as any);

const AUTHENTICATED = AuthentificationEnum.AUTHENTICATED;
const UNAUTHENTICATED = AuthentificationEnum.UNAUTHENTICATED;
const ACCESS_TOKEN_KEY = AuthentificationEnum.ACCESS_TOKEN_KEY;
const CURRENT_USER = AuthentificationEnum.CURRENT_USER;
const ROLE_UTILISATEUR_PAR_DEFAUT = 1;

export const storage = new MMKV();
// storage.clearAll();

const getUtilisateur = async (idUtilisateur: string) => {
  const utilisateur = await axios.get(
    "https://api.victor-gombert.fr/api/v1/utilisateurs/" + idUtilisateur
  );
  return utilisateur.data.data;
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
        case UNAUTHENTICATED:
          return {
            ...prevState,
            authenticated: false,
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
      throw new Error("Erreur lors de la connexion");
    }

    return response.data;
  };

  const inscription = async (utilisateur: UtilisateurEntity) => {
    const formattedDate = utilisateur.dateNaissance
      ? `${utilisateur.dateNaissance.toISOString().split("T")[0]} 00:00:00`
      : null;

    // Ajoutez cette ligne pour définir le rôle par défaut
    utilisateur.role = ROLE_UTILISATEUR_PAR_DEFAUT;

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
        role: utilisateur.role, // Ajoutez cette ligne pour envoyer le rôle à l'API
      }
    );

    if (!response.data == null) {
      throw new Error("Erreur lors de l'inscription");
    }

    return response.data;
  };

  const facade = useMemo(
    () => ({
      login: async (mail: string, password: string) => {
        const result = await login(mail, password);

        storage.set(ACCESS_TOKEN_KEY, String(result.token));

        let user = (await getUtilisateur(result.idUti)) as UtilisateurEntity;

        storage.set(CURRENT_USER, JSON.stringify(user));

        dispatch({ type: AUTHENTICATED });
      },
      inscription: async (utilisateur: UtilisateurEntity) => {
        const result = await inscription(utilisateur);
        storage.set(ACCESS_TOKEN_KEY, String(result.token));
        storage.set(CURRENT_USER, JSON.stringify(result.response));

        dispatch({ type: AUTHENTICATED });
      },
      resume: async () => {
        const token = storage.getString(ACCESS_TOKEN_KEY);

        if (!token) {
          return;
        }

        const user = storage.getString(CURRENT_USER);

        if (token && user) {
          dispatch({ type: AUTHENTICATED });
        }
      },
      logout: async () => {
        storage.delete(ACCESS_TOKEN_KEY);
        storage.delete(CURRENT_USER);
        dispatch({ type: UNAUTHENTICATED });
      },
    }),
    []
  );

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
