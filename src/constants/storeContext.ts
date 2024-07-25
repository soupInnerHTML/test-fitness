import {createContext} from 'react';
import {servicesStore} from '../store/ServicesStore';
import {bookingStore} from '../store/BookingStore';

export const stores = {
  services: servicesStore,
  booking: bookingStore,
};
export const StoreContext = createContext(stores);
