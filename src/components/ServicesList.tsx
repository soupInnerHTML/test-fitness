import React, {FC, useCallback} from 'react';
import {ListRenderItem, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {commonStyles} from '../styles/commonStyles';
import {useServicesStore} from '../hooks';
import {Service} from '../types/services';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../constants/navigation';
import {FlatList} from 'react-native-gesture-handler';

export const ServicesList: FC = () => {
  const navigation = useNavigation();
  const store = useServicesStore();
  const renderItem: ListRenderItem<Service> = useCallback(
    ({item: service}) => {
      return (
        <TouchableOpacity
          style={commonStyles.card}
          onPress={() => navigation.navigate(ROUTES.BOOKING, {service})}>
          <Text style={styles.fitnessClassName}>{service.name}</Text>
          <Text style={styles.fitnessClassDescription}>
            {service.description}
          </Text>
          <Text style={styles.fitnessClassPrice}>{service.price}</Text>
        </TouchableOpacity>
      );
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [store.filteredServices],
  );
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={commonStyles.container}
      data={store.filteredServices}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  fitnessClassName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  fitnessClassDescription: {
    marginVertical: 10,
  },
  fitnessClassPrice: {
    fontSize: 16,
    color: '#888',
  },
});
