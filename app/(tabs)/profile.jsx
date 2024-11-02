import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  ScrollView,
} from "react-native";
import { fetchUser, updateUser } from "../../services/ApiProvider";

const Profile = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState({
    id: "",
    username: "",
    name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await fetchUser();
        setUser({
          id: userData.id,
          username: userData.username,
          name: userData.name,
          last_name: userData.last_name,
          email: userData.email,
          phone: userData.phone,
        });
      } catch (error) {
        console.error(error);
      }
    };

    loadUserData();
  }, []);

  const handleChange = (key, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateUser(user.id, {
        username: user.username,
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
      });
      Alert.alert("Success", "Your profile has been updated.");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", error);
    }
  };

  const handleChangePassword = async () => {
    try {
      await updateUser(user.id, {
        password: user.password,
      });
      setModalVisible(false)
      Alert.alert("Success", "Your Password has been updated.");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", error);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.title}>My Profile</Text>

        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={user.username}
          onChangeText={(text) => handleChange("username", text)}
        />

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={user.name}
          onChangeText={(text) => handleChange("name", text)}
        />

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={user.last_name}
          onChangeText={(text) => handleChange("last_name", text)}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          value={user.email}
          onChangeText={(text) => handleChange("email", text)}
        />

        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          keyboardType="phone-pad"
          value={user.phone}
          onChangeText={(text) => handleChange("phone", text)}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.fab} onPress={toggleModal}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>

        <Modal
          transparent={true}
          visible={isModalVisible}
          animationType="slide"
          onRequestClose={toggleModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ScrollView>
                <Text style={styles.modalTitle}>Change Password</Text>

                <TextInput
                  style={styles.input}
                  value={user.password}
                  onChangeText={(text) => handleChange("pasword", text)}
                />

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleChangePassword}
                  >
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={toggleModal}
                  >
                    <Text style={[styles.buttonText, styles.cancelButtonText]}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4a4a4a",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#4a4a4a",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#f8f8f8",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  column: {
    flex: 1,
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: "#3b3bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: "#cccccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
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
  saveButton: {
    backgroundColor: "#321FDB",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#cccccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    flex: 1,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
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
});
