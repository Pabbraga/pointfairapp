import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
        backgroundColor: '#CE6A85'
    },
    perfil: {
        marginTop: 50,
        alignItems: 'center',
    },
    userPhoto: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 15
    }, 
    h1: {
        fontSize: 20,
        color: '#FFF',
        marginBottom: 15
    }, 
    button: {
        backgroundColor: "#FFC15E",
        borderRadius: 10,
        padding: 10,
    }, 
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: '500',
    },
    icons: {
        marginTop: 35,
        flexDirection: "row",
    }, 
    product:{
       flexDirection: "row",
       justifyContent: 'space-around',
        marginTop: 30
    },
    productphoto: {
        width: 140,
        height: 140,
        borderRadius: 10,
        margin: 10
    }
})

export default styles;