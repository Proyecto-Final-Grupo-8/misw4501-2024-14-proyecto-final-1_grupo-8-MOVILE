import { StatusBar } from "expo-status-bar";
import { Text, StyleSheet, View } from "react-native";
import { Link } from "expo-router";
import SignIn from "./(auth)/sign-in";

export default function App() {
  return (
    <View style={styles.container}>
      <SignIn></SignIn>
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  link:{
    color:"blue"
  }
});
