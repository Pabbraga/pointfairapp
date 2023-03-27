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
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        padding: 20,
        paddingLeft: 5,
        fontSize: 20,
        backgroundColor: '#fff',
        color: '#424242',
    },
    main: {
        flex: 1,
        paddingTop: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
})

export default styles;