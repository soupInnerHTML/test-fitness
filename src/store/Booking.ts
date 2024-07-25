import dayjs, {Dayjs} from 'dayjs';
import {BookingForm} from '../types/booking';
import {DATETIME_FORMAT} from '../constants/date';
import {v4 as uuidv4} from 'uuid';

export interface IBooking extends BookingForm {
  serviceId: number;
}

export class Booking implements IBooking {
  id: string;
  datetime: Dayjs;
  date: string;
  time: string;
  comment: string | undefined;
  name: string;
  phoneNumber: string;
  serviceId: number;

  constructor({date, time, comment, name, phoneNumber, serviceId}: IBooking) {
    this.id = uuidv4();
    this.datetime = dayjs(`${date} ${time}`, DATETIME_FORMAT);
    this.date = date;
    this.time = time;
    this.comment = comment;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.serviceId = serviceId;
  }
}
