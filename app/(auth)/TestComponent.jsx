import React from 'react';
import { View, Text, Button } from 'react-native';
import { useTranslation } from 'react-i18next';

const TestComponent = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    console.log(`Changing language to: ${lang}`);
    i18n.changeLanguage(lang)
      .then(() => console.log(`Language changed to ${lang}`))
      .catch((err) => console.error("Error changing language:", err));
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>{t('Log In')}</Text>
      <Button title="English" onPress={() => changeLanguage('en')} />
      <Button title="Español" onPress={() => changeLanguage('es')} />
    </View>
  );
};

export default TestComponent;