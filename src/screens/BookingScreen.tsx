import React from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import {BookingScreenNavigationProps} from '../types/navigation';
import {Formik} from 'formik';
import {
  bookingForm,
  bookingFormInitialValues,
  BookingFormValidationSchema,
} from '../forms/bookingForm';
import {commonStyles} from '../styles/commonStyles';
import {useBookingStore} from '../hooks';
import {BookingForm} from '../types/booking';
import {ROUTES} from '../constants/navigation';
import {Container} from '../components/Container';
import {DEFAULT_INDENT} from '../constants/styles';
import {CommonActions} from '@react-navigation/native';
import {Button} from '../components/Button';

interface BookingScreenProps extends BookingScreenNavigationProps {}
const BookingScreen: React.FC<BookingScreenProps> = ({route, navigation}) => {
  const {service} = route.params!;
  const store = useBookingStore();

  const handleBooking = (values: BookingForm) => {
    store.addBooking({
      serviceId: service.id,
      ...values,
    });
    Alert.alert('Успешно', 'Вы записаны на занятие!');
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: ROUTES.MAIN}, {name: ROUTES.MY_BOOKING}],
      }),
    );
  };

  return (
    <Container>
      <ScrollView>
        <Text style={styles.fitnessClassName}>{service.name}</Text>
        <Text style={styles.fitnessClassDescription}>
          {service.description}
        </Text>
        <Text style={styles.fitnessClassDuration}>{service.duration}</Text>
        <Text style={styles.fitnessClassPrice}>{service.price}</Text>
        <Formik
          initialValues={bookingFormInitialValues}
          validationSchema={BookingFormValidationSchema}
          onSubmit={handleBooking}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              {bookingForm.map(({InputComponent, name, placeholder}) => {
                const error =
                  errors[name] && touched[name] ? errors[name] : null;
                return (
                  <View style={styles.inputContainer} key={name}>
                    <InputComponent
                      onChangeText={handleChange(name)}
                      onBlur={handleBlur(name)}
                      value={values[name]}
                      placeholder={placeholder}
                      style={[styles.input, error ? styles.errorInput : null]}
                    />
                    {error && (
                      <Text style={[commonStyles.error, styles.error]}>
                        {error}
                      </Text>
                    )}
                  </View>
                );
              })}
              <Button onPress={() => handleSubmit()}>Записаться</Button>
            </View>
          )}
        </Formik>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  fitnessClassName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  fitnessClassDescription: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
  fitnessClassDuration: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
  fitnessClassPrice: {
    fontSize: 18,
    color: '#444',
    marginBottom: DEFAULT_INDENT,
  },
  inputContainer: {
    marginBottom: DEFAULT_INDENT,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: DEFAULT_INDENT,
  },
  errorInput: {
    borderColor: 'red',
  },
  error: {
    marginTop: 3,
    marginLeft: 3,
  },
});

export default BookingScreen;
