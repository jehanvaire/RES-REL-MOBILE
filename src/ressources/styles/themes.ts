
import { extendTheme, Theme as NativeBaseTheme } from "native-base";
import { Theme as ReactNavigationTheme } from '@react-navigation/native';


const lightTheme: NativeBaseTheme = extendTheme({
    // background: {
    //     backgroundColor: '#fff',
    // },
    // text: {
    //     color: '#000',
    // },
    config: {
        initialColorMode: 'light',
    },
});

const darkTheme: NativeBaseTheme = extendTheme({
    // background: {
    //     backgroundColor: '#000',
    // },
    // text: {
    //     color: '#fff',
    // },
    config: {
        initialColorMode: 'dark',
      },
});

const mapNativeBaseToReactNavigationTheme = (
    nativeBaseTheme: NativeBaseTheme
  ): ReactNavigationTheme => {
    return {
      dark: nativeBaseTheme.config.initialColorMode === 'dark',
      colors: {
        primary: nativeBaseTheme.colors.primary[500],
        background: nativeBaseTheme.colors.primary[500],
        card: nativeBaseTheme.colors.primary[500],
        text: nativeBaseTheme.colors.text[500],
        border: nativeBaseTheme.colors.primary[500],
        notification: nativeBaseTheme.colors.error[400],
      },
    };
  };
export { lightTheme, darkTheme, mapNativeBaseToReactNavigationTheme };