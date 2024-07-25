import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {commonStyles} from '../styles/commonStyles';
import {ROUTES} from '../constants/navigation';
import {useBookingStore} from '../hooks';
import {observer} from 'mobx-react-lite';
import {Container} from './Container';
import {useNavigation} from '@react-navigation/native';
import {DEFAULT_INDENT} from '../constants/styles';

export const MyBookingCard: FC = observer(() => {
  const navigation = useNavigation();
  const booking = useBookingStore();
  return (
    <Container horizontalOnly>
      <TouchableOpacity
        style={[commonStyles.card, styles.booking]}
        onPress={() => navigation.navigate(ROUTES.MY_BOOKING)}>
        <Text>Мои записи</Text>
        {!!booking.booking.length && (
          <View style={styles.bookingIndicatorContainer}>
            <Text style={[commonStyles.title, styles.bookingIndicator]}>
              {booking.booking.length}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </Container>
  );
});

const styles = StyleSheet.create({
  booking: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
    marginTop: DEFAULT_INDENT,
  },
  bookingIndicatorContainer: {
    backgroundColor: 'rgba(255, 0, 0, .9)',
    width: 24,
    height: 24,
    borderRadius: 24,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookingIndicator: {
    fontSize: 13,
    color: '#fff',
  },
});
