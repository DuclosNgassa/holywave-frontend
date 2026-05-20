import { COLORS } from "@/constants/colors.js";
import { TYPOGRAPHY } from "@/constants/typography.js";
import { StyleSheet, Dimensions, type TextStyle } from "react-native";

const { width } = Dimensions.get("window");

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
        ...(TYPOGRAPHY.h1 as TextStyle),
        color: COLORS.text,
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
        ...(TYPOGRAPHY.caption as TextStyle),
        color: COLORS.white,
    },
    featuredContent: {
        justifyContent: "flex-end",
    },
    featuredTitle: {
        ...(TYPOGRAPHY.h2 as TextStyle),
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
        ...(TYPOGRAPHY.h3 as TextStyle),
        color: COLORS.text,
        marginTop: 16,
        marginBottom: 8,
    },
    emptyDescription: {
        ...(TYPOGRAPHY.bodySmall as TextStyle),
        color: COLORS.textLight,
        textAlign: "center",
    },
    categoryFilterContainer: {
        marginTop: 12,
        marginBottom: 8,
    },
    categoryFilterScrollContent: {
        paddingHorizontal: 12,
        gap: 8,
    },
    categoryButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
        backgroundColor: "#F1F3F5", // Soft grey background
        justifyContent: "center",
        alignItems: "center",
        minWidth: 60,
    },
    selectedCategory: {
        backgroundColor: COLORS.primary,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    categoryText: {
        ...(TYPOGRAPHY.label as TextStyle),
        fontSize: 14,
        color: "#6C757D", // Neutral grey text
    },
    selectedCategoryText: {
        color: COLORS.white,
        fontWeight: "700",
    },
    formGroup: {
        marginTop: 16,
        marginBottom: 8,
        paddingHorizontal: 12,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.white, // Pure white for the field
        borderRadius: 16,
        paddingHorizontal: 16,
        height: 56, // Slightly taller for better touch target
        shadowColor: "rgba(0,0,0,0.05)",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 12,
        elevation: 2,
    },
    searchFieldInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        height: "100%",
        ...(TYPOGRAPHY.body as TextStyle),
        color: COLORS.text,
        fontSize: 16,
    },
    scrollViewStyle: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    listFadeOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 120, // Height of the fade effect
    },
});

export const recipeCardStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        padding: 12,
        marginBottom: 12,
        borderRadius: 20,
        alignItems: 'center',
        gap: 16,
    },
    imageContainer: {
        width: 100,
        height: 100,
        borderRadius: 16,
        overflow: "hidden",
        backgroundColor: COLORS.background,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        gap: 4,
    },
    categoryText: {
        ...(TYPOGRAPHY.caption as TextStyle),
        color: COLORS.textLight,
        fontSize: 11,
    },
    title: {
        ...(TYPOGRAPHY.label as TextStyle),
        fontSize: 16,
        color: COLORS.text,
        lineHeight: 20,
        marginBottom: 8,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    authorAvatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: COLORS.background,
    },
    authorName: {
        ...(TYPOGRAPHY.bodySmall as TextStyle),
        fontSize: 13,
        color: COLORS.textLight,
    },
    dot: {
        color: COLORS.textLight,
        fontSize: 14,
    },
    dateText: {
        ...(TYPOGRAPHY.bodySmall as TextStyle),
        fontSize: 13,
        color: COLORS.textLight,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 4,
    },
    feeContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    feeText: {
        ...(TYPOGRAPHY.label as TextStyle),
        fontSize: 14,
        color: COLORS.primary,
    },
    actionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    actionIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    actionText: {
        ...(TYPOGRAPHY.bodySmall as TextStyle),
        fontSize: 12,
        color: COLORS.textLight,
    },
});

export const nearbyCardStyles = StyleSheet.create({
    container: {
        width: width * 0.85,
        height: 200,
        marginHorizontal: 8,
        borderRadius: 24,
        overflow: "hidden",
        backgroundColor: COLORS.card,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },
    imageContainer: {
        ...StyleSheet.absoluteFillObject,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    gradientOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.4)", // Fallback if LinearGradient is not used correctly
    },
    cardContent: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 16,
    },
    categoryBadge: {
        alignSelf: 'flex-start',
        backgroundColor: COLORS.primary,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    categoryText: {
        ...(TYPOGRAPHY.caption as TextStyle),
        color: COLORS.white,
        fontSize: 11,
    },
    bottomInfo: {
        gap: 4,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    authorName: {
        ...(TYPOGRAPHY.label as TextStyle),
        color: COLORS.white,
        fontSize: 13,
    },
    bullet: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 14,
    },
    timeText: {
        ...(TYPOGRAPHY.bodySmall as TextStyle),
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
    },
    title: {
        ...(TYPOGRAPHY.h3 as TextStyle),
        color: COLORS.white,
        fontSize: 18,
        lineHeight: 22,
    },
    sectionTitle: {
        ...(TYPOGRAPHY.h3 as TextStyle),
        color: COLORS.text,
        marginBottom: 12,
        marginLeft: 10,
    },
    nearbySectionHeader: {
        marginTop: 16,
        marginBottom: 8,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
        gap: 6,
    },
    paginationDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#E0E0E0',
    },
    paginationDotActive: {
        width: 18,
        backgroundColor: COLORS.primary,
    },
});

export default homeStyles;