import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import ServicesScreen from './screens/ServicesScreen';
import BookingScreen from './screens/BookingScreen';
import {MainScreen} from './screens/MainScreen';
import {StoreContext, stores} from './constants/storeContext';
import {RootStackParamList} from './types/navigation';
import {ROUTES} from './constants/navigation';
import {MyBookingScreen} from './screens/MyBookingScreen';
import {SafeAreaView, useWindowDimensions} from 'react-native';
import {commonStyles} from './styles/commonStyles';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  const {width: screenWidth} = useWindowDimensions();
  return (
    <SafeAreaView style={commonStyles.full}>
      <StoreContext.Provider value={stores}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={ROUTES.MAIN}
            screenOptions={{
              ...TransitionPresets.SlideFromRightIOS,
              gestureEnabled: true,
              gestureResponseDistance: screenWidth,
              headerStyle: {
                elevation: 0,
                shadowColor: 'transparent',
                borderBottomWidth: 0,
              },
              headerTitleAlign: 'center',
              cardStyle: {
                backgroundColor: '#fff',
              },
            }}>
            <Stack.Screen
              name={ROUTES.MAIN}
              component={MainScreen}
              options={{title: 'Тренировки'}}
            />
            <Stack.Screen
              name={ROUTES.SERVICES}
              component={ServicesScreen}
              options={{title: 'Фитнес клуб'}}
            />
            <Stack.Screen
              name={ROUTES.BOOKING}
              component={BookingScreen}
              options={{title: 'Запись на тренировку'}}
            />
            <Stack.Screen
              name={ROUTES.MY_BOOKING}
              component={MyBookingScreen}
              options={{title: 'Мои записи'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </StoreContext.Provider>
    </SafeAreaView>
  );
};

export default App;
