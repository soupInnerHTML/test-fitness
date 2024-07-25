import React from 'react';

export interface BookingForm {
  name: string;
  phoneNumber: string;
  date: string;
  time: string;
  comment?: string;
}

export interface BookingFormField {
  name: keyof BookingForm;
  placeholder: string;
  InputComponent: React.ElementType;
}
