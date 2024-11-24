import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Modal,
  Alert,
} from "react-native";
import { addChat, addIncident } from "../../services/ApiProvider";
import { useTranslation } from "react-i18next";

export default function Chat() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [context, setContext] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [incidentDetails, setIncidentDetails] = useState("");

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    setIsLoading(true);

    try {
      const payload = {
        details: newMessage,
        context: context.map((entry) => ({
          request: entry.request,
          response: entry.response,
        })),
      };

      const response = await addChat(payload);

      const userMessage = {
        id: Date.now().toString(),
        details: newMessage,
        user_role: "customer",
        user_name: "You",
        created_date: new Date().toISOString(),
      };

      const apiResponseMessage = {
        id: Date.now() + 1,
        details: response.suggested_solutions
          ? `Issue: ${response.current_issue}\nSuggested Solutions: ${response.suggested_solutions}`
          : `Issue: ${response.current_issue}\nNo solutions available.`,
        user_role: "admin",
        user_name: "Support Bot",
        created_date: new Date().toISOString(),
      };

      const newContextEntry = {
        request: newMessage,
        response: response.suggested_solutions,
      };

      setContext((prevContext) => [...prevContext, newContextEntry]);
      setMessages((prevMessages) => [
        ...prevMessages,
        userMessage,
        apiResponseMessage,
      ]);

      console.log(response);
      if (!response.suggested_solutions) {
        setIncidentDetails(
          response.current_issue || "No additional details available."
        );
        toggleModal();
      }

      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateIncident = async () => {
    try {
      const response = await addIncident(incidentDetails );
      setMessages([]);
      setContext([]);
      setIncidentDetails('');
      toggleModal();
      Alert.alert("Success", "Your Incident has been created and all data has been reset.");
    } catch (error) {
      console.error("Error adding incident:", error);
      Alert.alert("Error", "There was a problem creating your incident. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.chatContainer}>
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.chatBubble,
                msg.user_role !== "customer"
                  ? styles.adminBubble
                  : styles.customerBubble,
              ]}
            >
              <Text style={styles.chatUser}>
                {msg.user_name} (
                {msg.user_role === "customer" ? "you" : msg.user_role})
              </Text>
              <Text style={styles.chatDetails}>{msg.details}</Text>
              <Text style={styles.chatDate}>
                {new Date(msg.created_date).toLocaleTimeString()}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          {isLoading && <ActivityIndicator size="small" color="#007BFF" />}
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type your message..."
            editable={!isLoading}
          />
          <TouchableOpacity
            style={[styles.sendButton, isLoading && styles.disabledButton]}
            onPress={handleSendMessage}
            disabled={isLoading}
          >
            <Text style={styles.sendButtonText}>
              {isLoading ? "Sending..." : "Send"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Modal */}
        <Modal
          transparent={true}
          visible={isModalVisible}
          animationType="slide"
          onRequestClose={toggleModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{t("No Suggested Solutions")}</Text>
              <Text style={styles.label}>{t("The Chat bot can not find further information")}</Text>
              <Text style={styles.label}>{t("A new Incident will be created with the following detail:")}</Text>

              <Text style={styles.modalDetails}>{incidentDetails}</Text>

              <Text style={styles.label}>{t("Do you want to continue?")}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleCreateIncident}
                >
                  <Text style={styles.buttonText}>{t("Save")}</Text>
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
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
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
  chatContainer: {
    flexGrow: 1,
    padding: 20,
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  sendButton: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007BFF",
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: "#a0a0a0",
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
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
  modalDetails: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 20,
    marginTop: 20,
  },
  closeButton: {
    backgroundColor: "#321FDB",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
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
