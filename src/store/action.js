import firestore from '@react-native-firebase/firestore';
import {SIGN_IN_SUCCESS, CHANGE_STATUS_USER} from './types';
import {ToastAndroid} from 'react-native';
import {getPosition, requestLocationPermission} from '../utilities';

const sigInInSuccess = user => {
  return {
    type: SIGN_IN_SUCCESS,
    payload: user,
  };
};

const changeStatusUser = status => {
  return {
    type: CHANGE_STATUS_USER,
    payload: status,
  };
};

const getStatusUser = () => {
  return async (dispatch, getState) => {
    const ID = getState()?.user?.id;
    const query = firestore().collection('employs').doc(ID).collection('times');
    query.onSnapshot(
      querySnapshot => {
        const status = querySnapshot.size % 2 === 1 ? 'enter' : 'exit';
        dispatch(changeStatusUser(status));
      },
      err => {
        console.log(`Encountered error: ${err}`);
      },
    );
  };
};

const sendExitOrEnter = () => {
  return async (dispatch, getState) => {
    const ID = getState()?.user?.id;
    const permission = await requestLocationPermission();
    const position = permission && (await getPosition());

    const data = {
      time: Date.now(),
      location: {
        lat: position?.coords?.latitude || 1,
        lng: position?.coords?.longitude || 1,
      },
    };
    firestore().collection('employs').doc(ID).collection('times').add(data);
  };
};

const signIn = numberUser => {
  return async dispatch => {
    const employRef = firestore().collection('employs').doc(numberUser);
    const doc = await employRef.get();
    if (!doc.exists) {
      ToastAndroid.show('Login failed', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Sign In Success', ToastAndroid.SHORT);
      dispatch(sigInInSuccess({...doc.data(), id: doc.id}));
      dispatch(getStatusUser());
    }
  };
};

export {signIn, getStatusUser, sendExitOrEnter};
