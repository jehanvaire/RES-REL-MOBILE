import { Menu, Modal } from "native-base";
import CommentaireEntity from "../../ressources/models/CommentaireEntity";
import { useEffect, useState } from "react";
import CommentaireService from "../../services/CommentaireService";

const ModalOptionsComponent = () => {
  const [afficheMenu, setAfficheMenu] = useState<boolean>(false);
  const [itemSelectionne, setItemSelectionne] = useState<CommentaireEntity>(
    {} as CommentaireEntity
  );

  useEffect(() => {
    CommentaireService.getAfficherModalMenu().subscribe((affiche) => {
      setAfficheMenu(affiche);
    });

    CommentaireService.getItemSelectionne().subscribe((item) => {
      setItemSelectionne(item);
    });
  }, []);

  const supprimerCommentaire = (commentaireASupprimer: CommentaireEntity) => {
    if (commentaireASupprimer.estReponse) {
      CommentaireService.SupprimerReponseCommentaire(
        commentaireASupprimer.id
      ).then(() => {
        CommentaireService.setAfficherModalMenu(false);
        CommentaireService.setCommentaireASupprimer(commentaireASupprimer);
      });
    } else {
      CommentaireService.SupprimerCommentaire(commentaireASupprimer.id).then(
        () => {
          CommentaireService.setAfficherModalMenu(false);
          CommentaireService.setCommentaireASupprimer(commentaireASupprimer);
        }
      );
    }
  };

  return (
    <Modal
      isOpen={afficheMenu}
      onClose={() => CommentaireService.setAfficherModalMenu(false)}
    >
      <Modal.Content maxWidth="400px">
        <Modal.Body>
          <Menu.Item
            style={{ zIndex: 2 }}
            onPress={() => {
              CommentaireService.setReponseACommentaire(itemSelectionne);
              CommentaireService.setAfficherModalMenu(false);
            }}
          >
            Répondre
          </Menu.Item>
          <Menu.Item
            style={{ zIndex: 2 }}
            onPress={() => {
              CommentaireService.setAfficherModalMenu(false);
              supprimerCommentaire(itemSelectionne);
            }}
          >
            Supprimer
          </Menu.Item>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default ModalOptionsComponent;
