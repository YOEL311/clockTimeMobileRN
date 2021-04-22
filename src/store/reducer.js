import {SIGN_IN_SUCCESS, CHANGE_STATUS_USER} from './types';

const init = {
  user: null,
  statusUser: null,
};

function reducer(state = init, action) {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return {...state, user: action.payload};
    case CHANGE_STATUS_USER:
      return {...state, statusUser: action.payload};
    default:
      return state;
  }
}

export default reducer;
