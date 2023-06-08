
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
      primary: "#fff",
      background: "#fff",
      card: "#fff",
      text: "#000",
      border: "#fff",
      notification: "#fff",
    },
  };
};
export { lightTheme, darkTheme, mapNativeBaseToReactNavigationTheme };