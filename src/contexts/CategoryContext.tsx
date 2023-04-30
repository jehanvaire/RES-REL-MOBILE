import { createContext, ReactNode, useState, useEffect } from 'react';
//import { Category } from '../types/types';
import axios from 'axios';
import tinycolor from 'tinycolor2';

interface Category {
    id_categorie: number;
    nom_categorie: string;
    color: string;
    name: string;
}

interface CategoryContextValue {
    categories: Category[];
    categoryColors: Record<number, string>;
    setCategories: (categories: Category[]) => void;
}

export const CategoryContext = createContext<CategoryContextValue>({
    categories: [],
    categoryColors: {},
    setCategories: () => { },
});

interface CategoryProviderProps {
    children: ReactNode;
}

export const CategoryProvider: React.FC<CategoryProviderProps> = ({ children }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryColors, setCategoryColors] = useState<Record<number, string>>({});

    const fetchCategories = async () => {
        try {
            const response = await axios.get('https://api.victor-gombert.fr/api/v1/categories'); // Replace with your API URL
            const fetchedCategories = response.data.data;

            // Generate colors for the fetched categories
            const fetchedCategoryColors = generateColorsForCategories(fetchedCategories);

            setCategories(fetchedCategories);
            setCategoryColors(fetchedCategoryColors);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    //   const generateColorsForCategories = (categories: Category[]): Record<number, string> => {
    //     const categoryColors: Record<number, string> = {};

    //     categories.forEach((category) => {
    //       // Generate a random color for each category
    //       const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    //       categoryColors[category.id_categorie] = color;
    //     });

    //     return categoryColors;
    //   };

    const generateColorsForCategories = (categories: Category[]): Record<number, string> => {
        const categoryColors: Record<number, string> = {};
      
        categories.forEach((category) => {
          // Generate a random color for each category
          const color = tinycolor.random().toHexString();
          categoryColors[category.id_categorie] = color;
        });
      
        return categoryColors;
      };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <CategoryContext.Provider
            value={{
                categories,
                categoryColors,
                setCategories,
            }}
        >
            {children}
        </CategoryContext.Provider>
    );
};

export default CategoryContext;

///////////////////////////////////////////////////////////////
// import { createContext, ReactNode, useState } from 'react';
// // import { Category } from '../types/Category';

// interface Category {
//     id_categorie: number;
//     nom_categorie: string;
//     color: string;
//     name: string;
// }

// interface CategoryContextValue {
//   categories: Category[];
//   categoryColors: Record<number, string>;
//   setCategories: (categories: Category[]) => void;
// }

// export const CategoryContext = createContext<CategoryContextValue>({
//   categories: [],
//   categoryColors: {},
//   setCategories: () => {},
// });

// interface CategoryProviderProps {
//   children: ReactNode;
// }

// export const CategoryProvider: React.FC<CategoryProviderProps> = ({ children }) => {
//   const [categories, setCategories] = useState<Category[]>([]);

//   return (
//     <CategoryContext.Provider
//       value={{
//         categories,
//         categoryColors: {}, // You can initialize this with default category colors if needed
//         setCategories,
//       }}
//     >
//       {children}
//     </CategoryContext.Provider>
//   );
// };

// export default CategoryContext;
////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { createContext, useState, useEffect } from 'react';
// import { getRandomColor } from '../utils/colorGenerator';
// import axios from 'axios';

// interface Category {
//     id_categorie: number;
//     nom_categorie: string;
//     color: string;
//     name: string;
// }

// type CategoryContextValue = {
//     categories: Category[];
//     categoryColors: Record<number, string>;
//     setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
// }

// const CategoryContext = createContext<CategoryContextValue>({
//     categories: [],
//     setCategories: () => { },
// });

// export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const [categories, setCategories] = useState<Category[]>([]);
//     const [categoryColors, setCategoryColors] = useState<{ [key: string]: string }>({});
//     const fetchCategories = async () => {
//         try {
//             const response = await axios.get('https://your-api-url/categories'); // Replace with your API URL
//             const fetchedCategories = response.data;

//             // Generate colors for the fetched categories
//             const fetchedCategoryColors = generateColorsForCategories(fetchedCategories);

//             setCategories(fetchedCategories);
//             setCategoryColors(fetchedCategoryColors);
//         } catch (error) {
//             console.error("Error fetching categories:", error);
//         }
//     };

//     const generateColorsForCategories = (categories: Category[]): Record<number, string> => {
//         const categoryColors: Record<number, string> = {};

//         categories.forEach((category) => {
//             // Generate a random color for each category
//             const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
//             categoryColors[category.id_categorie] = color;
//         });

//         return categoryColors;
//     };

//     useEffect(() => {
//         fetchCategories();
//     }, []);

//     return (
//         <CategoryContext.Provider value={{ categories, setCategories }}>
//             {children}
//         </CategoryContext.Provider>
//     );
// };

// export default CategoryContext;
