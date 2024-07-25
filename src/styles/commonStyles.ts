import {StyleSheet} from 'react-native';

export const commonStyles = StyleSheet.create({
  full: {
    flex: 1,
  },
  card: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    color: '#000',
  },
  container: {
    padding: 20,
  },
});
