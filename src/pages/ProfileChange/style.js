import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#CE6A85'
    },
    title: {
        marginTop: 20,
        fontSize: 30,
        fontWeight: 'bold'
    },
    form: {
        marginTop: 50,
        alignSelf: 'center',
        alignItems: 'center',
        width: 200,
    },
    userPhoto: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 15
    },
    photoFilter: {
        position: 'absolute',
        backgroundColor: 'rgba(211, 204, 208, 0.4)',
        width: 100,
        height: 100,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        width: 200,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingBottom: 3,
        fontSize: 18,
        marginBottom: 20
    },
    button: {
        width: 100, 
        marginTop: 20,
        backgroundColor: "#FFC15E",
        borderRadius: 10,
        padding: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: '500',
    },
})

export default styles;