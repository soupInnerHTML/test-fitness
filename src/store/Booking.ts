import dayjs, {Dayjs} from 'dayjs';
import {BookingForm} from '../types/booking';
import {DATETIME_FORMAT} from '../constants/date';

export interface IBooking extends BookingForm {
  serviceId: number;
  id: number;
}

export class Booking implements IBooking {
  id: number;
  datetime: Dayjs;
  date: string;
  time: string;
  comment: string | undefined;
  name: string;
  phoneNumber: string;
  serviceId: number;

  constructor({
    id,
    date,
    time,
    comment,
    name,
    phoneNumber,
    serviceId,
  }: IBooking) {
    this.id = id;
    this.datetime = dayjs(`${date} ${time}`, DATETIME_FORMAT);
    this.date = date;
    this.time = time;
    this.comment = comment;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.serviceId = serviceId;
  }
}
