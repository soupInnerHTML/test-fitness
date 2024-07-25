import {TextInput} from 'react-native';
import React from 'react';
import {TextInputMask} from 'react-native-masked-text';
import {DateTimeInput} from '../components/DateTimeInput';
import * as yup from 'yup';
import {dateRegExp, phoneRegExp, timeRegExp} from '../constants/regexp';
import {BookingForm, BookingFormField} from '../types/booking';

export const bookingFormInitialValues: BookingForm = {
  name: '',
  phoneNumber: '',
  date: '',
  time: '',
  comment: '',
};

const requiredMessage = 'Это обязательное поле';

export const BookingFormValidationSchema: yup.Schema<
  typeof bookingFormInitialValues
> = yup.object().shape({
  name: yup.string().required(requiredMessage).min(2, 'Имя слишком короткое'),
  phoneNumber: yup
    .string()
    .required(requiredMessage)
    .matches(phoneRegExp, 'Неверный номер телефона'),
  date: yup
    .string()
    .required(requiredMessage)
    .matches(dateRegExp, 'Неверная дата'),
  time: yup
    .string()
    .required(requiredMessage)
    .matches(timeRegExp, 'Неверное время'),
  comment: yup.string(),
});

export const bookingForm: BookingFormField[] = [
  {
    name: 'name',
    placeholder: 'Ваше имя',
    InputComponent: TextInput,
  },
  {
    name: 'phoneNumber',
    placeholder: 'Номер телефона',
    InputComponent: props => (
      <TextInputMask
        type={'custom'}
        options={{
          mask: '+7 (999) 999-99-99',
        }}
        {...props}
      />
    ),
  },
  {
    name: 'date',
    placeholder: 'Дата',
    InputComponent: props => (
      <DateTimeInput
        type={'custom'}
        options={{
          mask: '99.99.9999',
        }}
        mode={'date'}
        placeholder={'Дата'}
        {...props}
      />
    ),
  },
  {
    name: 'time',
    placeholder: 'Время',
    InputComponent: props => (
      <DateTimeInput
        type={'custom'}
        options={{
          mask: '99:99',
        }}
        mode={'time'}
        {...props}
      />
    ),
  },
  {
    name: 'comment',
    InputComponent: TextInput,
    placeholder: 'Комментарий к записи',
  },
];
