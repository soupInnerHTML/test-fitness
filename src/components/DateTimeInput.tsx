import React, {FC, useState} from 'react';
import {View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {TextInputMask, TextInputMaskProps} from 'react-native-masked-text';
import dayjs from 'dayjs';
import {DATE_FORMAT, TIME_FORMAT} from '../constants/date';

interface DateTimeInputProps extends TextInputMaskProps {
  mode?: 'date' | 'time' | 'datetime';
}
export const DateTimeInput: FC<DateTimeInputProps> = ({
  onFocus,
  mode,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isTimeMode = mode === 'time';
  const [date, setDate] = useState(() => {
    if (isTimeMode) {
      const now = dayjs();
      const minutes = now.minute();
      const next30Minutes = now
        .add(30 - (minutes % 30), 'minute')
        .second(0)
        .millisecond(0);
      return next30Minutes.toDate();
    } else {
      return new Date();
    }
  });
  return (
    <View>
      <DatePicker
        mode={mode}
        minimumDate={date}
        modal
        minuteInterval={30}
        open={isOpen}
        date={date}
        onConfirm={newDate => {
          setDate(newDate);
          setIsOpen(false);
          const parsedDate = dayjs(newDate).format(
            isTimeMode ? TIME_FORMAT : DATE_FORMAT,
          );
          props.onChangeText?.(parsedDate);
        }}
        onCancel={() => {
          setIsOpen(false);
        }}
      />
      <TextInputMask
        onFocus={e => {
          onFocus?.(e);
          setIsOpen(true);
        }}
        {...props}
      />
    </View>
  );
};
