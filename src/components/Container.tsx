import React, {FC, PropsWithChildren} from 'react';
import {View} from 'react-native';
import {commonStyles} from '../styles/commonStyles';
import {DEFAULT_INDENT} from '../constants/styles';

interface ContainerProps extends PropsWithChildren {
  horizontalOnly?: boolean;
}

export const Container: FC<ContainerProps> = ({children, horizontalOnly}) => {
  return (
    <View
      style={[
        commonStyles.container,
        {paddingVertical: horizontalOnly ? 0 : DEFAULT_INDENT},
      ]}>
      {children}
    </View>
  );
};
