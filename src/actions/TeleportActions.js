import {createAction} from 'redux-act';

export const fetchTeleport = createAction('Fetch teleport');
export const requestTeleport = createAction('Request teleport');
export const receiveTeleport = createAction('Receive teleport');
export const requestTeleportFailed = createAction('Request teleport failed');
