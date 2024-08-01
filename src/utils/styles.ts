import { StyleSheet, Dimensions } from "react-native";
import { ThemeColors, DatePickerStyles } from "./types";

const SCREEN_WIDTH = Dimensions.get("window").width;

export const createStyles = (colors: ThemeColors): DatePickerStyles =>
  StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    datePickerContainer: {
      backgroundColor: colors.background,
      borderRadius: 8,
      overflow: "hidden",
      width: "90%",
      maxWidth: 400,
    },
    headerContainer: {
      padding: 16,
      backgroundColor: colors.headerBackground,
    },
    yearSelector: {
      alignSelf: "flex-start",
    },
    yearText: {
      fontSize: 14,
      color: colors.yearText,
    },
    dateText: {
      fontSize: 28,
      fontWeight: "bold",
      color: colors.selectedText,
      marginTop: 8,
    },
    yearPickerOverlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    yearPickerContainer: {
      backgroundColor: colors.background,
      borderRadius: 8,
      width: SCREEN_WIDTH * 0.5,
      maxWidth: 200,
      height: 300,
      overflow: "hidden",
    },
    yearItem: {
      height: 52,
      justifyContent: "center",
      alignItems: "center",
    },
    selectedYearItem: {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
    yearTextSelector: {
      fontSize: 22,
      color: colors.text,
    },
    selectedYearText: {
      color: colors.primary,
      fontWeight: "bold",
    },
    chevron: {
      width: 12,
      height: 12,
      justifyContent: "center",
      alignItems: "center",
    },
    chevronLeft: {
      transform: [{ rotate: "180deg" }],
    },
    chevronInner: {
      width: 8,
      height: 8,
      borderTopWidth: 2,
      borderRightWidth: 2,
      borderColor: colors.text,
      transform: [{ rotate: "45deg" }],
    },
    monthYearSelectorContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
      backgroundColor: colors.background,
    },
    monthYearText: {
      fontSize: 18,
      color: colors.monthYearText,
    },
    arrowButton: {
      padding: 8,
      zIndex: 1,
    },
    calendarContainer: {
      flex: 1,
      overflow: "hidden",
    },
    calendarWrapper: {
      flex: 1,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: "rgba(0, 0, 0, 0.1)",
    },
    button: {
      padding: 8,
      marginLeft: 8,
    },
    buttonText: {
      color: colors.buttonText,
      fontWeight: "bold",
    },
  });

export const mergeStyles = (
  baseStyles: DatePickerStyles,
  customStyles: Partial<DatePickerStyles>
): DatePickerStyles => {
  const mergedStyles = { ...baseStyles };

  for (const key in customStyles) {
    if (Object.prototype.hasOwnProperty.call(customStyles, key)) {
      mergedStyles[key as keyof DatePickerStyles] = {
        ...mergedStyles[key as keyof DatePickerStyles],
        ...(customStyles[key as keyof DatePickerStyles] as object),
      } as any;
    }
  }

  return mergedStyles;
};
