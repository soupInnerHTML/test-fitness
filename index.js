/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import 'dayjs/locale/ru';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {enableScreens} from 'react-native-screens';
import 'react-native-get-random-values';

dayjs.locale('ru');
dayjs.extend(customParseFormat);
enableScreens();

AppRegistry.registerComponent(appName, () => App);
