import React, { useEffect, useState } from "react";
import { WebView } from 'react-native-webview';
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { storage } from "../../services/AuthentificationService";
import { AuthentificationEnum } from "../../ressources/enums/AuthentificationEnum";


const StatistiquesScreen = () => {

  const [bearer, setBearer] = useState("");
  const statsUrl = 'https://api.victor-gombert.fr/stats';
  //const statsUrl = 'http://10.0.2.2:8000/stats';
  const injectedJS = `
  fetch('` + statsUrl + `', {
    headers: {
      'Authorization': '105|paqmg4KDZvIv3ixPHA0aCQHLJNyWjh8PgMbj6XK6',
    },
  })
  .then(response => response.text())
  .then(html => document.body.innerHTML = html)
  .catch(error => console.error(error));

  true;
 `;

    useEffect(() => {
      setBearer(storage.getString(AuthentificationEnum.ACCESS_TOKEN_KEY) ?? "");
    }, []);

  return (
    <WebView
      source={{ 
        uri: statsUrl,
        headers: {
            Authorization: "Bearer paqmg4KDZvIv3ixPHA0aCQHLJNyWjh8PgMbj6XK6",
        },
      }}
      style={{ flex: 1 }}
      pullToRefreshEnabled={true}
      //injectedJavaScript={injectedJS}
      startInLoadingState={true}
    />
  );

};

export default StatistiquesScreen;
