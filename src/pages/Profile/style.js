import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#CE6A85'
    },
    perfil: {
        marginTop: 50,
        alignItems: 'center',
        zIndex: -1
    },
    userPhoto: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 15,
        borderWidth: 3,
        borderColor: '#5C374C',
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
    },
    article:{
        backgroundColor: '#FAA275',
        marginTop: 35,
        paddingHorizontal: 50,
        paddingVertical: 10  
    },
    menuContainer: {
        position: 'absolute',
        top: 25,
        right: 20,
    },
    menu: {
        position: 'absolute',
        top: 60,
        right: 40,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        shadowColor: '#000000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    menuItem: {
        paddingVertical: 8,
    },
    menuItemText: {
        fontSize: 16,
    },
})

export default styles;