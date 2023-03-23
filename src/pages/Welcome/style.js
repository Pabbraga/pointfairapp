import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#CE6A85',
      alignItems: 'center',
      justifyContent: 'center',
    },
    imgLogo: {
        width: 350,
        height: 350,
    },
    logo: {
      fontSize: 24,
      marginBottom: 30,
      color: '#5C374C',
    },
    buttonContainer: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    button: {
      backgroundColor: '#5C374C',
      borderRadius: 10,
      padding: 10,
      margin: 10,
    },
    buttonText: {
      color: '#FAA275',
      fontSize: 16,
    }
});

export default styles;