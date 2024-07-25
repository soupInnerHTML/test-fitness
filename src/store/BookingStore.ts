import {action, computed, makeObservable, observable} from 'mobx';
import {Booking} from '../types/booking';
import {create, persist} from 'mobx-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import {DATE_FORMAT} from '../constants/date';

class BookingStore {
  @persist('list') @observable private _booking: Booking[] = [];

  @computed get booking() {
    return [...this._booking].sort((a, b) =>
      dayjs(a.date, DATE_FORMAT).isBefore(dayjs(b.date, DATE_FORMAT)) ? 1 : -1,
    );
  }

  @computed get pastBooking() {
    return this._booking.filter(
      item => !dayjs().isBefore(dayjs(item.date, DATE_FORMAT)),
    );
  }

  @computed get futureBooking() {
    return this._booking.filter(item =>
      dayjs().isBefore(dayjs(item.date, DATE_FORMAT)),
    );
  }

  @computed private get _lastBookingId(): number {
    return this._booking.length && this._booking[0].id;
  }

  @action.bound addBooking(booking: Omit<Booking, 'id'>) {
    this._booking.unshift({...booking, id: this._lastBookingId + 1});
  }
  @action.bound deleteBooking(bookingId: number) {
    this._booking = this._booking.filter(({id}) => bookingId !== id);
  }
  constructor() {
    makeObservable(this);
  }
}

const hydrate = create({storage: AsyncStorage, jsonify: true});
const bookingStore = new BookingStore();
hydrate('booking', bookingStore);

export {bookingStore};
