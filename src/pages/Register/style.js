import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFC15E",
        justifyContent: 'space-between',
    },
    form: {
        flex: 1,
        alignItems: 'center',
        padding: 30
    },
    h1: {
        fontSize: 32,
        color: "#5C374C",
        fontWeight: '700',
        marginBottom: 50,
    },
    group: {
        marginBottom: 15,
        width: "80%"
    },
    p: {
        fontSize: 16,
        marginBottom: 5,
        color: "#5C374C",
        fontWeight: '700',
    }, 
    input: {
        height: 45,
        borderRadius: 10,
        padding: 8,
        color: "#fff",
        backgroundColor: "#5C374C",
        fontSize: 16,
    },
    labelError: {
      alignSelf: 'flex-start',
      color: '#ff375b',
      marginLeft: 15  
    },
    opacity: {
        marginVertical: 10
    },
    button: {
        backgroundColor: "#985277",
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 25
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: '500',
    },
    link: {
        color: "#985277",
        fontSize: 16
    },
    dropdown: {
        height: 50,
        backgroundColor: "#5C374C",
        borderColor: '#985277',
        borderWidth: 0.5,
        borderRadius: 10,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        color: '#ccc',
        fontSize: 16,
    },
    selectedTextStyle: {
        color: '#ccc',
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

export default styles;