import { StyleSheet } from "react-native"
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CE6A85',
    },
    searchSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15
    },
    input: {
        width: 300,
        paddingVertical: 5,
        paddingLeft: 10,
        fontSize: 20,
        borderRadius: 20,
        marginTop: 15,
        marginLeft: 10,
        backgroundColor: 'rgba(252, 220, 93, 0.36)',
        color: '#424242',
    },
    main: {
        flex: 1,
        paddingTop: 10,
    },
    list: {
        paddingHorizontal: 15
    },
})

export default styles;

// justifyContent: 'flex-start',
// alignItems: 'flex-start',