import {action, computed, makeObservable, observable} from 'mobx';
import {create, persist} from 'mobx-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import {Booking, IBooking} from './Booking';

class BookingStore {
  @persist('list')
  @observable
  private _booking: Booking[] = [];

  @computed get booking() {
    return [...this._booking].sort((a, b) =>
      a.datetime.isBefore(b.datetime) ? 1 : -1,
    );
  }

  @computed get pastBooking() {
    return this._booking.filter(({datetime}) => dayjs().isAfter(datetime));
  }

  @computed get futureBooking() {
    return this._booking.filter(({datetime}) => dayjs().isBefore(datetime));
  }

  @computed private get _lastBookingId(): number {
    return this._booking.length ? this._booking[0].id : 0;
  }

  @action.bound addBooking(booking: Omit<IBooking, 'id'>) {
    this._booking.unshift(
      new Booking({
        ...booking,
        id: this._lastBookingId + 1,
      }),
    );
  }

  @action.bound deleteBooking(bookingId: number) {
    this._booking = this._booking.filter(({id}) => bookingId !== id);
  }
  @action.bound mapHydrateBookings() {
    this._booking = this._booking.map(booking => new Booking(booking));
  }

  constructor() {
    makeObservable(this);
  }
}

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true,
});

const bookingStore = new BookingStore();
hydrate('booking', bookingStore).then(bookingStore.mapHydrateBookings);

export {bookingStore};
