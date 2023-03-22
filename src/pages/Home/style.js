import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#CE6A85'
    },
    header: {
        width: '100%',
        height: 100,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    main: {
        flex: 2
    },
    userPhoto: {
        width: 60,
        height: 60,
        borderRadius: 30,
        margin: 10
    },
    tabBar: {
        backgroundColor: 'black'
    }
})

export default styles;