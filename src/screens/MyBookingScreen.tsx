import React, {FC, useCallback} from 'react';
import {ListRenderItem, StyleSheet, Text, View} from 'react-native';
import {useBookingStore, useServicesStore} from '../hooks';
import {commonStyles} from '../styles/commonStyles';
import dayjs from 'dayjs';
import {observer} from 'mobx-react-lite';
import {MyBookingScreenNavigationProps} from '../types/navigation';
import {Booking} from '../types/booking';
import {Empty} from '../components/Empty';
import {DEFAULT_INDENT} from '../constants/styles';
import {FlatList} from 'react-native-gesture-handler';

interface MyBookingScreenProps extends MyBookingScreenNavigationProps {}

export const MyBookingScreen: FC<MyBookingScreenProps> = observer(() => {
  const bookingStore = useBookingStore();
  const servicesStore = useServicesStore();

  const renderItem: ListRenderItem<Booking> = useCallback(
    ({item: {serviceId, time, name, phoneNumber, comment, date}}) => {
      const service = servicesStore.services.find(({id}) => id === serviceId)!;
      const formattedDate = dayjs(date, 'DD.MM.YYYY').format('DD MMM YYYY г.');
      return (
        <View style={commonStyles.card}>
          <Text style={[commonStyles.title, styles.title]}>{service.name}</Text>
          <View style={styles.service}>
            <Text>{service.description}</Text>
            <Text>{service.duration}</Text>
            <Text>{service.price}</Text>
          </View>
          <View style={styles.contacts}>
            <Text>
              {formattedDate} в {time}
            </Text>
            <Text>
              {name} {phoneNumber}
            </Text>
            <Text>{comment}</Text>
          </View>
        </View>
      );
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [servicesStore.services, bookingStore.booking],
  );

  if (bookingStore.booking.length) {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={commonStyles.container}
        data={bookingStore.booking}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    );
  }
  return <Empty />;
});

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
});
