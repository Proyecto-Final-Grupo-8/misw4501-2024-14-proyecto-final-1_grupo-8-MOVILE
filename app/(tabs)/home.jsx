import React, { useState, useRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
  Modal,
  Dimensions,
  PanResponder,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function Home() {
  const [isOffCanvasVisible, setOffCanvasVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-300)).current; // Initial value for off-canvas animation

  // PanResponder to detect swipe gestures
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => {
      // Detect horizontal drag when off-canvas is open
      return isOffCanvasVisible && Math.abs(gestureState.dx) > 20;
    },
    onPanResponderMove: (_, gestureState) => {
      // If swiping to the left, allow dragging
      if (gestureState.dx < 0) {
        slideAnim.setValue(gestureState.dx);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      // If swipe exceeds a threshold, close the off-canvas
      if (gestureState.dx < -100) {
        closeOffCanvas();
      } else {
        // Reset to original position if swipe was not strong enough
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const toggleOffCanvas = () => {
    if (isOffCanvasVisible) {
      closeOffCanvas();
    } else {
      openOffCanvas();
    }
  };

  const openOffCanvas = () => {
    setOffCanvasVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeOffCanvas = () => {
    Animated.timing(slideAnim, {
      toValue: -300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setOffCanvasVisible(false));
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const navigateToPage = (route) => {
    navigation.navigate(route);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Scrollable Content */}
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {/* Header Section */}
          {/* <View style={styles.viewHeader}>
            <TouchableOpacity onPress={toggleOffCanvas}>
              <Image source={icons.vertical_lines} style={styles.menuIcon} />
            </TouchableOpacity>
            <Image source={icons.abclogo_name} style={styles.logo} />
          </View> */}

          {/* Off-Canvas Menu */}
          {isOffCanvasVisible && (
            <Animated.View
              {...panResponder.panHandlers}
              style={[
                styles.offCanvas,
                { transform: [{ translateX: slideAnim }] },
              ]}
            >
              <View style={styles.offCanvasContent}>
                <Text
                  style={styles.menuItem}
                  onPress={() => navigateToPage("/profile")}
                >
                  My Profile
                </Text>
                <Text
                  style={styles.menuItem}
                  onPress={() => navigateToPage("/issues")}
                >
                  My Issues
                </Text>
                <Text
                  style={styles.menuItem}
                  onPress={() => navigateToPage("/chat")}
                >
                  My Chat
                </Text>
                <TouchableOpacity onPress={toggleOffCanvas}>
                  <Text style={styles.exitButton}>Exit</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          )}

          {/* Graph Section */}
          <View style={styles.graphSection}>
            <View style={styles.graphPlaceholder}>
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

        {/* Floating Action Button */}
        <TouchableOpacity style={styles.fab} onPress={toggleModal}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>

        {/* Modal */}
        <Modal
          transparent={true}
          visible={isModalVisible}
          animationType="slide"
          onRequestClose={toggleModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ScrollView>
                <Text style={styles.modalTitle}>Issue's Details</Text>

                <Text style={styles.label}>Issue's Name</Text>
                <TextInput style={styles.input} placeholder="Issue 1" />

                <Text style={styles.label}>Issue's Description</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Description of the issue"
                  multiline={true}
                  numberOfLines={4}
                />

                <Text style={styles.label}>Comments</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Add comments here"
                  multiline={true}
                  numberOfLines={4}
                />

                {/* Save and Cancel Buttons */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.saveButton} onPress={toggleModal}>
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.cancelButton} onPress={toggleModal}>
                    <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
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
    height: SCREEN_HEIGHT,
    backgroundColor: "#e0e6ef",
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
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: "#f0f0f0",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  fabText: {
    fontSize: 24,
    color: "#000",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#cccccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});
