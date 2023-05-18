import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { UtilisateurEntity } from "../../ressources/models/UtilisateurEntity";
import { AuthentificationEnum } from "../../ressources/enums/AuthentificationEnum";
import { storage } from "../../services/AuthentificationService";

const NotificationsRelationsScreen = () => {
  const [utilisateur, setUtilisateur] = useState<UtilisateurEntity>(
    {} as UtilisateurEntity
  );

  useEffect(() => {
    var user_json = storage.getString(AuthentificationEnum.CURRENT_USER) ?? "";

    var user = JSON.parse(user_json) as UtilisateurEntity;
    setUtilisateur(user);
  }, []);

  return (
    <View>
      <Text>NotificationsRelationsScreen</Text>
    </View>
  );
};

export default NotificationsRelationsScreen;
