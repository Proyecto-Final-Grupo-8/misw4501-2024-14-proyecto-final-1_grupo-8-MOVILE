import { Text, StyleSheet, View, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; 
import CustomButton from "../components/CustomButton";
import { router } from "expo-router";
import icons from "../constants/icons";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.view}>
          <Image
            source={icons.logo}
            style={styles.image}
          />
          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles={styles.button}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, 
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: "white",
  },
  view: {
    backgroundColor: "white",
    width: "100%", 
    justifyContent: "center",
    alignItems: "center", 
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  h1: {
    fontSize: 24,       
    fontWeight: "arial", 
    textAlign: "left",
    marginVertical: 10,
  },
  image: {
    resizeMode: "contain",
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  button: {
    width: '70%', 
    marginTop: 28, 
  },
});
