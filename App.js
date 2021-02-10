import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';
import { AppLoading } from "expo";
import { Text } from 'react-native';
import { useFonts } from "@use-expo/font";
import HomeScreen from './src/screens/HomeScreen';
import SightingScreen from './src/screens/SightingScreen';
import { Provider } from './src/context/WhaleSightingsContext';

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Sighting: {
      screen: SightingScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: () => (
          <HeaderBackButton
            style={{ color: "white" }}
            onPress={_ => navigation.navigate("Home")}
          />)
      }),
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: <>W H A L E <Text style={{ color: "white" }}>S I G H T I N G S</Text></>,
      headerTintColor: '#9ed0ee',
      headerStyle: {
        backgroundColor: '#000',
      },
      headerTitleStyle: {
        fontSize: 18,
        fontFamily: 'Roboto'
      },
    },
  }
);

const RootApp = createAppContainer(navigator);
const customFonts = {
  Roboto: require("./assets/fonts/Roboto/Roboto-Light.ttf"),
};

const App = () => {
  const [isLoaded] = useFonts(customFonts);

  if (!isLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider>
      <RootApp />
    </Provider>
  );

}


export default App;