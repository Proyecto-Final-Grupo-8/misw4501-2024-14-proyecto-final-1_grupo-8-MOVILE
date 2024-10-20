import { ActivityIndicator, Text, TouchableOpacity, StyleSheet } from "react-native";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[
        styles.button, 
        isLoading && styles.buttonDisabled, 
        containerStyles
      ]}
      disabled={isLoading}
    >
      <Text style={[styles.text, textStyles]}>
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          style={styles.activityIndicator}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF6347',  
    borderRadius: 12,            
    minHeight: 62,               
    flexDirection: 'row',        
    justifyContent: 'center',    
    alignItems: 'center',        
  },
  buttonDisabled: {
    opacity: 0.5,                
  },
  text: {
    color: '#FFFFFF',            
    fontSize: 18,                
  },
  activityIndicator: {
    marginLeft: 8,               
  },
});

export default CustomButton;
