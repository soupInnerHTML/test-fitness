import {ServiceCategory} from '../../../types/services';
import GroupImage from './group.jpg';
import PersonalImage from './personal.jpg';
import FightsImage from './fights.jpg';
import {ImageSourcePropType} from 'react-native';

export const serviceCategoriesImages: Record<
  ServiceCategory,
  ImageSourcePropType
> = {
  [ServiceCategory.group]: GroupImage,
  [ServiceCategory.personal]: PersonalImage,
  [ServiceCategory.fights]: FightsImage,
  [ServiceCategory.new]: GroupImage,
};
