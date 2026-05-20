import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "@/constants/colors";
import { TYPOGRAPHY } from "@/constants/typography";

const { width } = Dimensions.get("window");

const horizontalCardStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 20,
    alignItems: 'center',
    gap: 16,
    shadowColor: "rgba(0,0,0,0.05)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  imageContainer: {
    width: 90,
    height: 90,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#F1F3F5",
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
    ...TYPOGRAPHY.caption,
    color: COLORS.primary,
    fontSize: 10,
    marginBottom: 2,
  },
  title: {
    ...TYPOGRAPHY.label,
    fontSize: 15,
    color: COLORS.text,
    lineHeight: 20,
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    ...TYPOGRAPHY.bodySmall,
    fontSize: 12,
    color: COLORS.textLight,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  priceText: {
    ...TYPOGRAPHY.label,
    fontSize: 14,
    color: COLORS.text,
    fontWeight: "700",
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionIcon: {
    padding: 4,
  }
});

export default horizontalCardStyles;
