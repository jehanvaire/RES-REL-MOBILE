import { createContext } from 'react';

const ThemeContext = createContext({
    isDarkMode: false,
    toggleTheme: () => { },
});

export default ThemeContext;
