import { ViewStyle, TextStyle } from "react-native";
import { Moment } from "moment";

export interface LocaleData {
  abbr: string;
  calendar: {
    monthNames: string[];
    monthNamesShort: string[];
    dayNames: string[];
    dayNamesShort: string[];
  };
}

export interface ThemeColors {
  primary: string;
  background: string;
  text: string;
  selectedText: string;
  disabledText: string;
  headerBackground: string;
  yearText: string;
  monthYearText: string;
  buttonText: string;
  todayText: string;
  dayText: string;
  dotColor: string;
  selectedDotColor: string;
  arrowColor: string;
  monthTextColor: string;
  indicatorColor: string;
}

export interface DatePickerProps {
  isVisible: boolean;
  onClose: () => void;
  onDateChange: (date: string) => void;
  initialDate?: string | Date | Moment;
  minDate?: string | Date | Moment;
  maxDate?: string | Date | Moment;
  localeData?: LocaleData;
  cancelButton?: string;
  okButton?: string;
  animationEnabled?: boolean;
  theme?: Partial<ThemeColors>;
  headerFormat?: string;
  monthYearFormat?: string;
  customStyles?: Partial<DatePickerStyles>;
}

export interface DatePickerStyles {
  modalOverlay: ViewStyle;
  datePickerContainer: ViewStyle;
  headerContainer: ViewStyle;
  yearSelector: ViewStyle;
  yearText: TextStyle;
  dateText: TextStyle;
  yearPickerOverlay: ViewStyle;
  yearPickerContainer: ViewStyle;
  yearItem: ViewStyle;
  selectedYearItem: ViewStyle;
  yearTextSelector: TextStyle;
  selectedYearText: TextStyle;
  chevron: ViewStyle;
  chevronLeft: ViewStyle;
  chevronInner: ViewStyle;
  monthYearSelectorContainer: ViewStyle;
  monthYearText: TextStyle;
  arrowButton: ViewStyle;
  calendarContainer: ViewStyle;
  calendarWrapper: ViewStyle;
  buttonContainer: ViewStyle;
  button: ViewStyle;
  buttonText: TextStyle;
}