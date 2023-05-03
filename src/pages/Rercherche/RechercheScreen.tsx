import { Center, Stack } from "native-base";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
import { View } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { UtilisateurEntity } from "../../ressources/models/UtilisateurEntity";
import { storage } from "../../services/AuthentificationService";
import { AuthentificationEnum } from "../../ressources/enums/AuthentificationEnum";
import RechercheService from "../../services/RechercheService";
import Filtre from "../../components/Filtre";
import FiltreService from "../../services/FiltreService";
import RechercheScreenTopNavigator from "../../components/Navigators/Recherche/RerchercheScreenTopNavigator";
import { SafeAreaView } from "react-native-safe-area-context";

const RechercheScreen = () => {
  const [utilisateur, setUtilisateur] = useState<UtilisateurEntity>(
    {} as UtilisateurEntity
  );

  const [searchValue, setSearchValue] = useState("");
  const [afficheHeader, setAfficheHeader] = useState(true);

  const [filtres, setFiltres] = useState<FiltreEntity>({} as FiltreEntity);

  useEffect(() => {
    var user_json = storage.getString(AuthentificationEnum.CURRENT_USER) ?? "";
    if (user_json !== "") {
      var user = JSON.parse(user_json) as UtilisateurEntity;
      setUtilisateur(user);
    } else {
      setUtilisateur({} as UtilisateurEntity);
    }

    FiltreService.getFiltres().subscribe((nouveauxFiltres) => {
      setFiltres(nouveauxFiltres);
      startSearch();
    });

    RechercheService.GetAfficheHeader().subscribe((affiche) => {
      setAfficheHeader(affiche);
    });
  }, []);

  const startSearch = () => {
    if (searchValue !== "") {
      const params = {
        query: {
          // TODO: attendre demain que Victor fasse son taf
          ressource: {
            "datePublication[greaterThanEquals]=": filtres.dateDebut,
            "datePublication[lowerThanEquals]=": filtres.dateFin,
            "idCategorie[equals]=": filtres.categorie,
            "partage[equals]=": "PUBLIC",
            "status[equals]=": "APPROVED",
            q: searchValue,
            include: ["utilisateur"],
          },
          utilisateur: {
            q: searchValue,
          },
        },
      };
      RechercheService.Chercher(params).then((listeResultats) => {
        RechercheService.SetListeResRessources(listeResultats.ressources);
        RechercheService.SetListeResUtilisateurs(listeResultats.utilisateurs);
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      startSearch();
    }, 250);
    return () => clearTimeout(timer);
  }, [searchValue]);

  return (
    <>
      <SafeAreaView>
        <StatusBar translucent backgroundColor="transparent" />
        <View style={{ width: "100%" }}>
          <Center
            style={[styles.searchStack, afficheHeader ? null : styles.cache]}
          >
            <Stack direction="row">
              <TextInput
                style={styles.textInput}
                onChangeText={setSearchValue}
                value={searchValue}
                placeholder="Ressource, utilisateur, catégorie..."
                returnKeyType="search"
              />
              <TouchableOpacity>
                <Ionicons
                  name="search-outline"
                  size={25}
                  style={[styles.searchIcon]}
                />
              </TouchableOpacity>

              <Filtre></Filtre>
            </Stack>
          </Center>
        </View>
      </SafeAreaView>
      <RechercheScreenTopNavigator></RechercheScreenTopNavigator>
    </>
  );
};

export default RechercheScreen;

const styles = StyleSheet.create({
  searchStack: {
    backgroundColor: "white",
    height: 50,
    width: "100%",
  },
  textInput: {
    height: 40,
    fontSize: 15,
    paddingLeft: 10,
    marginRight: 10,
    borderRadius: 15,
    width: "75%",
    borderColor: "gray",
    borderWidth: 1,
  },
  searchIcon: {
    color: "black",
    marginTop: 5,
    marginRight: 10,
  },
  cache: {
    display: "none",
  },
});
