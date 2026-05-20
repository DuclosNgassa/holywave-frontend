import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";
import { TYPOGRAPHY } from "@/constants/typography";

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: COLORS.background,
        padding: 20,
        justifyContent: "center",
    },
    card: {
        backgroundColor: COLORS.background,
        borderRadius: 16,
        padding: 24,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        borderWidth: 2,
        borderColor: COLORS.border,
    },
    header: {
        alignItems: "center",
        marginBottom: 32,
    },
    title: {
        ...TYPOGRAPHY.h1,
        color: COLORS.primary,
        marginBottom: 8,
    },
    subtitle: {
        ...TYPOGRAPHY.body,
        color: COLORS.textLight,
        textAlign: "center",
    },
    formContainer: { marginBottom: 16 },
    inputGroup: { marginBottom: 20 },
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
    inputIcon: { marginRight: 10 },
    input: {
        flex: 1,
        height: 48,
        ...TYPOGRAPHY.bodySmall,
        color: COLORS.text,
    },
    eyeIcon: { padding: 8 },
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
        ...TYPOGRAPHY.bodySmall,
        color: COLORS.textLight,
        marginRight: 5,
    },
    link: {
        color: COLORS.primary,
        fontWeight: "600",
    },
});

export default styles;
