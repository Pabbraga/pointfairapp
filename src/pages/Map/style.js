import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
      map: {
        height: '60%',
        backgroundColor: 'black'
    },
    search: {
      height: '40%',
      backgroundColor: '#CE6A85',
      backgroundColor: '#fff',
    },
    searchSection: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    input: {
      flex: 1,
      padding: 20,
      paddingLeft: 5,
      fontSize: 20,
      backgroundColor: '#fff',
      color: '#424242',
  },
})

export default styles;