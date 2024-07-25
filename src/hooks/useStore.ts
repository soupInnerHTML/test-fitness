import {StoreContext, stores} from '../constants/storeContext';
import {useContext} from 'react';
import {servicesStore} from '../store/ServicesStore';
import {bookingStore} from '../store/BookingStore';

export const useStores = () => {
  return useContext(StoreContext);
};
export function useStore<T>(storeKey: keyof typeof stores) {
  const storesCtx = useStores();
  return storesCtx[storeKey] as T;
}

export const useServicesStore = () =>
  useStore<typeof servicesStore>('services');

export const useBookingStore = () => useStore<typeof bookingStore>('booking');
