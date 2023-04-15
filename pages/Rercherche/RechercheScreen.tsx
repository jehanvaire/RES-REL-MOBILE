import { Center, Stack } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { View } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { UtilisateurEntity } from "../../ressources/types/UtilisateurEntity";
import { storage } from "../../services/AuthentificationService";
import { AuthentificationEnum } from "../../ressources/enums/AuthentificationEnum";
import SearchService from "../../services/SearchService";
import PublicationService from "../../services/PublicationService";
import { BehaviorSubject } from "rxjs";
import Filtre from "../../components/Filtre";
import FiltreService from "../../services/FiltreService";
import RechercheScreenTopNavigator from "../../components/Navigators/Recherche/RerchercheScreenTopNavigator";

const RechercheScreen = () => {
  const [utilisateur, setUtilisateur] = useState<UtilisateurEntity>(
    {} as UtilisateurEntity
  );
  const [searchValue, setSeachValue] = React.useState("");

  const filtres = new BehaviorSubject<FiltreEntity>({} as FiltreEntity);

  useEffect(() => {
    var user_json = storage.getString(AuthentificationEnum.CURRENT_USER) ?? "";

    var user = JSON.parse(user_json) as UtilisateurEntity;
    setUtilisateur(user);
    FiltreService.getFiltres().subscribe((nouveauxFiltres) => {
      filtres.next(nouveauxFiltres);
      setSeachValue("");
      startSearch();
    });
  }, []);

  const startSearch = () => {
    if (searchValue !== "") {
      const params: FiltresRequete = {
        "datePublication[greaterThanEquals]=": filtres.value.dateDebut,
        "datePublication[lowerThanEquals]=": filtres.value.dateFin,
        "partage[equals]=": "PUBLIC",
        "status[equals]=": "APPROVED",
        ressourceQuery: searchValue,
        utilisateurQuery: searchValue,
        include: "utilisateur",
      };
      SearchService.Search(params).then((listeResultats) => {
        SearchService.SetListeResultats(listeResultats);
      });
    } else {
      const filtresRequete: FiltresRequete = {
        "datePublication[greaterThanEquals]=": filtres.value.dateDebut,
        "datePublication[lowerThanEquals]=": filtres.value.dateFin,
        "partage[equals]=": "PUBLIC",
        "status[equals]=": "APPROVED",
        include: "utilisateur",
      };
      if (filtres.value.categorie === 0) {
        filtresRequete["idCategorie[equals]="] = filtres.value.categorie;
      }

      PublicationService.GetPublications(filtresRequete).then(
        (listeResultats) => {
          SearchService.SetListeResultats(listeResultats);
        }
      );
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
      <View style={{ marginTop: 50, width: "100%" }}>
        <Center style={styles.searchStack}>
          <Stack direction="row">
            <TextInput
              style={styles.textInput}
              onChangeText={setSeachValue}
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
});
