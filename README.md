# react-native-flexi-datepicker

A highly customizable and flexible date picker component for React Native applications. This component provides a rich set of features and customization options to fit various design needs and use cases.

## Features

- Fully customizable theme and styles
- Year picker with smooth scrolling
- Custom locale support for internationalization
- Animated transitions for a polished user experience
- Configurable date range (min and max dates)
- Customizable header and button text
- Support for custom day marking
- Swipeable months
- Accessibility support

## Demo
<img src="https://github.com/sreedevi111/react-native-flexi-datepicker/blob/main/demo.gif?raw=true" alt="Demo" width="300"/>


## Installation

```bash
npm install react-native-flexi-datepicker
# or
yarn add react-native-flexi-datepicker
```

### Peer Dependencies

This package requires the following peer dependencies:

- `react (>= 17.0.0)`
- `react-native (>= 0.60.0)`
- `moment (>= 2.29.0)`
- `react-native-calendars (>= 1.1284.0)`

Make sure to install these in your project if they're not already present.

## Usage

Here's a basic example of how to use the `DatePicker` component:

```jsx
import React, { useState } from 'react';
import { View, Button } from 'react-native';
import DatePicker from 'react-native-flexi-datepicker';

const App = () => {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const showDatePicker = () => setDatePickerVisible(true);
  const hideDatePicker = () => setDatePickerVisible(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  return (
    <View>
      <Button title="Show Date Picker" onPress={showDatePicker} />
      <DatePicker
        isVisible={isDatePickerVisible}
        onClose={hideDatePicker}
        onDateChange={handleDateChange}
        initialDate={new Date()}
        minDate="2020-01-01"
        maxDate="2025-12-31"
        theme={{
          primary: '#007AFF',
          background: '#FFFFFF',
          text: '#000000',
        }}
      />
    </View>
  );
};

export default App;
```

## Props

Here's a detailed list of all available props for the `DatePicker` component:

| Prop            | Type                       | Default           | Description                                                                 |
|-----------------|----------------------------|-------------------|-----------------------------------------------------------------------------|
| isVisible       | boolean                    | -                 | Controls the visibility of the date picker.                                 |
| onClose         | function                   | -                 | Callback function when the date picker is closed.                           |
| onDateChange    | function                   | -                 | Callback function when a date is selected. Receives the selected date as a string in 'YYYY-MM-DD' format. |
| initialDate     | string \| Date \| Moment   | new Date()        | Initial date to display when the picker opens.                              |
| minDate         | string \| Date \| Moment   | '1900-01-01'      | Minimum selectable date.                                                    |
| maxDate         | string \| Date \| Moment   | '2700-12-31'      | Maximum selectable date.                                                    |
| localeData      | LocaleData                 | -                 | Custom locale data for internationalization.                                |
| cancelButton    | string                     | 'Cancel'          | Text for the cancel button.                                                 |
| okButton        | string                     | 'OK'              | Text for the OK button.                                                     |
| animationEnabled| boolean                    | true              | Enable/disable animations for month changes and transitions.                |
| theme           | Partial<ThemeColors>       | defaultTheme      | Custom theme colors.                                                        |
| headerFormat    | string                     | 'ddd, D MMM'      | Format for the header date display.                                         |
| monthYearFormat | string                     | 'MMMM YYYY'       | Format for the month and year display.                                      |
| customStyles    | object                     | -                 | Custom styles for various components of the date picker.                    |

## LocaleData Interface

```typescript
interface LocaleData {
  abbr: string;
  calendar: {
    monthNames: string[];
    monthNamesShort: string[];
    dayNames: string[];
    dayNamesShort: string[];
  };
}
```

## ThemeColors Interface

```typescript
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
```

## Customization

### Theme Customization

You can customize the appearance of the date picker by passing a theme object. Here's an example:

```jsx
<DatePicker
  // ... other props
  theme={{
    primary: '#007AFF',
    background: '#F2F2F7',
    text: '#1C1C1E',
    selectedText: '#FFFFFF',
    headerBackground: '#007AFF',
    yearText: '#FFFFFF',
    monthYearText: '#1C1C1E',
    buttonText: '#007AFF',
  }}
/>
```

### Custom Styles

For more granular control over the component's appearance, you can use the `customStyles` prop:

```jsx
<DatePicker
  // ... other props
  customStyles={{
    datePickerContainer: {
      borderRadius: 20,
    },
    headerContainer: {
      height: 100,
    },
    yearSelector: {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      padding: 10,
      borderRadius: 5,
    },
    // ... other custom styles
  }}
/>
```

### Localization

To use a custom locale, you can pass `localeData` prop:

```jsx
<DatePicker
  // ... other props
  localeData={{
    abbr: 'fr',
    calendar: {
      monthNames: ['Janvier', 'Février', 'Mars', ...],
      monthNamesShort: ['Jan', 'Fév', 'Mar', ...],
      dayNames: ['Dimanche', 'Lundi', 'Mardi', ...],
      dayNamesShort: ['Dim', 'Lun', 'Mar', ...],
    },
  }}
/>
```

## Performance Considerations

The component uses `useMemo` and `useCallback` hooks to optimize performance and prevent unnecessary re-renders. Animations can be disabled for performance-critical applications by setting `animationEnabled={false}`.


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## Acknowledgments

- Thanks to the `react-native-calendars` library for providing the base calendar component.
- Inspired by material design and iOS date pickers.
