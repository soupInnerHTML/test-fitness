import React, {FC, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import {useServicesStore} from '../hooks';
import debounce from 'lodash.debounce';
import {commonStyles} from '../styles/commonStyles';
import {Container} from './Container';

export const SearchServices: FC = observer(() => {
  const store = useServicesStore();
  const [search, setSearch] = useState(store.filter);

  function clearSearch() {
    setSearch('');
    store.setFilter('');
  }

  useEffect(() => {
    // задержка для оптимизации
    debounce(() => store.setFilter(search), 200)();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  return (
    <Container horizontalOnly>
      <TextInput
        placeholder={'Поиск...'}
        placeholderTextColor={'#000'}
        style={[
          styles.searchInput,
          store.searchError ? styles.searchInputError : null,
        ]}
        value={search}
        onChangeText={text => setSearch(text)}
      />
      {store.searchError && (
        <View style={styles.errorContainer}>
          <Text style={commonStyles.error}>Ничего не найдено</Text>
          <TouchableOpacity onPress={clearSearch}>
            <Text style={commonStyles.error}>Очистить</Text>
          </TouchableOpacity>
        </View>
      )}
    </Container>
  );
});

const styles = StyleSheet.create({
  searchInput: {
    borderBottomColor: 'rgba(0, 0, 0, .3)',
    borderBottomWidth: 1,
    height: 50,
  },
  searchInputError: {
    borderBottomColor: 'rgba(255, 0, 0, .3)',
    color: 'red',
  },
  errorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
