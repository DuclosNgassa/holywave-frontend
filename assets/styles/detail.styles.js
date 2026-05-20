import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../constants/colors";

const { height } = Dimensions.get("window");

const recipeDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    height: height * 0.6,
    position: "relative",
  },
  imageTapArea: {
    width: "100%",
    height: "100%",
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  gradientOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "70%",
  },
  floatingButtons: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
  },
  rightButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  floatingButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  titleSection: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    zIndex: 5,
  },
  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 12,
  },
  categoryText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "600",
  },
  postTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.white,
    marginBottom: 12,
    lineHeight: 38,
    letterSpacing: -0.5,
  },
  metaText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 13,
    fontWeight: "500",
    letterSpacing: 0.2,
  },
  contentSection: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -40,
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 40,
    minHeight: height * 0.5,
  },
  description: {
    fontSize: 16,
    color: "#2D3436",
    lineHeight: 26,
    marginBottom: 24,
    fontWeight: "400",
  },
  infoCard: {
    backgroundColor: "#F1F3F5",
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 15,
    color: COLORS.text,
    fontWeight: '600',
  },
});

export default recipeDetailStyles;
