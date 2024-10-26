import React from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      {/* Name Field */}
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} />

      {/* Age and Birth Date Fields */}
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Birth Date</Text>
          <TextInput style={styles.input} />
        </View>
      </View>

      {/* Contact Email Field */}
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} keyboardType="email-address" />

      {/* Contact Phone Fields */}
      <Text style={styles.label}>Phone</Text>
      <TextInput style={styles.input} keyboardType="phone-pad" />

      {/* Language Field */}
      <Text style={styles.label}>Lenguage</Text>
      <TextInput style={styles.input} />

      {/* Save and Cancel Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
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
  cancelButtonText: {
    color: "#666",
  },
});
