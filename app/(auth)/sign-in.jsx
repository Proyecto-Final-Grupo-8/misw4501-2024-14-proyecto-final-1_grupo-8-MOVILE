import React, { useState } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import colors from "../../constants/colors";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [isSelected, setSelection] = useState(false);

  const handleSignIn = () => {
    // Lógica para manejar el inicio de sesión
    console.log(`Email: ${email}, Password: ${password}, Remember me: ${isSelected}`);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/icons/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Log In</Text>
      <Text style={{marginBottom: 20}}>Log In to your Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.buttonPrimary} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSecondary}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centra el contenido verticalmente
    alignItems: 'center', // Centra el contenido horizontalmente
    paddingHorizontal: 40,
    backgroundColor: '#fff',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  logo: {
    width: 135,
    height: 150,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 5,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  buttonPrimaryText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonSecondary: {
    backgroundColor: colors.secondary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    alignItems: 'center',
    flex: 1,
    marginRight: 10, 
  },
  buttonSecondaryText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  forgotPasswordText: {
    color: '#666',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});

export default SignIn;
