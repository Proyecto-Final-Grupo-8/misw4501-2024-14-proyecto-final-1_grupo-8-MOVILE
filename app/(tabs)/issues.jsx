import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PieChart, BarChart } from "react-native-chart-kit";
import { graphqlQuery } from "../../services/ApiProvider";
import { useTranslation } from "react-i18next"; // For the "+" icon button

const screenWidth = Dimensions.get("window").width;

const Issues = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [incidents, setIncidents] = useState([]);
  const [summary, setSummary] = useState(null);

  const fetchIncidents = async () => {
    const username = await AsyncStorage.getItem('username');
    try {
      const incidents = await graphqlQuery("incidents", { customerUsername: username }, [
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
  
    const openIssues = incidents.filter((issue) => issue.status === "Open").length;
    const closedIssues = incidents.filter((issue) => issue.status === "Closed").length;
  
    const issuesByDate = incidents.reduce((acc, issue) => {
      const date = issue.createdDate.split(" ")[0];
      if (!acc[date]) acc[date] = 0;
      acc[date]++;
      return acc;
    }, {});
  
    const sortedIssuesByDate = Object.entries(issuesByDate)
      .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
      .reduce((acc, [date, count]) => {
        const formattedDate = new Intl.DateTimeFormat("en-US", {
          day: "2-digit",
          month: "short",
        }).format(new Date(date));
        acc[formattedDate] = count;
        return acc;
      }, {});
  
    const mostRecentCreated = incidents.reduce((latest, issue) => {
      return new Date(issue.createdDate) > new Date(latest.createdDate) ? issue : latest;
    }, incidents[0]);
  
    const mostRecentModified = incidents.reduce((latest, issue) => {
      return new Date(issue.modifiedDate) > new Date(latest.modifiedDate) ? issue : latest;
    }, incidents[0]);
  
    setSummary({
      totalIssues,
      openIssues,
      closedIssues,
      issuesByDate: sortedIssuesByDate,
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
      color: "#ed7e39",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Closed",
      population: summary.closedIssues,
      color: "#321FDB",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
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
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

      <Text style={styles.chartTitle}>{t("Open vs Closed Cases")}</Text>
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
      />

      <Text style={styles.chartTitle}>Issues Grouped by Date</Text>
      <BarChart
        data={barChartData}
        width={screenWidth -  40}
        height={200}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: (opacity = 0.5) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 0.5) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
            paddingLeft: -20,
            paddingLeft: -0,
            marginLeft: -20,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
          paddingLeft: -80,
        }}
      />

      <Text style={styles.subtitle}>{t("Most Recent Created Issue:")}</Text>
      <Text style={styles.info}>
        ID: {summary.mostRecentCreated.id} - {t("Description:")}{" "}
        {summary.mostRecentCreated.description}
      </Text>
      <Text style={styles.subtitle}>{t("Most Recent Modified Issue:")}</Text>
      <Text style={styles.info}>
        ID: {summary.mostRecentModified.id} - {t("Description:")}{" "}
        {summary.mostRecentModified.description}
      </Text>
    </ScrollView>
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
