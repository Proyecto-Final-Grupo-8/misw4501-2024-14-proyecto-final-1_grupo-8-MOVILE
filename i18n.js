import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
//import translationEN from './local/en/translation.json';
//import translationES from './local/es/translation.json';

// Configuración de traducciones
const resources = {
    en: {
        translation: {
          "Log In": "Log In",
            "Log In to your Account": "Log In to your Account",
            "Email": "Email",
            "Password": "Password"
            },        
      },
    es: {
        translation: {
            "hello": "Hola",
            "welcome": "¡Bienvenido a nuestra aplicación!",
            "Log In": "Acceso",
            "Email": "Correo Electrónico",
            "Password": "Contraseña",
            "Log In to your Account": "Iniciar sesión en su cuenta"
        },
      },
};

// Inicializar i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next) // Vincula i18next con react-i18next
  .init({
    resources,
    lng: 'en', // Idioma inicial
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false, // React ya maneja el escape
    },
  }).then(() => {
    console.log('i18n initialized successfully');
  }).catch(err => {
    console.error('Error initializing i18n:', err);
  });

export default i18n;