import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { getIncident } from "../../../services/ApiProvider";

export default function IncidentDetail() {
  const { id } = useLocalSearchParams();
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadIncidentDetails(id);
    }
  }, [id]);

  const loadIncidentDetails = async (incidentId) => {
    try {
      console.log("incidentId", incidentId);
      const data = await getIncident(incidentId);
      setIncident(data);
    } catch (error) {
      console.error("Error fetching incident details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Incident Details</Text>
      {incident ? (
        <>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>
            {new Date(incident.created_date).toLocaleDateString()}
          </Text>

          <Text style={styles.label}>Description:</Text>
          <Text style={styles.value}>{incident.description}</Text>

          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{incident.status}</Text>

          <Text style={styles.label}>Source:</Text>
          <Text style={styles.value}>{incident.source}</Text>
        </>
      ) : (
        <Text style={styles.errorText}>Incident details not found.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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
  errorText: {
    fontSize: 16,
    color: "red",
  },
});
