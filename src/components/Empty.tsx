import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {commonStyles} from '../styles/commonStyles';
import {Button} from './Button';
import {useNavigation} from '@react-navigation/native';

export const Empty: FC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.empty}>
      <Text style={commonStyles.title}>Тут пусто... Ну, а пока что!</Text>
      <Button onPress={() => navigation.goBack()}>Вернуться назад</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  empty: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    gap: 40,
  },
});
