import React, { useState, useEffect } from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";

import * as Font from "expo-font";
import { AppLoading } from "expo";

import MapScreen from "./src/Components/MapScreen";
import ProfileScreen from "./src/Components/ProfileScreen";
import FeedScreen from "./src/Components/FeedScreen";

const BottomNav = createBottomTabNavigator(
  {
    Map: MapScreen,
    Feed: FeedScreen,
    Camera: MapScreen,
    Profile: ProfileScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Icon;
        let iconName;

        switch (routeName) {
          case "Map":
            iconName = "map";
            break;
          case "Profile":
            iconName = "ghost";
            break;
          case "Camera":
            iconName = "camera-retro";
            break;
          case "Feed":
            iconName = "broadcast-tower";
            break;
          default:
            return;
        }

        return <IconComponent name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "#39c2c9",
      inactiveTintColor: "#363a43"
    }
  }
);

const Main = createAppContainer(BottomNav);

const App = () => {
  const [fontLoaded, setLoaded] = useState(false);

  useEffect(() => {
    loadFonts();
  }, []);

  const loadFonts = async () => {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    setLoaded(true);
  };
  return !fontLoaded ? <AppLoading /> : <Main />;
};

export default App;