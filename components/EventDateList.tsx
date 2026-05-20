
import { Feather } from '@expo/vector-icons';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Platform, View, Text, TouchableOpacity } from 'react-native';
import styles from '@/assets/styles/post.styles';
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { EventDateListProps } from '@/app/models/types';
import { COLORS } from '@/constants/colors';

export type EventDateListRef = {
  closePickers: () => void;
};

const EventDateList = forwardRef<EventDateListRef, EventDateListProps>(({ eventDates, onChange }, ref) => {
  const selectedEventDates = eventDates ?? [];
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [eventDate, setEventDate] = useState<Date>(new Date());;


  const formatHour = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  const closePickers = () => {
    setShowDatePicker(false);
    setShowTimePicker(false);
  };

  useImperativeHandle(ref, () => ({
    closePickers,
  }));

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (event.type === 'dismissed' || !selectedDate) {
      return;
    }

    setEventDate((currentDate) => {
      const nextDate = new Date(currentDate);
      nextDate.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
      return nextDate;
    });
  };

  const onTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
    }

    if (event.type === 'dismissed' || !selectedTime) {
      return;
    }

    setEventDate((currentDate) => {
      const nextDate = new Date(currentDate);
      nextDate.setHours(selectedTime.getHours(), selectedTime.getMinutes(), 0, 0);
      return nextDate;
    });
  };

  const openDatePicker = () => {
    setShowTimePicker(false);
    setShowDatePicker(true);
  };

  const openTimePicker = () => {
    setShowDatePicker(false);
    setShowTimePicker(true);
  };

  // Add a new item to the list
  const addEventDate = () => {
    const updated = [...selectedEventDates, eventDate ];
    setEventDate(new Date()); // Clear the input field
    onChange?.(updated);
  };

  // Remove an item from the list
  const removeEventDate = (toRemove: Date) => {
    const updated = selectedEventDates.filter((item) => item !== toRemove)
    onChange?.(updated);
  };

  return (
    <View style={styles.formGroup}>
      <Text style={styles.label}>Date and time</Text>
      <View onTouchStart={(event) => event.stopPropagation()}>
        <View style={styles.dateTimeContainer}>
          <TouchableOpacity
            style={styles.dateTimeInputContainer2}
            onPress={openDatePicker}
          >
            <Feather
              name='calendar'
              size={18}
              color={COLORS.textLight}
              style={styles.inputIcon} />
            <Text style={styles.checkboxLabel}>{eventDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dateTimeInputContainer}
            onPress={openTimePicker}>
            <Feather
              name='clock'
              size={18}
              color={COLORS.textLight}
              style={styles.inputIcon} />
            <Text style={styles.checkboxLabel}>{formatHour(eventDate)}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.dateTimeInputContainerButton, { backgroundColor: selectedEventDates.length >= 5 ? COLORS.slateGrey : COLORS.primary }]}
            onPress={addEventDate}
            disabled={selectedEventDates.length >= 5}
          >
            <Feather
              name='plus-circle'
              size={22}
              color={COLORS.white} />
          </TouchableOpacity>
        </View>
        {showDatePicker &&
          <DateTimePicker
            mode="date"
            value={eventDate}
            is24Hour={true}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onDateChange}
          />}
        {showTimePicker &&
          <DateTimePicker
            style={styles.dateTimeInput}
            value={eventDate}
            mode="time"
            is24Hour={true}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onTimeChange}
          />}
      </View>
      <View style={{ marginVertical: 8 }}>
        {selectedEventDates.map((eventDate) => (
          <View style={[styles.dateTimeContainer, { marginBottom: 6 }]} key={eventDate.toString()}>
            <View
              style={styles.dateTimeInputContainer2}
            >
              <Text style={styles.checkboxLabel}>{eventDate.toLocaleDateString()}</Text>

            </View>
            <View style={styles.dateTimeInputContainer}
            >
              <Text style={styles.checkboxLabel}>{formatHour(eventDate)}</Text>
            </View>
            <TouchableOpacity
              style={[styles.dateTimeInputContainerButton, { backgroundColor: COLORS.red }]}
              onPress={() => removeEventDate(eventDate)}
            >
              <Feather
                name='minus-circle'
                size={20}
                color={COLORS.white} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
});

EventDateList.displayName = 'EventDateList';

export default EventDateList;
