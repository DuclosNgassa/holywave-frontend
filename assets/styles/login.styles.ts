import { COLORS } from "@/constants/colors";
import { TYPOGRAPHY } from "@/constants/typography";
import { StyleSheet, Dimensions, type TextStyle } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    topSection: {
        height: height * 0.45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background, // Soft off-white
    },
    illustrationImage: {
        width: width * 0.8,
        height: width * 0.8,
    },
    contentSection: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        marginTop: -40,
        paddingHorizontal: 24,
        paddingTop: 40,
        justifyContent: 'space-between',
        paddingBottom: 40,
    },
    header: {
        marginBottom: 32,
    },
    title: {
        ...(TYPOGRAPHY.h1 as TextStyle),
        color: COLORS.text,
        fontSize: 32,
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        ...(TYPOGRAPHY.body as TextStyle),
        color: COLORS.textLight,
        textAlign: "center",
        fontSize: 16,
        lineHeight: 24,
    },
    buttonContainer: {
        gap: 16,
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 20,
        height: 64,
        borderWidth: 1.5,
        borderColor: "#F1F3F5",
        shadowColor: "rgba(0,0,0,0.05)",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 12,
        elevation: 2,
    },
    socialButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    socialIcon: {
        width: 24,
        height: 24,
    },
    socialButtonText: {
        ...(TYPOGRAPHY.label as TextStyle),
        fontSize: 16,
        color: COLORS.text,
        fontWeight: '700',
    },
    footerText: {
        ...(TYPOGRAPHY.caption as TextStyle),
        color: COLORS.textLight,
        textAlign: "center",
        fontSize: 12,
        lineHeight: 18,
        paddingHorizontal: 16,
        textTransform: 'none',
    },
    link: {
        color: COLORS.primary,
        fontWeight: "700",
    },
});

export default styles;
