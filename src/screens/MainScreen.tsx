import React, {FC} from 'react';
import {observer} from 'mobx-react-lite';
import {MainScreenNavigationProps} from '../types/navigation';
import {MyBookingCard} from '../components/MyBookingCard';
import {CategoriesList} from '../components/CategoriesList';

interface MainScreenProps extends MainScreenNavigationProps {}

export const MainScreen: FC<MainScreenProps> = observer(() => {
  return (
    <>
      <MyBookingCard />
      <CategoriesList />
    </>
  );
});
