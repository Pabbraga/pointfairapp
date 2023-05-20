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
    },
    article:{
        backgroundColor: '#FAA275',
        marginTop: 35,
        paddingHorizontal: 50,
        paddingVertical: 10  
    },
    articleH1:{
        backgroundColor: '#985277',
        fontSize: 26,
        paddingHorizontal: 60,
        marginBottom: 20
    },
    articleP:{
        fontSize: 18,
        paddingBottom: 5
    },
    menuContainer: {
        position: 'absolute',
        top: 25,
        right: 20,
        zIndex: 1,
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
    activeSection: {
        backgroundColor: '#FAA275',
        borderRadius: 100,
    },
    activeSection: {
        backgroundColor: '#FAA275',
        borderRadius: 100,
    }, 
})

export default styles;