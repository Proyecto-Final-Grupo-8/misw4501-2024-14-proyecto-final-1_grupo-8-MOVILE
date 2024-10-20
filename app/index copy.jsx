import { Text, StyleSheet, View, Image, ScrollView } from "react-native";
import { Link } from "expo-router";
import SignIn from "./(auth)/sign-in";
import { SafeAreaView } from "react-native-safe-area-context" 
import icons from "../constants/icons";

export default function App() {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ height: 100 }}>
        <View style={styles.view}>
          <Image
            source={icons.abclogo_name}
            style={styles.image}
          />
          <Text style={styles.h1}>My Issues</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view:{
    backgroundColor:"cyan",
    width: "100%",
    height: "100%",
    justifyContent:"center",
    paddingVertical:15,
    paddingHorizontal:20,
  },
  h1: {
    fontSize: 24,       
    fontWeight: "arial", 
    textAlign: "left",
    marginVertical: 10,
  },
  image: {
    resizeMode: "contain",
  }
});
