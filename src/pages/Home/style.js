import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#CE6A85'
    },
    list: {
        paddingHorizontal: 15
    },
    header: {
        width: '100%',
        backgroundColor: '#CE6A85',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingBottom: 10,
        alignItems: 'center' 
    },
    logoMark: {
        color: '#FAA275',
        fontSize: 30,
        fontWeight: 700
    },
    main: {
        flex: 1,
        paddingTop: 10
    },
    userPhoto: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginTop: 10,
        marginRight: 10,
        borderWidth: 3,
        borderColor: '#5C374C',
    },
})

export default styles;