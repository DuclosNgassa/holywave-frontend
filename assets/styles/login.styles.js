import { COLORS } from "@/constants/colors";
import { TYPOGRAPHY } from "@/constants/typography";
import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        /*         flexGrow: 1,
                backgroundColor: COLORS.background,
                padding: 20,
                justifyContent: "center",
         */
        flex: 1,
        justifyContent: 'center'
    },
    scrollViewStyle: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    topIllustration: {
        alignItems: "center",
    },
    illustrationImage: {
        width: width * 0.85,
        height: width * 0.95,
    },
    card: {
        backgroundColor: COLORS.cardBackground,
        borderRadius: 16,
        padding: 24,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        borderWidth: 2,
        borderColor: COLORS.border,
        marginTop: 12,
    },
    header: {
        alignItems: "center",
        marginBottom: 24,
    },
    title: {
        ...TYPOGRAPHY.h1,
        color: COLORS.text,
        marginBottom: 8,
    },
    subtitle: {
        ...TYPOGRAPHY.body,
        color: COLORS.textLight,
        textAlign: "center",
    },
    formContainer: {
        marginBottom: 16,
    },
    formLogin: {
        flexDirection: 'column',
        gap: 8
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        ...TYPOGRAPHY.label,
        marginBottom: 8,
        color: COLORS.text,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.inputBackground,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: 12,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 48,
        ...TYPOGRAPHY.bodySmall,
        color: COLORS.text,
    },
    eyeIcon: {
        padding: 8,
    },
    button: {
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    buttonLogin: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        borderColor: COLORS.border,
        borderRadius: 9999,
        paddingVertical: 12,
        paddingHorizontal: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        borderWidth: 0.5,
    },
    buttonLoginContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonLoginIcon: {
        marginRight: 12,
        width: 40,
        height: 40,
    },
    buttonLoginIconApple: {
        marginRight: 12,
        width: 30,
        height: 30,
    },
    buttonText: {
        color: COLORS.white,
        ...TYPOGRAPHY.label,
        fontSize: 16,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 24,
    },
    footerText: {
        ...TYPOGRAPHY.caption,
        color: COLORS.textLight,
        textAlign: "center",
        fontSize: 12,
        lineHeight: 16,
        marginTop: 24,
        paddingHorizontal: 8,
        textTransform: 'none',
    },
    link: {
        color: COLORS.primary,
        fontWeight: "600",
    },
});

export default styles;