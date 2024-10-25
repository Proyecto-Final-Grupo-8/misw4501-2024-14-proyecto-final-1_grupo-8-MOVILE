import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "../../constants/icons";

export default function Home() {
  const [isOffCanvasVisible, setOffCanvasVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(-300))[0]; // Use initial value for the slide animation

  const toggleOffCanvas = () => {
    if (isOffCanvasVisible) {
      // Slide out
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setOffCanvasVisible(false));
    } else {
      setOffCanvasVisible(true);
      // Slide in
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const closeOffCanvas = () => {
    // Slide out and close the off-canvas
    Animated.timing(slideAnim, {
      toValue: -300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setOffCanvasVisible(false));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {/* Header Section */}
          <View style={styles.viewHeader}>
            <TouchableOpacity onPress={toggleOffCanvas}>
              <Image source={icons.vertical_lines} style={styles.menuIcon} />
            </TouchableOpacity>
            <Image source={icons.abclogo_name} style={styles.logo} />
          </View>

          {/* Off-Canvas Menu */}
          <Animated.View
            style={[
              styles.offCanvas,
              { transform: [{ translateX: slideAnim }] },
            ]}
          >
            <View style={styles.offCanvasContent}>
              <Text style={styles.menuItem} onPress={closeOffCanvas}>
                My Profile
              </Text>
              <Text style={styles.menuItem} onPress={closeOffCanvas}>
                My Issues
              </Text>
              <Text style={styles.menuItem} onPress={closeOffCanvas}>
                My Chat
              </Text>
              <TouchableOpacity onPress={closeOffCanvas}>
                <Text style={styles.exitButton}>Exit</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Graph Section */}
          <View style={styles.graphSection}>
            <View style={styles.graphPlaceholder}>
              <Text>Graph Placeholder</Text>
            </View>
          </View>

          {/* Issues Section */}
          <Text style={styles.h1}>My Issues</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>#</Text>
              <Text style={styles.tableHeader}>First</Text>
              <Text style={styles.tableHeader}>Last</Text>
              <Text style={styles.tableHeader}>Handle</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableData}>1</Text>
              <Text style={styles.tableData}>Mark</Text>
              <Text style={styles.tableData}>Otto</Text>
              <Text style={styles.tableData}>@mdo</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
  },
  scrollViewContent: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  viewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  menuIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
    resizeMode: "contain",
  },
  logo: {
    width: 120,
    height: 30,
    resizeMode: "contain",
  },
  offCanvas: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 250,
    height: "100%",
    backgroundColor: "#e0e6ef", // Light background color
    zIndex: 999,
    paddingTop: 40,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  offCanvasContent: {
    flex: 1,
    justifyContent: "flex-start",
  },
  menuItem: {
    fontSize: 18,
    marginVertical: 15,
    color: "#3a3a3a",
    fontWeight: "600",
  },
  exitButton: {
    fontSize: 18,
    color: "#1d3557",
    fontWeight: "bold",
    marginTop: 30,
  },
  graphSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  graphPlaceholder: {
    width: 150,
    height: 150,
    backgroundColor: "#f0f0f0",
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
  },
  h1: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    marginVertical: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableHeader: {
    fontWeight: "bold",
  },
  tableData: {
    fontSize: 14,
  },
});
