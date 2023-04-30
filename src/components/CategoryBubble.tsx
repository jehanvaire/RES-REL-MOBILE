import React, { useContext } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import CategoryContext from '../contexts/CategoryContext';

interface CategoryBubbleProps {
    categoryId: number;
    categoryName: string;
    style?: ViewStyle;
}

const CategoryBubble: React.FC<CategoryBubbleProps> = ({ categoryId, categoryName, style }) => {
    const { categories, categoryColors } = useContext(CategoryContext);

    const category = categories.find((categorie) => categorie.id_categorie === categoryId);

    const backgroundColor = category ? categoryColors[category.id_categorie] : "#F2F2F2";


    return (
        <View style={[styles.categorieWrapper, style]}>
            <View style={[styles.categorie, { backgroundColor }]}>
                <Text style={styles.categorieText}>{categoryName}</Text>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    categorie: {
      backgroundColor: "#F2F2F2",
      borderRadius: 10,
      paddingHorizontal: 10,
    },
    categorieWrapper: {
      borderRadius: 10,
      paddingHorizontal: 1,
      alignSelf: "flex-start",
    },
    categorieText: {
      // Add your desired style properties for the category text, for example:
      fontSize: 14,
      //fontWeight: "bold",
    },
  });

export default CategoryBubble;
