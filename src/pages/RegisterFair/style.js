import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFC15E",
        justifyContent: 'space-between',
        //alignItems: 'center',
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    h1: {
        fontSize: 32,
        textAlign: 'center',
        color: "#5C374C",
        fontWeight: "700",
        marginBottom: 50,
    },
    group: {
        marginBottom: 20,
        width: "80%"
    },
    p: {
        fontSize: 16,
        marginBottom: 5,
        color: "#5C374C",
        fontWeight: "700",
    }, 
    input: {
        height: 45,
        borderRadius: 15,
        padding: 8,
        color: "#fff",
        backgroundColor: "#5C374C",
        fontSize: 16,
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
        fontWeight: "500",
    },
    link: {
        color: "#985277",
        fontSize: 16
    }
})

export default styles;