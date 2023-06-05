import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#CE6A85'
    },
    profile: {
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
    nickname: {
        fontSize: 24,
        color: '#FFF',
        marginBottom: 15
    }, 
    menu: {
        width: 150,
        position: 'absolute',
        top: 60,
        right: 20,
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