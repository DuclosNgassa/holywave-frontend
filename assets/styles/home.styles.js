import { COLORS } from "@/constants/colors.js";
import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const cardWidth = (width / 2) - 15;
const cardWidthNearBy = (width - 48) / 4;

const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingHorizontal: 10,
    },
    scrollContent: {
        paddingBottom: 32,
    },
    welcomeSection: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    welcomeText: {
        fontSize: 32,
        fontWeight: "800",
        color: COLORS.text,
        letterSpacing: -0.5,
    },
    featuredSection: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    featuredCard: {
        borderRadius: 24,
        overflow: "hidden",
        backgroundColor: COLORS.card,
        shadowColor: COLORS.shadow,
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 12,
    },
    featuredImageContainer: {
        height: 240,
        backgroundColor: COLORS.primary,
        position: "relative",
    },
    featuredImage: {
        width: "100%",
        height: "100%",
    },
    featuredOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: "space-between",
        padding: 20,
    },
    featuredBadge: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        alignSelf: "flex-start",
    },
    featuredBadgeText: {
        color: COLORS.white,
        fontSize: 12,
        fontWeight: "600",
    },
    featuredContent: {
        justifyContent: "flex-end",
    },
    featuredTitle: {
        fontSize: 24,
        fontWeight: "800",
        color: COLORS.white,
        marginBottom: 12,
        textShadowColor: "rgba(0,0,0,0.3)",
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    recipesSection: {
        flex: 4,
        marginTop:8
    },
    recipesGrid: {
        gap: 0,
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
    categoryFilterContainer: {
        marginTop: 5,
    },
    categoryFilterScrollContent: {
        gap: 5,
    },
    categoryButton: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.card,
        paddingVertical: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
        minWidth: 80,
        shadowColor: COLORS.shadow,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    selectedCategory: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
        shadowOpacity: 0.15,
    },
    categoryImage: {
        width: 30,
        height: 30,
        borderRadius: 20,
        backgroundColor: COLORS.border,
    },
    nearByImage: {
        width: "100%",
        borderRadius: 10,
        backgroundColor: COLORS.border,
    },
    selectedCategoryImage: {
        borderWidth: 2,
        borderColor: COLORS.white,
    },
    categoryText: {
        fontSize: 10,
        fontWeight: "500",
        color: COLORS.textDark,
        textAlign: "center",
    },
    selectedCategoryText: {
        fontSize: 11,
        color: COLORS.white,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 48,
        color: COLORS.textDark,
    },
    searchFieldInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        backgroundColor: COLORS.inputBackground,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: 12,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.inputBackground,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    formGroup: {
        marginVertical: 0,
    },
    scrollViewStyle: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
});

export const recipeCardStyles = StyleSheet.create({
    container: {
        width: cardWidth,
        backgroundColor: COLORS.card,
        borderRadius: 5,
        marginBottom: 10,
        shadowColor: COLORS.shadow,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        overflow: "hidden",
    },
    imageContainer: {
        position: "relative",
        height: 150,
    },
    image: {
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.border,
    },
    content: {
        padding: 8,
    },
    address: {
        fontSize: 13,
        color: COLORS.textSecondary,
    },

    title: {
        fontSize: 14,
        color: COLORS.textDark,
    },
    description: {
        fontSize: 12,
        color: COLORS.textLight,
        marginBottom: 8,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    feeContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    feeText: {
        fontSize: 16,
        color: COLORS.primary,
        marginLeft: 4,
        fontWeight: "500",
    },
    footerIconContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    favoritIconText: {
        fontSize: 11,
        color: COLORS.textDark,
        marginLeft: 4,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 48,
        color: COLORS.textDark,
    },
    searchFieldInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        backgroundColor: COLORS.inputBackground,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: 12,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.inputBackground,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    formGroup: {
        marginVertical: 10,
        marginHorizontal: 20,
    },
});

export const nearbyCardStyles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.background, marginHorizontal: 5 ,
        width: cardWidthNearBy,
        shadowColor: COLORS.shadow,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        overflow: "hidden",
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: "800",
        color: COLORS.text,
        letterSpacing: -0.5,
    },
    nearbySectionHeader: {
        marginBottom: 10,
    },
    scrollContainer: {
        flexDirection: 'row',
        width: width * 2
    },
    imageContainer: {
        position: "relative",
        height: 50,
    },
    image: {
        width: "100",
        height: "100",
        backgroundColor: COLORS.border,
    },
    title: {
        fontSize: 12,
        color: COLORS.textDark,
    },
    address: {
        fontSize: 10,
        color: COLORS.textSecondary,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 48,
        color: COLORS.textDark,
    },
    searchFieldInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        backgroundColor: COLORS.inputBackground,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: 12,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.inputBackground,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    formGroup: {
        marginVertical: 10,
        marginHorizontal: 20,
    },
});

export default homeStyles;