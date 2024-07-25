import React, {FC, useMemo} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import dayjs from 'dayjs';
import {commonStyles} from '../styles/commonStyles';
import {DEFAULT_INDENT} from '../constants/styles';
import {useBookingStore, useServicesStore} from '../hooks';
import {observer} from 'mobx-react-lite';
import {Booking} from '../types/booking';
import {DATE_FORMAT} from '../constants/date';

export const BookingElement: FC<Booking> = observer(
  ({name, phoneNumber, comment, date, time, serviceId, id}) => {
    const {services} = useServicesStore();
    const service = useMemo(
      () => services.find(({id}) => id === serviceId)!,
      [serviceId, services],
    );
    const formattedDate = useMemo(
      () => dayjs(date, DATE_FORMAT).format('DD MMM YYYY г.'),
      [date],
    );
    const isPast = useMemo(
      () => dayjs(date, DATE_FORMAT).isBefore(dayjs()),
      [date],
    );
    const bookingStore = useBookingStore();
    function cancelOrDeleteBooking() {
      Alert.alert(
        'Подтверждение',
        `Вы уверены, что хотите ${isPast ? 'удалить' : 'отменить'} запись?`,
        [
          {
            text: 'Отмена',
            style: 'cancel',
          },
          {
            text: 'Да',
            onPress: () => bookingStore.deleteBooking(id),
          },
        ],
      );
    }
    return (
      <View style={commonStyles.card}>
        <Text style={[commonStyles.title, styles.title]}>{service.name}</Text>
        <View style={styles.service}>
          <Text>{service.description}</Text>
          <Text>
            {service.duration} / {service.price}
          </Text>
        </View>
        <View style={styles.contacts}>
          <Text>
            {formattedDate} в {time}
          </Text>
          <Text>
            {name} {phoneNumber}
          </Text>
          <Text>{comment}</Text>

          <TouchableOpacity onPress={cancelOrDeleteBooking}>
            <Text style={styles.delete}>{isPast ? 'Удалить' : 'Отменить'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  title: {
    color: '#000',
  },
  contacts: {
    marginTop: DEFAULT_INDENT,
  },
  service: {
    marginTop: DEFAULT_INDENT,
  },
  delete: {
    color: 'red',
  },
});
