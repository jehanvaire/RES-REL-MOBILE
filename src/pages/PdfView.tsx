import React, { useLayoutEffect } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import Pdf from 'react-native-pdf';

interface PdfViewProps {
    idPieceJointe: string;
    nomFichier : string;
}

const PdfView = (props: any) => {
    const {
        idPieceJointe,
        nomFichier,
    }  = props.route.params;

    useLayoutEffect(() => {
        props.navigation.setOptions({
          title: nomFichier ? nomFichier : 'PDF',
        });
      }, [props.navigation]);
    
    return <PDF idPieceJointe={idPieceJointe} nomFichier={nomFichier} />;
};


class PDF extends React.Component<PdfViewProps> {
    render() {
        const source = {
            uri: 'https://api.victor-gombert.fr/api/v1/piecesJointes/' + this.props.idPieceJointe + '/download',
            cache: true
        };

        return (
            <View style={styles.container}>
                <Pdf
                    trustAllCerts={false}
                    source={source}
                    onError={(error) => {
                        console.log(error);
                    }}
                    style={styles.pdf} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});

export default PdfView;
