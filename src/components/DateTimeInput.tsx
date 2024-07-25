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
  const [open, setOpen] = useState(false);
  return (
    <View>
      <DatePicker
        mode={mode}
        minimumDate={new Date()}
        modal
        minuteInterval={30}
        open={open}
        date={new Date()}
        onConfirm={date => {
          setOpen(false);
          const parsedDate = dayjs(date).format(
            mode === 'time' ? TIME_FORMAT : DATE_FORMAT,
          );
          props.onChangeText?.(parsedDate);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <TextInputMask
        onFocus={e => {
          onFocus?.(e);
          setOpen(true);
        }}
        {...props}
      />
    </View>
  );
};
