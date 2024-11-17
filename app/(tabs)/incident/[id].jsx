import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Modal,
  TextInput,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { getIncident, addLogToIncident } from "../../../services/ApiProvider";

export default function IncidentDetail() {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [incident, setIncident] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (id) {
      loadIncidentDetails(id);
    }
  }, [id]);

  const loadIncidentDetails = async (incidentId) => {
    try {
      const data = await getIncident(incidentId);
      setIncident({ ...data, log: "" });
    } catch (error) {
      console.error("Error fetching incident details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadIncidentDetails(id);
    setRefreshing(false);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleInputChange = (field, value) => {
    setIncident((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleCreateLog = async () => {
    try {
      const response = await addLogToIncident(incident.id, incident.log);
      loadIncidentDetails(incident.id);
      toggleModal();
    } catch (error) {
      console.error("Error Add incident:", error);
    }
  };

  if (loading && !refreshing) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        onScroll={({ nativeEvent }) => {
          const paddingToBottom = 20;
          if (
            nativeEvent.layoutMeasurement.height +
              nativeEvent.contentOffset.y >=
            nativeEvent.contentSize.height - paddingToBottom
          ) {
            handleRefresh();
          }
        }}
        scrollEventThrottle={400}
      >
        <View style={styles.titleContainer}>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  incident.status === "Open" ? "#0000ff" : "#4CAF50",
              },
            ]}
          >
            <Text style={styles.statusText}>{incident.status}</Text>
          </View>
          <Text style={styles.title}> {incident.id}</Text>
        </View>

        {incident ? (
          <>
            <Text style={styles.label}>Incident Date:</Text>
            <Text style={styles.value}>
              {new Date(incident.created_date).toLocaleDateString()}
            </Text>

            <Text style={styles.label}>Description:</Text>
            <Text style={styles.value}>{incident.description}</Text>

            <Text style={styles.label}>Logs:</Text>
            <View style={styles.chatContainer}>
              {/* Render logs in descending order */}
              {incident.logs
                .sort(
                  (a, b) => new Date(b.created_date) - new Date(a.created_date)
                )
                .map((log) => (
                  <View
                    key={log.id}
                    style={[
                      styles.chatBubble,
                      log.user_role != "customer"
                        ? styles.adminBubble
                        : styles.customerBubble,
                    ]}
                  >
                    <Text style={styles.chatUser}>
                      {log.user_name} (
                      {log.user_role == "customer" ? "you" : log.user_role})
                    </Text>
                    <Text style={styles.chatDetails}>{log.details}</Text>
                    <Text style={styles.chatDate}>
                      {new Date(log.created_date).toLocaleTimeString()}
                    </Text>
                  </View>
                ))}
            </View>
          </>
        ) : (
          <Text style={styles.errorText}>Incident details not found.</Text>
        )}
      </ScrollView>

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
              <Text style={styles.modalTitle}>Respond to the Incident</Text>

              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Description of the issue"
                multiline={true}
                numberOfLines={4}
                onChangeText={(text) => handleInputChange("log", text)}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleCreateLog}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statusText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: "#333",
  },
  chatContainer: {
    marginTop: 20,
    paddingVertical: 10,
  },
  chatBubble: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    width: "100%",
    alignSelf: "stretch",
  },
  adminBubble: {
    backgroundColor: "#BBC1FF",
    width: "90%",
    alignSelf: "flex-start",
  },
  customerBubble: {
    backgroundColor: "#E6E8FF",
    width: "90%",
    alignSelf: "flex-end",
  },
  chatUser: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4a4a4a",
  },
  chatDetails: {
    fontSize: 16,
    color: "#333",
    marginTop: 4,
  },
  chatDate: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
    textAlign: "right",
  },
  errorText: {
    fontSize: 16,
    color: "red",
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
});
