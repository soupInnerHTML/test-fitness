import React, {useState} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
} from 'react-native';

interface FitnessClass {
  id: number;
  name: string;
  description: string;
  duration: string;
  price: string;
}

interface BookingScreenProps {
  route: any;
}

const BookingScreen: React.FC<BookingScreenProps> = ({route}) => {
  const {fitnessClass}: {fitnessClass: FitnessClass} = route.params;
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [comment, setComment] = useState('');

  const handleBooking = () => {
    if (name && phoneNumber && dateTime) {
      Alert.alert('Успешно', 'Вы записаны на занятие!');
    } else {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля формы.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.viewWrapper}>
          <Text style={styles.fitnessClassName}>{fitnessClass.name}</Text>
          <Text style={styles.fitnessClassDescription}>
            {fitnessClass.description}
          </Text>
          <Text style={styles.fitnessClassDuration}>
            {fitnessClass.duration}
          </Text>
          <Text style={styles.fitnessClassPrice}>{fitnessClass.price}</Text>
          <TextInput
            style={styles.input}
            placeholder="Ваше имя"
            value={name}
            onChangeText={text => setName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Номер телефона"
            value={phoneNumber}
            onChangeText={text => setPhoneNumber(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Дата и время"
            value={dateTime}
            onChangeText={text => setDateTime(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Комментарий к записи"
            value={comment}
            onChangeText={text => setComment(text)}
          />
          <TouchableOpacity style={styles.button} onPress={handleBooking}>
            <Text style={styles.buttonText}>Записаться</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  viewWrapper: {
    padding: 20,
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
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#6a5acd',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});

export default BookingScreen;
