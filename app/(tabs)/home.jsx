import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchIncidents, addIncident } from "../../services/ApiProvider";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../components/LanguageSwitcher';

const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function Home() {
  const { t, i18n } = useTranslation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [incidents, setIncidents] = useState([]);
  const [newIncident, setNewIncident] = useState({
    name: "",
    description: "",
    comments: "",
  });

  const router = useRouter();

  console.log("Current Language:", i18n.language);

  useFocusEffect(
    useCallback(() => {
      loadIncidents();
    }, [])
  );

  const loadIncidents = async () => {
    try {
      const data = await fetchIncidents();
      setIncidents(data);
    } catch (error) {
      console.error("Error fetching incidents:", error);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleInputChange = (field, value) => {
    setNewIncident((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleCreateIncident = async () => {
    try {
      const response = await addIncident(
        (description = newIncident.description)
      );
      loadIncidents();
      toggleModal();
      setNewIncident({ name: "", description: "", comments: "" });
    } catch (error) {
      console.error("Error Add incident:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.graphSection}>
          <View style={styles.graphPlaceholder}></View>
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>{t('Created Date')}</Text>
              <Text style={styles.tableHeader}>{t('Description')}</Text>
              <Text style={styles.tableHeader}>{t('Status')}</Text>
            </View>

            {incidents
              .slice()
              .sort((a, b) => {
                return new Date(b.created_date) - new Date(a.created_date);
              })
              .map((incident, index) => (
                <TouchableOpacity
                  key={incident.id}
                  style={styles.tableRow}
                  onPress={() => router.push(`/incident/${incident.id}`)}
                >
                  <Text style={styles.tableData}>
                    {new Date(incident.created_date).toLocaleDateString()}
                  </Text>
                  <Text style={styles.tableData}>{incident.description}</Text>
                  <Text style={styles.tableData}>{incident.status}</Text>
                </TouchableOpacity>
              ))}
          </View>
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
                <Text style={styles.modalTitle}>{t('New Issue')}</Text>

                <Text style={styles.label}>{t('Name')}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Issue 1"
                  value={newIncident.name}
                  onChangeText={(text) => handleInputChange("name", text)}
                />

                <Text style={styles.label}>{t('Description')}</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder={t('Description of the issue')}
                  multiline={true}
                  numberOfLines={4}
                  value={newIncident.description}
                  onChangeText={(text) =>
                    handleInputChange("description", text)
                  }
                />

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleCreateIncident}
                  >
                    <Text style={styles.buttonText}>{t('Save')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={toggleModal}
                  >
                    <Text style={[styles.buttonText, styles.cancelButtonText]}>
                    {t('Cancel')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
        <LanguageSwitcher />
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
  tableHeader: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 5,
  },
  tableData: {
    flex: 1,
    textAlign: "center",
    paddingHorizontal: 5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  cancelButtonText: {
    color: "#666",
  },
});
