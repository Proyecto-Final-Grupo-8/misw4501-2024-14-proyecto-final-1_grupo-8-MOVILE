import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useTranslation } from "react-i18next"; // For the "+" icon button

const Issues = () => {
  const { t } = useTranslation();
  const [isModalVisible, setModalVisible] = useState(false);
  const data = [
    { id: "1", first: "Mark", last: "Otto", handle: "@mdo" },
    { id: "2", first: "Mark", last: "Otto", handle: "@mdo" },
    { id: "3", first: "Mark", last: "Otto", handle: "@mdo" },
  ];

  const renderRow = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.id}</Text>
      <Text style={styles.tableCell}>{item.first}</Text>
      <Text style={styles.tableCell}>{item.last}</Text>
      <Text style={styles.tableCell}>{item.handle}</Text>
    </View>
  );

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("My Issues")}</Text>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText, styles.tableCell]}>#</Text>
        <Text style={[styles.tableHeaderText, styles.tableCell]}>{t("First")}</Text>
        <Text style={[styles.tableHeaderText, styles.tableCell]}>{t("Last")}</Text>
        <Text style={[styles.tableHeaderText, styles.tableCell]}>{t("Handle")}</Text>
      </View>

      {/* Table Rows */}
      <FlatList
        data={data}
        renderItem={renderRow}
        keyExtractor={(item) => item.id}
        style={styles.table}
      />

      {/* Add New Issue Button */}
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
            <Text>{t("Modal Content Here")}</Text>
            <TouchableOpacity onPress={toggleModal}>
              <Text>{t("Close")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Issues;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#4a4a4a",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 8,
    marginBottom: 8,
  },
  tableHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4a4a4a",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
    color: "#4a4a4a",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#e0e6ef",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  table: {
    marginBottom: 60, // Space for the floating "+" button
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
});
