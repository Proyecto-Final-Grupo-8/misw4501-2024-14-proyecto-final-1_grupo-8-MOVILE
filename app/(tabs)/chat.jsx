import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import { addChat } from "../../services/ApiProvider";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // useEffect(() => {
  //   const loadMessages = async () => {
  //     try {
  //       const data = await getChatMessages(); // Replace with your API call
  //       setMessages(data || []);
  //     } catch (error) {
  //       console.error('Error fetching messages:', error);
  //     }
  //   };

  //   loadMessages();
  // }, []);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      const newMsg = await addChatMessage({ details: newMessage, user_role: 'customer', user_name: 'You' }); // Replace with your API call
      setMessages((prevMessages) => [newMsg, ...prevMessages]); // Add the new message to the top
      setNewMessage(''); // Clear input field
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.chatContainer}>
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.chatBubble,
                msg.user_role !== 'customer'
                  ? styles.adminBubble
                  : styles.customerBubble,
              ]}
            >
              <Text style={styles.chatUser}>
                {msg.user_name} ({msg.user_role === 'customer' ? 'you' : msg.user_role})
              </Text>
              <Text style={styles.chatDetails}>{msg.details}</Text>
              <Text style={styles.chatDate}>
                {new Date(msg.created_date).toLocaleTimeString()}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type your message..."
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    width: '100%',
    alignSelf: 'stretch',
  },
  adminBubble: {
    backgroundColor: '#BBC1FF',
    width: '90%',
    alignSelf: 'flex-start',
  },
  customerBubble: {
    backgroundColor: '#E6E8FF',
    width: '90%',
    alignSelf: 'flex-end',
  },
  chatUser: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4a4a4a',
  },
  chatDetails: {
    fontSize: 16,
    color: '#333',
    marginTop: 4,
  },
  chatDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  sendButton: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007BFF',
    borderRadius: 8,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});