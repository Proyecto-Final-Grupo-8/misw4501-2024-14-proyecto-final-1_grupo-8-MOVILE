import { StatusBar } from "expo-status-bar";
import { Text, StyleSheet, View } from "react-native";
import { Link } from "expo-router";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>ABCall movile</Text>
      <Link href="/about" style={styles.link}> Go to Profile</Link>
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
