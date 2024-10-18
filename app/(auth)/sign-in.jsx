import React, { useState } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; 
import { useNavigation } from '@react-navigation/native';
import colors from "../../constants/colors";

const SignIn = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [isSelected, setSelected] = useState(false);

  const handleSignIn = () => {
    // Lógica para manejar el inicio de sesión
    //console.log(`Email: ${email}, Password: ${password}`);
    console.log('Clicked!');
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      {/*Logo*/}
      <Image source={require('../../assets/icons/logo.png')} style={styles.logo} />
      
      {/*Titulo*/}
      <Text style={styles.title}>Log In</Text>
      <Text style={{marginBottom: 20}}>Log In to your Account</Text>
      
      {/*Email*/}
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

      {/*Password*/}
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
      
      {/*Remember me*/}
      {/*<View style={styles.checkboxContainer}>
        <CheckBox
          value={isSelected}
          onValueChange={setSelected}
        />
        <Text style={styles.checkboxLabel}>Remember me</Text>
      </View>
      */}
      {/*Buttons*/}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.buttonPrimary} onPress={handleSignIn}>
          <Text style={styles.buttonPrimaryText}>LogIn</Text>
        </TouchableOpacity>
        </View>

      {/*Forgot Password*/}
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 5,
    fontSize: 16,
    //flex: 1, // Para que el input ocupe todo el espacio restante
  },
  icon: {
    marginRight: 10, // Espacio entre el icono y el campo de texto
  },
  input: {
    flex: 1, 
    fontSize: 16,
  },
  //checkboxContainer: {
  //  flexDirection: 'row',
  //  alignItems: 'center',
  //  marginBottom: 20,
  //},
  //checkboxLabel: {
  //  marginLeft: 8,
  //  fontSize: 16,
  //},
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
    justifyContent: 'center',
    flex: 1,
    marginRight: 10,
  },
  //buttonSecondary: {
  //  backgroundColor: colors.secondary,
  //  paddingVertical: 15,
  //  paddingHorizontal: 30,
  //  borderRadius: 50,
  //  alignItems: 'center',
  //  justifyContent: 'center',
  //  flex: 1,
  //  marginRight: 10, 
  //},
  buttonPrimaryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  //buttonSecondaryText: {
  //  color: '#fff',
  //  fontSize: 16,
  //  fontWeight: 'bold',
  //  textAlign: 'center',
  //},
  forgotPasswordText: {
    color: '#666',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});

export default SignIn;