import React, {useLayoutEffect} from 'react';
import {useServicesStore} from '../hooks';
import {observer} from 'mobx-react-lite';
import {ServicesScreenNavigationProps} from '../types/navigation';
import {SearchServices} from '../components/SearchServices';
import {ServicesList} from '../components/ServicesList';
import {Empty} from '../components/Empty';

interface ServicesScreenProps extends ServicesScreenNavigationProps {}

const ServicesScreen: React.FC<ServicesScreenProps> = observer(
  ({navigation}) => {
    const store = useServicesStore();
    useLayoutEffect(() => {
      navigation.setOptions({
        title: store.selectedCategory ?? 'Тренировки',
      });

      return () => {
        store.selectCategory(null);
      };
      //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigation, store.selectedCategory]);
    if (store.filteredServices.length || store.filter) {
      return (
        <>
          <SearchServices />
          <ServicesList />
        </>
      );
    }
    return <Empty />;
  },
);
export default ServicesScreen;
