import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid} from 'react-native';

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Access Required',
        message: 'This App needs to Access your location',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

var getPosition = function () {
  return new Promise(function (resolve, reject) {
    Geolocation.getCurrentPosition(
      position => {
        resolve(position);
      },
      error => {
        reject();
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  });
};

export {getPosition, requestLocationPermission};
