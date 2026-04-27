import { COLORS } from "@/constants/colors.js";
import { StyleSheet, Dimensions } from "react-native";


const favoriteStyles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.cardBackground,
        borderRadius: 16,
        padding: 10,
        marginHorizontal: 10,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    containerCard: {
        flex: 1,
        flexDirection: 'row',
        gap: '10',
    },
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: COLORS.background,
        gap: '10',
        marginTop: 0,
        marginBottom:0,
        paddingVertical:8
    },
     header: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 8,
    },
    tabActive: {
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        height: 35,
        //flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        //marginTop: 8,
        marginRight: 2,
        paddingHorizontal: 8,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    tabLogout: {
        gap: 12,
        backgroundColor: COLORS.red,
        borderRadius: 5,
        height: 35,
        //flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        //marginTop: 8,
        marginRight: 2,
        paddingHorizontal: 8,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    tabInActive: {
        backgroundColor: COLORS.textSecondary,
        borderRadius: 5,
        height: 35,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 2,
        paddingHorizontal: 8,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: "600",
    },
    title: {
        fontSize: 15,
        fontWeight: "500",
        color: COLORS.text,
    },
    text: {
        fontSize: 12,
        color: COLORS.textDark,
    },
    sectionHeader: {
        marginBottom: 30,
        //paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: COLORS.text,
        letterSpacing: -0.5,
    },
    image: {
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.border,
        borderRadius: 5
    },
    imageContainer: {
        flex: 2,
        height: 110,
        position: "relative",
    },
    textContainer: {
        flex: 3,
        position: "relative",
    },
    textContainerFavorit: {
        flex: 3,
        alignContent: 'space-between'
    },
    address: {
        fontSize: 13,
        color: COLORS.textSecondary,
    },
    feeText: {
        fontSize: 16,
        color: COLORS.primary,
        marginLeft: 4,
        fontWeight: "500",
    },
    locationRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginBottom: 0,
    },
    badge: {
        alignSelf: "flex-start",
        backgroundColor: COLORS.textLight,
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 5,
    },
    cardHeader: {
        flexDirection: 'row',
        alignContent: "space-between"
    },
    cardTitle: {
        flexDirection: 'column',
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: "space-between"
    },
    footerFavorit: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        alignContent: "space-between"
    },

    footerTextFavorit: {
        flex: 1,
        alignItems: 'flex-start'
    },

    footerText: {
        flex: 1,
        alignItems: 'flex-start'
    },
    headerText: {
        flex: 1,
    },
    actionContainer: {
        flex: 1,
        alignItems: 'flex-end'
    },
    actionContainerMyEvent: {
        flexDirection: "row",
    },
    buttonContainerMyEvent: {
        marginLeft: 16,
    },
    deleteButton: {
        color: COLORS.red,
    },

    editButton: {
        color: COLORS.primary,
    },
    button: {
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16,
        padding: 10,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    favoriteButton: {
        color: COLORS.red,
        size: 22,
        margin: 12
    },
    shareButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    favoritDeleteButton: {
        color: COLORS.red,
        size: 22,
        marginLeft: 8
    },
    emptyState: {
        alignItems: "center",
        paddingVertical: 64,
        paddingHorizontal: 32,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: COLORS.text,
        marginTop: 16,
        marginBottom: 8,
    },
    emptyDescription: {
        fontSize: 14,
        color: COLORS.textLight,
        textAlign: "center",
    },

});

export default favoriteStyles;