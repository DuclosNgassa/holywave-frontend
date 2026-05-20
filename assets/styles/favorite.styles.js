import { COLORS } from "@/constants/colors.js";
import { TYPOGRAPHY } from "@/constants/typography.js";
import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const favoriteStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    sectionHeader: {
        marginTop: 16,
        marginBottom: 24,
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: "row",
        backgroundColor: "#E9ECEF",
        borderRadius: 16,
        padding: 4,
        alignItems: "center",
        justifyContent: "space-between",
    },
    tabButton: {
        flex: 1,
        height: 44,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    tabActive: {
        backgroundColor: COLORS.white,
        shadowColor: "rgba(0,0,0,0.1)",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 3,
    },
    tabInActive: {
        backgroundColor: "transparent",
    },
    buttonText: {
        ...TYPOGRAPHY.label,
        fontSize: 14,
        color: "#6C757D",
    },
    buttonTextActive: {
        color: COLORS.primary,
        fontWeight: "700",
    },
    card: {
        backgroundColor: COLORS.cardBackground,
        borderRadius: 16,
        padding: 10,
        marginHorizontal: 10,
        shadowColor: COLORS.shadow,
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
        gap: 10,
    },
    logoutFAB: {
        //bottom: 0,
        position: 'absolute',
        right: 24,
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.red,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
        zIndex: 100,
    },
    title: {
        ...TYPOGRAPHY.label,
        fontSize: 15,
        color: COLORS.text,
    },
    text: {
        ...TYPOGRAPHY.bodySmall,
        fontSize: 12,
        color: COLORS.textDark,
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
        ...TYPOGRAPHY.label,
        fontSize: 13,
        color: COLORS.textSecondary,
    },
    feeText: {
        ...TYPOGRAPHY.h3,
        fontSize: 16,
        color: COLORS.primary,
        marginLeft: 4,
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
        shadowColor: COLORS.shadow,
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
        ...TYPOGRAPHY.h3,
        color: COLORS.text,
        marginTop: 16,
        marginBottom: 8,
    },
    emptyDescription: {
        ...TYPOGRAPHY.bodySmall,
        color: COLORS.textLight,
        textAlign: "center",
    },
});

export default favoriteStyles;