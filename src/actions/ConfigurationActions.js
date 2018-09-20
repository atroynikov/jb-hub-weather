import {createAction} from 'redux-act';

export const initConfiguration = createAction('Init widget configuration');

export const enterConfigMode = createAction('Enter configuration mode');
export const enterConfigModeStarted = createAction('Started entering configuration mode');
export const enterConfigModeFinished = createAction('Finished entering configuration mode');
export const enterConfigModeFailed = createAction('Failed entering configuration mode');

export const exitConfigMode = createAction('Exit configuration mode');
export const exitConfigModeStarted = createAction('Started exiting configuration mode');
export const exitConfigModeFinished = createAction('Finished exiting configuration mode');
export const exitConfigModeFailed = createAction('Failed exiting configuration mode');

export const openConfiguration = createAction('Open widget configuration');
export const openConfigurationStarted = createAction('Started opening widget configuration');
export const openConfigurationFinished = createAction('Finished opening widget configuration');
export const openConfigurationFailed = createAction('Failed saving opening configuration');

export const saveConfiguration = createAction('Save widget configuration');
export const saveConfigurationStarted = createAction('Started saving widget configuration');
export const saveConfigurationFinished = createAction('Finished saving widget configuration');
export const saveConfigurationFailed = createAction('Failed saving widget configuration');