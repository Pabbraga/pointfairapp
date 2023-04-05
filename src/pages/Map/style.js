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
    searchSection: {
      height: '40%',
      padding: 6,
      backgroundColor: '#CE6A85',
      backgroundColor: '#CE6A85',
    },
    searchBar: {
      paddingHorizontal: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 8,
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