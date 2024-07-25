import React, {FC, useCallback, useMemo} from 'react';
import {
  DefaultSectionT,
  ListRenderItem,
  SectionList,
  SectionListData,
  StyleSheet,
  Text,
} from 'react-native';
import {useBookingStore} from '../hooks';
import {commonStyles} from '../styles/commonStyles';
import {observer} from 'mobx-react-lite';
import {MyBookingScreenNavigationProps} from '../types/navigation';
import {Booking} from '../store/Booking';
import {Empty} from '../components/Empty';
import {BookingElement} from '../components/BookingElement';
import {ScrollView} from 'react-native-gesture-handler';

interface MyBookingScreenProps extends MyBookingScreenNavigationProps {}

const renderItem: ListRenderItem<Booking> = ({item}) => (
  <BookingElement {...item} />
);

export const MyBookingScreen: FC<MyBookingScreenProps> = observer(() => {
  const bookingStore = useBookingStore();

  const sections: SectionListData<Booking, DefaultSectionT>[] = useMemo(
    () =>
      [
        {
          title: 'Вас ждет впереди✨',
          data: bookingStore.futureBooking,
        },

        {
          title: 'Прошедшие⏱️',
          data: bookingStore.pastBooking,
        },
      ].filter(({data}) => data.length),
    [bookingStore.futureBooking, bookingStore.pastBooking],
  );

  const renderSectionHeader = useCallback(
    ({
      section: {title},
    }: {
      section: SectionListData<Booking, DefaultSectionT>;
    }) => <Text style={[commonStyles.title, styles.title]}>{title}</Text>,
    [],
  );

  if (bookingStore.booking.length) {
    return (
      <SectionList
        stickySectionHeadersEnabled={false}
        renderScrollComponent={props => <ScrollView {...props} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={commonStyles.container}
        sections={sections}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={item => item.id}
      />
    );
  }
  return <Empty />;
});

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
  },
});
