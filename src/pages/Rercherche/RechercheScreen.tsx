import { Center, Stack } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { View } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { UtilisateurEntity } from "../../ressources/models/UtilisateurEntity";
import { storage } from "../../services/AuthentificationService";
import { AuthentificationEnum } from "../../ressources/enums/AuthentificationEnum";
import RechercheService from "../../services/RechercheService";
import PublicationService from "../../services/PublicationService";
import { BehaviorSubject } from "rxjs";
import Filtre from "../../components/Filtre";
import FiltreService from "../../services/FiltreService";
import RechercheScreenTopNavigator from "../../components/Navigators/Recherche/RerchercheScreenTopNavigator";

const RechercheScreen = () => {
  const [utilisateur, setUtilisateur] = useState<UtilisateurEntity>(
    {} as UtilisateurEntity
  );

  const [searchValue, setSeachValue] = useState("");
  const [afficheHeader, setAfficheHeader] = useState(true);

  const filtres = new BehaviorSubject<FiltreEntity>({} as FiltreEntity);

  useEffect(() => {
    var user_json = storage.getString(AuthentificationEnum.CURRENT_USER) ?? "";
    if (user_json !== "") {
      var user = JSON.parse(user_json) as UtilisateurEntity;
      setUtilisateur(user);
    } else {
      setUtilisateur({} as UtilisateurEntity);
    }

    FiltreService.getFiltres().subscribe((nouveauxFiltres) => {
      filtres.next(nouveauxFiltres);
      setSeachValue("");
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
          ressource: {
            // "datePublication[greaterThanEquals]=": filtres.value.dateDebut,
            // "datePublication[lowerThanEquals]=": filtres.value.dateFin,
            // "partage[equals]=": "PUBLIC",
            // "status[equals]=": "APPROVED",
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
    } else {
      const filtresRequete: any = {
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
          RechercheService.SetListeResRessources(listeResultats);
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
      <View style={{ marginTop: 38, width: "100%" }}>
        <Center
          style={[styles.searchStack, afficheHeader ? null : styles.cache]}
        >
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
  cache: {
    display: "none",
  },
});
