import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#CE6A85'
    },
    profile: {
        marginTop: 25,
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
        marginBottom: 5
    }, 
    description: {
        height: 70,
        width: 200,
        padding: 4,
        paddingHorizontal: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#FAA275'
    },
    text: {
        fontSize: 17,
        fontWeight: '600',
        color: '#fff'
    },
    menu: {
        width: 160,
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
    followButton: {
        marginLeft: 10,
        marginBottom: 5,
        padding: 10,
        borderRadius: 15,
        backgroundColor: '#5C374C',
    },
})

export default styles;