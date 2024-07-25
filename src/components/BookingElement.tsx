import React, {FC, useMemo} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import dayjs from 'dayjs';
import {commonStyles} from '../styles/commonStyles';
import {DEFAULT_INDENT} from '../constants/styles';
import {useBookingStore, useServicesStore} from '../hooks';
import {observer} from 'mobx-react-lite';
import {Booking} from '../store/Booking';

interface BookingElementProps extends Booking {}

export const BookingElement: FC<BookingElementProps> = observer(
  ({name, phoneNumber, comment, serviceId, id, datetime}) => {
    const {services} = useServicesStore();
    const service = useMemo(
      () => services.find(({id}) => id === serviceId)!,
      [serviceId, services],
    );
    const formattedDate = useMemo(
      () => datetime.format('DD MMM YYYY г. в HH:mm'),
      [datetime],
    );
    const isPast = useMemo(() => datetime.isBefore(dayjs()), [datetime]);
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
          <Text>{formattedDate}</Text>
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
