import {createReducer} from 'redux-act';

import {
  requestTeleport, receiveTeleport, requestTeleportFailed,
} from '@actions/TeleportActions';

const teleportReducer = createReducer({
  [requestTeleport]: (state) => Object.assign({}, state, {
    isFetching: true,
  }),
  [receiveTeleport]: (state, payload) => Object.assign({}, state, {
    isFetching: false,
    data: payload.json
  }),
  [requestTeleportFailed]: (state, payload) => Object.assign({}, state, {
    isFetching: false,
    error: payload.error
  })
}, {
  isFetching: false
});

export default teleportReducer;
