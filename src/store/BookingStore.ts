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
      a.datetime.isBefore(b.datetime) ? -1 : 1,
    );
  }

  @computed get pastBooking() {
    // сортировка booking выводит самые свежие записи с наименьшей датой
    // я хочу выводить прошедшие записи в обратном порядке
    // самая свяжая прошедшая запись === наибольшая дата
    return [...this.booking]
      .filter(({datetime}) => dayjs().isAfter(datetime))
      .reverse();
  }

  @computed get futureBooking() {
    return this.booking.filter(({datetime}) => dayjs().isBefore(datetime));
  }

  @action.bound addBooking(booking: IBooking) {
    this._booking.push(new Booking(booking));
  }

  @action.bound deleteBooking(bookingId: string) {
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
