import React, { useState, useContext } from "react";
import {
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { AuthContext } from '../../contexts/AuthContext';
import colors from "../../constants/colors";
import { router } from "expo-router";

const SignIn = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async () => {
    try {
      await login(email, password); 
      router.push("/home")
    } catch (error) {
      setErrorMessage(error.message); 
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/icons/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Log In</Text>
      <Text style={{ marginBottom: 20 }}>Log In to your Account</Text>

      {/* Mostrar mensaje de error si existe */}
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      {/* Email */}
      <View style={styles.inputContainer}>
        <FontAwesome name="user" size={24} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Password */}
      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={24} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {/* Botón de Login */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.buttonPrimary} onPress={handleLogin}>
          <Text style={styles.buttonPrimaryText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    backgroundColor: "#fff",
  },
  logo: {
    width: 135,
    height: 150,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 5,
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginRight: 10,
  },
  buttonPrimaryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
    fontSize: 14,
  },
});

export default SignIn;
