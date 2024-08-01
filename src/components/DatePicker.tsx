import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import moment, { Moment } from "moment";
import { localeRequires } from "../utils/localeUtils";

const SCREEN_WIDTH = Dimensions.get("window").width;

interface LocaleData {
  abbr: string;
  calendar: {
    monthNames: string[];
    monthNamesShort: string[];
    dayNames: string[];
    dayNamesShort: string[];
  };
}

interface ThemeColors {
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

interface DatePickerProps {
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
  customStyles?: {
    [key: string]: ViewStyle | TextStyle;
  };
}

const defaultTheme: ThemeColors = {
  primary: "#018577",
  background: "#FFFFFF",
  text: "#000000",
  selectedText: "#FFFFFF",
  disabledText: "#D9E1E8",
  headerBackground: "#018577",
  yearText: "#FFFFFF",
  monthYearText: "#000000",
  buttonText: "#018577",
  todayText: "#000000",
  dayText: "#2D4150",
  dotColor: "#018577",
  selectedDotColor: "#FFFFFF",
  arrowColor: "#018577",
  monthTextColor: "#018577",
  indicatorColor: "#018577",
};

const createStyles = (colors: ThemeColors) =>
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
      height: 550,
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

type DatePickerStyles = ReturnType<typeof createStyles>;


const MonthYearSelector: React.FC<{
  date: Moment;
  onPressArrow: (direction: "left" | "right") => void;
  localeData?: LocaleData;
  animatedTextStyle: any;
  monthYearFormat: string;
  styles: DatePickerStyles;
  colors: ThemeColors;
}> = ({
  date,
  onPressArrow,
  localeData,
  animatedTextStyle,
  monthYearFormat,
  styles,
  colors,
}) => {
  const localeCode = localeData?.abbr || "en";
  const monthYear = date.locale(localeCode).format(monthYearFormat);

  const ChevronIcon: React.FC<{ direction: "left" | "right" }> = useCallback(
    ({ direction }) => (
      <View
        style={[styles.chevron, direction === "left" && styles.chevronLeft]}
      >
        <View style={styles.chevronInner} />
      </View>
    ),
    [styles]
  );

  return (
    <View style={styles.monthYearSelectorContainer}>
      <TouchableOpacity
        onPress={() => onPressArrow("left")}
        style={styles.arrowButton}
      >
        <ChevronIcon direction="left" />
      </TouchableOpacity>
      <Animated.Text
        style={[
          styles.monthYearText,
          animatedTextStyle,
          { color: colors.monthYearText },
        ]}
      >
        {monthYear}
      </Animated.Text>
      <TouchableOpacity
        onPress={() => onPressArrow("right")}
        style={styles.arrowButton}
      >
        <ChevronIcon direction="right" />
      </TouchableOpacity>
    </View>
  );
};

const CustomHeader: React.FC<{
  selectedDate: Moment;
  currentDate: Moment;
  onPressYear: () => void;
  onPressDate: () => void;
  localeData?: LocaleData;
  headerFormat: string;
  styles: DatePickerStyles;
  colors: ThemeColors;
}> = ({
  selectedDate,
  currentDate,
  onPressYear,
  onPressDate,
  localeData,
  headerFormat,
  styles,
  colors,
}) => {
  const localeCode = localeData?.abbr || "en";
  const formattedDate = selectedDate.locale(localeCode).format(headerFormat);
  const year = currentDate.year();

  return (
    <View
      style={[
        styles.headerContainer,
        { backgroundColor: colors.headerBackground },
      ]}
    >
      <TouchableOpacity onPress={onPressYear} style={styles.yearSelector}>
        <Text style={[styles.yearText, { color: colors.yearText }]}>
          {year}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressDate}>
        <Text style={[styles.dateText, { color: colors.selectedText }]}>
          {formattedDate}
        </Text>
      </TouchableOpacity>
    </View>
  );
};


const DatePicker: React.FC<DatePickerProps> = ({
  isVisible,
  onClose,
  onDateChange,
  initialDate = new Date(),
  minDate = "1900-01-01",
  maxDate = "2700-12-31",
  localeData,
  cancelButton = "Cancel",
  okButton = "OK",
  animationEnabled = true,
  theme = {},
  headerFormat = "ddd, D MMM",
  monthYearFormat = "MMMM YYYY",
  customStyles = {},
}) => {
  const [selectedDate, setSelectedDate] = useState<Moment>(moment(initialDate));
  const [currentDate, setCurrentDate] = useState<Moment>(
    moment(initialDate).startOf("month")
  );
  const [isYearPickerVisible, setYearPickerVisible] = useState(false);
  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});
  const [calendarKey, setCalendarKey] = useState(0);

  const minMoment = moment(minDate);
  const maxMoment = moment(maxDate);
  const minYear = minMoment.year();
  const maxYear = maxMoment.year();

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const animatedTextStyle = {
    opacity: fadeAnim,
    transform: [{ translateX: slideAnim }],
  };

  useEffect(() => {
    LocaleConfig.locales['default'] = {
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    };
    LocaleConfig.defaultLocale = 'default';
  }, []);

  const colors: ThemeColors = useMemo(
    () => ({ ...defaultTheme, ...theme }),
    [theme]
  );
  const baseStyles = useMemo(() => createStyles(colors), [colors]);

  const mergeStyles = useCallback(
    (
      baseStyles: DatePickerStyles,
      customStyles: DatePickerProps["customStyles"]
    ) => {
      const mergedStyles = { ...baseStyles };
  
      for (const key in customStyles) {
        if (key in mergedStyles) {
          mergedStyles[key as keyof DatePickerStyles] = {
            ...(mergedStyles[key as keyof DatePickerStyles] as object),
            ...(customStyles[key] as object),
          } as any;
        }
      }
  
      return mergedStyles;
    },
    []
  );

  const styles = useMemo(
    () => mergeStyles(baseStyles, customStyles),
    [baseStyles, customStyles, mergeStyles]
  );

  const animate = useCallback(
    (direction: "left" | "right") => {
      if (!animationEnabled) {
        return Promise.resolve();
      }

      return new Promise<void>((resolve) => {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue:
              direction === "right" ? -SCREEN_WIDTH / 3 : SCREEN_WIDTH / 3,
            duration: 100,
            useNativeDriver: true,
          }),
        ]).start(() => {
          slideAnim.setValue(0);
          fadeAnim.setValue(1);
          resolve();
        });
      });
    },
    [animationEnabled, fadeAnim, slideAnim]
  );

  const fadeOut = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const fadeIn = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const years = useMemo(
    () =>
      Array.from(
        { length: maxYear - minYear + 1 },
        (_, index) => minYear + index
      ),
    [minYear, maxYear]
  );

  const loadMomentLocale = useCallback((localeCode: string) => {
    if (localeCode === "en") {
      return;
    }

    const localeLoader = localeRequires[localeCode];
    if (localeLoader) {
      try {
        localeLoader();
        console.log(`Loaded locale: ${localeCode}`);
      } catch (error) {
        console.warn(`Failed to load locale: ${localeCode}`, error);
        moment.locale("en");
      }
    } else {
      console.warn(`Locale not found: ${localeCode}`);
      moment.locale("en");
    }
  }, []);

  useEffect(() => {
  const initialMoment = moment(initialDate);
  setSelectedDate(initialMoment);
  setCurrentDate(initialMoment.clone().startOf("month"));
  updateMarkedDates(initialMoment);

  if (localeData) {
    const { abbr, calendar } = localeData;

    loadMomentLocale(abbr);
    moment.locale(abbr);

    LocaleConfig.locales[abbr] = {
      monthNames: calendar.monthNames,
      monthNamesShort: calendar.monthNamesShort,
      dayNames: calendar.dayNames,
      dayNamesShort: calendar.dayNamesShort,
    };
    LocaleConfig.defaultLocale = abbr;

    console.log(`Locale updated to: ${abbr}`);
  } else {
    moment.locale("en");
    LocaleConfig.defaultLocale = "default";
    console.log("Locale set to default: en");
  }

  setCalendarKey((prevKey) => prevKey + 1);
}, [initialDate, localeData, loadMomentLocale]);

  const jumpToSelectedDate = useCallback(() => {
    fadeOut();
    setTimeout(() => {
      setCurrentDate(selectedDate.clone().startOf("month"));
      updateMarkedDates(selectedDate);
      setCalendarKey((prevKey) => prevKey + 1);
      fadeIn();
    }, 30);
  }, [selectedDate, fadeOut, fadeIn]);

  const updateMarkedDates = useCallback(
    (date: Moment) => {
      const formattedDate = formatDate(date);
      setMarkedDates({
        [formattedDate]: { selected: true, selectedColor: colors.primary },
      });
    },
    [colors.primary]
  );

  const jumpToYear = useCallback(
    (year: number) => {
      const newDate = selectedDate.clone().year(year);
      if (newDate.isBetween(minMoment, maxMoment, "day", "[]")) {
        setSelectedDate(newDate);
        setCurrentDate(newDate.clone().startOf("month"));
        updateMarkedDates(newDate);
      }
      setYearPickerVisible(false);
    },
    [selectedDate, minMoment, maxMoment, updateMarkedDates]
  );

  const onPressArrow = useCallback(
    async (direction: "left" | "right") => {
      await animate(direction);
      setCurrentDate((prevDate) => {
        const newDate = prevDate
          .clone()
          .add(direction === "left" ? -1 : 1, "month")
          .startOf("month");
        return newDate;
      });
      setCalendarKey((prevKey) => prevKey + 1);
    },
    [animate]
  );

  const formatDate = useCallback((date: Moment): string => {
    return date.format("YYYY-MM-DD");
  }, []);

  const YearPicker = useCallback(
    () => (
      <Modal
        visible={isYearPickerVisible}
        transparent={true}
        animationType="fade"
      >
        <TouchableWithoutFeedback onPress={() => setYearPickerVisible(false)}>
          <View style={styles.yearPickerOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.yearPickerContainer}>
                <FlatList
                  data={years}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => jumpToYear(item)}
                      style={[
                        styles.yearItem,
                        item === currentDate.year() && styles.selectedYearItem,
                      ]}
                    >
                      <Text
                        style={[
                          styles.yearTextSelector,
                          { color: colors.text },
                          item === currentDate.year() && {
                            color: colors.primary,
                            fontWeight: "bold",
                          },
                        ]}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.toString()}
                  showsVerticalScrollIndicator={false}
                  initialScrollIndex={
                    years.findIndex((year) => year === currentDate.year()) - 3
                  }
                  getItemLayout={(data, index) => ({
                    length: 52,
                    offset: 52 * index,
                    index,
                  })}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    ),
    [isYearPickerVisible, years, currentDate, jumpToYear, styles, colors]
  );

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.datePickerContainer}>
          <CustomHeader
            selectedDate={selectedDate}
            currentDate={currentDate}
            onPressYear={() => setYearPickerVisible(true)}
            onPressDate={jumpToSelectedDate}
            localeData={localeData}
            headerFormat={headerFormat}
            styles={styles}
            colors={colors}
          />
          <View style={styles.calendarContainer}>
            <MonthYearSelector
              date={currentDate}
              onPressArrow={onPressArrow}
              localeData={localeData}
              animatedTextStyle={animatedTextStyle}
              monthYearFormat={monthYearFormat}
              styles={styles}
              colors={colors}
            />
            <Animated.View
              style={[
                styles.calendarWrapper,
                animationEnabled
                  ? {
                      opacity: fadeAnim,
                      transform: [{ translateX: slideAnim }],
                    }
                  : {},
              ]}
            >
              <Calendar
                key={calendarKey}
                locale={localeData?.abbr || "en"}
                current={formatDate(currentDate)}
                onMonthChange={(month) => {
                  setCurrentDate(moment(month.dateString).startOf("month"));
                }}
                onDayPress={(day) => {
                  const newSelectedDate = moment(day.dateString);
                  if (
                    newSelectedDate.isBetween(minMoment, maxMoment, "day", "[]")
                  ) {
                    setSelectedDate(newSelectedDate);
                    updateMarkedDates(newSelectedDate);
                  }
                }}
                markedDates={markedDates}
                hideArrows={true}
                hideExtraDays={false}
                enableSwipeMonths={true}
                disableMonthChange={false}
                firstDay={1}
                hideDayNames={false}
                showWeekNumbers={false}
                disableArrowLeft={true}
                onSwipeLeft={() => onPressArrow("right")}
                onSwipeRight={() => onPressArrow("left")}
                disableArrowRight={true}
                disableAllTouchEventsForDisabledDays={true}
                renderHeader={() => null}
                minDate={formatDate(minMoment)}
                maxDate={formatDate(maxMoment)}
                theme={{
                  backgroundColor: colors.background,
                  calendarBackground: colors.background,
                  textSectionTitleColor: colors.text,
                  selectedDayBackgroundColor: colors.primary,
                  selectedDayTextColor: colors.selectedText,
                  todayTextColor: colors.todayText,
                  dayTextColor: colors.dayText,
                  textDisabledColor: colors.disabledText,
                  dotColor: colors.dotColor,
                  selectedDotColor: colors.selectedDotColor,
                  arrowColor: colors.arrowColor,
                  monthTextColor: colors.monthTextColor,
                  indicatorColor: colors.indicatorColor,
                  textDayFontWeight: "300",
                  textMonthFontWeight: "bold",
                  textDayHeaderFontWeight: "300",
                  textDayFontSize: 16,
                  textMonthFontSize: 16,
                  textDayHeaderFontSize: 16,
                  textDayStyle: {
                    fontSize: 16,
                    fontWeight: "300",
                  },
                }}
              />
            </Animated.View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.button}>
              <Text style={[styles.buttonText, { color: colors.buttonText }]}>
                {cancelButton}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onDateChange(formatDate(selectedDate));
                onClose();
              }}
              style={styles.button}
            >
              <Text style={[styles.buttonText, { color: colors.buttonText }]}>
                {okButton}
              </Text>
            </TouchableOpacity>
          </View>
          <YearPicker />
        </View>
      </View>
    </Modal>
  );
};

export default DatePicker;
