import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#CE6A85'
    },
    scrollView:{
        paddingHorizontal: 40
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    main: {
        flex: 2,
        paddingTop: 10
    },
    userPhoto: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginTop: 10,
        marginRight: 10,
    }
})

export default styles;