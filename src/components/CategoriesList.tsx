import React, {FC, useCallback} from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {commonStyles} from '../styles/commonStyles';
import {serviceCategoriesImages} from '../assets/images/serviceCategories';
import {useServicesStore} from '../hooks';
import {ServiceCategory} from '../types/services';
import {ROUTES} from '../constants/navigation';
import {Empty} from './Empty';
import {useNavigation} from '@react-navigation/native';
import {DEFAULT_INDENT} from '../constants/styles';

export const CategoriesList: FC = () => {
  const services = useServicesStore();
  const navigation = useNavigation();
  const selectCategory = (category: ServiceCategory) => {
    services.selectCategory(category);
    navigation.navigate(ROUTES.SERVICES);
  };
  const renderItem: ListRenderItem<ServiceCategory> = useCallback(
    ({item: category}) => {
      return (
        <TouchableOpacity
          style={[commonStyles.card, styles.category]}
          onPress={() => selectCategory(category)}
          key={category}>
          <Text style={[commonStyles.title, styles.title]}>{category}</Text>
          <Image
            style={styles.image}
            source={serviceCategoriesImages[category]}
          />
        </TouchableOpacity>
      );
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [services.serviceCategories],
  );
  if (services.serviceCategories) {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={commonStyles.container}
        data={services.serviceCategories}
        renderItem={renderItem}
        keyExtractor={key => key}
      />
    );
  } else {
    return <Empty />;
  }
};

const styles = StyleSheet.create({
  image: {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    borderRadius: 10,
  },
  category: {
    height: 200,
    position: 'relative',
    padding: 0,
  },
  title: {
    zIndex: 2,
    color: '#fff',
    marginTop: 'auto',
    margin: DEFAULT_INDENT,
  },
});
