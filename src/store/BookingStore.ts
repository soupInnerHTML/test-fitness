import {action, computed, makeObservable, observable} from 'mobx';
import {Booking} from '../types/booking';
import {create, persist} from 'mobx-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

class BookingStore {
  @persist('list') @observable booking: Booking[] = [];

  @computed private get _lastBookingId(): number {
    return this.booking.length && this.booking[this.booking.length - 1].id;
  }

  @action.bound addBooking(booking: Omit<Booking, 'id'>) {
    this.booking.push({...booking, id: this._lastBookingId + 1});
  }
  constructor() {
    makeObservable(this);
  }
}

const hydrate = create({storage: AsyncStorage, jsonify: true});
const bookingStore = new BookingStore();
hydrate('booking', bookingStore);

export {bookingStore};
