
import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '@/assets/styles/post.styles';
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { EventDateListProps } from '@/app/models/types';
import { COLORS } from '@/constants/colors';


const EventDateList: React.FC<EventDateListProps> = ({ eventDates, onChange }) => {
  //const [eventDates, setEventDates] = useState<EventDateType[]>([]);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [eventDate, setEventDate] = useState<Date>(new Date());;


  const formatHour = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowTimePicker(false);
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate)
      setEventDate(selectedDate);
      //console.log("eventDate: ", eventDate);
    }
  };

  // Add a new item to the list
  const addEventDate = () => {
    const updated = [...eventDates, eventDate ];
    //setEventDates(updated);
    setEventDate(new Date()); // Clear the input field
    onChange?.(updated);
  };

  // Remove an item from the list
  const removeEventDate = (toRemove: Date) => {
    const updated = eventDates.filter((item) => item !== toRemove)
    //setEventDates(updated);
    onChange?.(updated);
  };

  return (
    <View style={styles.formGroup}>
      <Text style={styles.label}>Date and time</Text>
      <View style={styles.dateTimeContainer}>
        <TouchableOpacity
          style={styles.dateTimeInputContainer2}
          onPress={() => { setShowDatePicker(true) }}
        >
          <Feather
            name='calendar'
            size={20}
            color={COLORS.textSecondary}
            style={styles.inputIcon} />
          <Text style={styles.checkboxLabel}>{eventDate.toLocaleDateString()}</Text>
          {showDatePicker &&
            <DateTimePicker
              mode="date"
              value={date}
              is24Hour={true}
              onChange={onDateChange}
            />}
        </TouchableOpacity>
        <TouchableOpacity style={styles.dateTimeInputContainer}
          onPress={() => { setShowTimePicker(true) }}>
          <Feather
            name='clock'
            size={20}
            color={COLORS.textSecondary}
            style={styles.inputIcon} />
          <Text style={styles.checkboxLabel}>{formatHour(eventDate)}</Text>
          {showTimePicker &&
            <DateTimePicker
              style={styles.dateTimeInput}
              value={date}
              mode="time"
              is24Hour={true}
              onChange={onDateChange}
            />}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.dateTimeInputContainerButton, { backgroundColor: eventDates?.length >= 5 ? COLORS.slateGrey : COLORS.primary }]}
          onPress={addEventDate}
          disabled={eventDates?.length >= 5}
        >
          <Feather
            name='plus-circle'
            size={20}
            color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <View style={{ marginVertical: 8 }}>
        {eventDates?.map((eventDate) => (
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
};

export default EventDateList;
