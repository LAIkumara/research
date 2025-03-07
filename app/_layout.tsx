import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { View, ActivityIndicator } from "react-native";
import Home from './index';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return (
      
      <Home />
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
