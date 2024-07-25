import {StackScreenProps} from '@react-navigation/stack';
import {Service} from './services';
import {ROUTES} from '../constants/navigation';

export type RootStackParamList = {
  [ROUTES.MAIN]: undefined;
  [ROUTES.SERVICES]: undefined;
  [ROUTES.BOOKING]: {
    service: Service;
  };
  [ROUTES.MY_BOOKING]: undefined;
};

type ScreenNavigationProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type MainScreenNavigationProps = ScreenNavigationProps<ROUTES.MAIN>;
export type ServicesScreenNavigationProps =
  ScreenNavigationProps<ROUTES.SERVICES>;
export type BookingScreenNavigationProps =
  ScreenNavigationProps<ROUTES.BOOKING>;
export type MyBookingScreenNavigationProps =
  ScreenNavigationProps<ROUTES.MY_BOOKING>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
