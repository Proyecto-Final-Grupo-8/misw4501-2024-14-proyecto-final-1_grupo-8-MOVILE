import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from "react-native";
<<<<<<< HEAD
import { FontAwesome } from "@expo/vector-icons";
import { useTranslation } from "react-i18next"; // For the "+" icon button

const Issues = () => {
  const { t } = useTranslation();
  const [isModalVisible, setModalVisible] = useState(false);
  const data = [
    { id: "1", first: "Mark", last: "Otto", handle: "@mdo" },
    { id: "2", first: "Mark", last: "Otto", handle: "@mdo" },
    { id: "3", first: "Mark", last: "Otto", handle: "@mdo" },
=======
import { PieChart, BarChart } from "react-native-chart-kit";
import { graphqlQuery } from "../../services/ApiProvider";

const screenWidth = Dimensions.get("window").width;

const Issues = () => {
  const [loading, setLoading] = useState(true);
  const [incidents, setIncidents] = useState([]);
  const [summary, setSummary] = useState(null);

  const fetchIncidents = async () => {
    try {
      const incidents = await graphqlQuery("incidents", { source: "web" }, [
        "id",
        "description",
        "status",
        "source",
        "modifiedDate",
        "createdDate",
        { customer: ["id", "email", "username"] },
      ]);
      calculateSummary(incidents);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const calculateSummary = (incidents) => {
    const totalIssues = incidents.length;

    const openIssues = incidents.filter((issue) => issue.status === "Open")
      .length;
    const closedIssues = incidents.filter((issue) => issue.status === "Closed")
      .length;

    const issuesByDate = incidents.reduce((acc, issue) => {
      const date = issue.createdDate.split(" ")[0]; // Extract date part
      if (!acc[date]) acc[date] = 0;
      acc[date]++;
      return acc;
    }, {});

    const mostRecentCreated = incidents.reduce((latest, issue) => {
      return new Date(issue.createdDate) > new Date(latest.createdDate)
        ? issue
        : latest;
    }, incidents[0]);

    const mostRecentModified = incidents.reduce((latest, issue) => {
      return new Date(issue.modifiedDate) > new Date(latest.modifiedDate)
        ? issue
        : latest;
    }, incidents[0]);

    setSummary({
      totalIssues,
      openIssues,
      closedIssues,
      issuesByDate,
      mostRecentCreated,
      mostRecentModified,
    });
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!summary) {
    return (
      <View style={styles.centered}>
        <Text style={styles.info}>No data available</Text>
      </View>
    );
  }

  const pieChartData = [
    {
      name: "Open",
      population: summary.openIssues,
      color: "#FF6347",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Closed",
      population: summary.closedIssues,
      color: "#32CD32",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
>>>>>>> master
  ];

  const barChartData = {
    labels: Object.keys(summary.issuesByDate),
    datasets: [
      {
        data: Object.values(summary.issuesByDate),
      },
    ],
  };

  return (
<<<<<<< HEAD
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
=======
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

      <Text style={styles.chartTitle}>Open vs Closed Cases</Text>
      <PieChart
        data={pieChartData}
        width={screenWidth - 30}
        height={220}
        chartConfig={{
          backgroundColor: "#000000",
          backgroundGradientFrom: "#eff3ff",
          backgroundGradientTo: "#efefef",
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
>>>>>>> master
      />

      <Text style={styles.chartTitle}>Issues Grouped by Date</Text>
      <BarChart
        data={barChartData}
        width={screenWidth - 40}
        height={250}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: "white",
          backgroundGradientFrom: "#eff3ff",
          backgroundGradientTo: "#efefef",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
      />

<<<<<<< HEAD
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
=======
      <Text style={styles.subtitle}>Most Recent Created Issue:</Text>
      <Text style={styles.info}>
        ID: {summary.mostRecentCreated.id} - Description:{" "}
        {summary.mostRecentCreated.description}
      </Text>
      <Text style={styles.subtitle}>Most Recent Modified Issue:</Text>
      <Text style={styles.info}>
        ID: {summary.mostRecentModified.id} - Description:{" "}
        {summary.mostRecentModified.description}
      </Text>
    </ScrollView>
>>>>>>> master
  );
};

export default Issues;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  info: {
    fontSize: 16,
    marginVertical: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 15,
    textAlign: "center",
  },
});
