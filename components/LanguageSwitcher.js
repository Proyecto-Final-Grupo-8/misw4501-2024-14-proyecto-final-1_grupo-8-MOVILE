import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
//import i18n from 'i18next';
import i18n from '../i18n';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    console.log(`Attempting to change language to: ${language}`);
    if (typeof i18n.changeLanguage === 'function') {
      i18n
        .changeLanguage(language)
        .then(() => console.log(`Language changed to ${language}`))
        .catch((err) => console.error('Error changing language:', err));
    } else {
      console.error('i18n.changeLanguage is not available');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => changeLanguage('en')}>
        <Text style={styles.text}>English</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => changeLanguage('es')}>
        <Text style={styles.text}>Español</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
});

export default LanguageSwitcher;