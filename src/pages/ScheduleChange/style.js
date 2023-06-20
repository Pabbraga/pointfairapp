import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#CE6A85'
    },
    title: {
        marginLeft: 25,
        marginTop: 15,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#5C374C'
    },
    form: {
        marginTop: 35,
        width: 300,
        alignItems: 'center'
    },
    group: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
    }, 
    p: {
        width: 100, 
        fontSize: 16,
        color: "#5C374C",
        fontWeight: '700',
    },
    input: {
        width: 150,
        height: 40,
        borderRadius: 10,
        paddingHorizontal: 8,
        color: "black",
        backgroundColor: "#fff",
        fontSize: 16,
    },
    button: {
        width: 100, 
        marginTop: 20,
        marginLeft: 10,
        backgroundColor: "#FFC15E",
        borderRadius: 10,
        padding: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: '500',
    },
});

export default styles;