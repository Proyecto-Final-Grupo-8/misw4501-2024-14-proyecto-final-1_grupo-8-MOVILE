import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  Dimensions,
} from "react-native";
import { PieChart } from "react-native-chart-kit"; // Import PieChart from chart-kit
import { FontAwesome } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;

const Issues = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const data = [
    { id: "1", first: "Mark", last: "Otto", handle: "@mdo" },
    { id: "2", first: "Mark", last: "Otto", handle: "@mdo" },
    { id: "3", first: "Mark", last: "Otto", handle: "@mdo" },
  ];

  const chartData = [
    {
      name: "Open Issues",
      population: 20,
      color: "#FF6347",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Resolved Issues",
      population: 50,
      color: "#32CD32",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Pending Issues",
      population: 30,
      color: "#FFD700",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
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
      <Text style={styles.title}>My Issues</Text>

      {/* Chart Section */}
      <View style={styles.chartSection}>
        <Text style={styles.chartTitle}>Issue Distribution</Text>
        <PieChart
          data={chartData}
          width={screenWidth - 40} // Adjust width to fit screen
          height={220}
          chartConfig={{
            backgroundColor: "#1cc910",
            backgroundGradientFrom: "#eff3ff",
            backgroundGradientTo: "#efefef",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute // Show values inside the pie chart
        />
      </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText, styles.tableCell]}>#</Text>
        <Text style={[styles.tableHeaderText, styles.tableCell]}>First</Text>
        <Text style={[styles.tableHeaderText, styles.tableCell]}>Last</Text>
        <Text style={[styles.tableHeaderText, styles.tableCell]}>Handle</Text>
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
            <Text>Modal Content Here</Text>
            <TouchableOpacity onPress={toggleModal}>
              <Text>Close</Text>
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
  chartSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
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
