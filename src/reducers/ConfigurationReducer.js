import { createReducer } from 'redux-act';

import {
    initConfiguration,
    enterConfigMode, enterConfigModeStarted, enterConfigModeFinished, enterConfigModeFailed,
    exitConfigMode, exitConfigModeStarted, exitConfigModeFailed, exitConfigModeFinished,
    saveConfiguration, saveConfigurationStarted, saveConfigurationFinished, saveConfigurationFailed
} from '@actions/ConfigurationActions';

const configurationReducer = createReducer({
    [initConfiguration]: (state, config) => ({
        scale: config.scale || 'C'
    }),

    [enterConfigMode]: (state) => ({
        ...state,
        configMode: false
    }),
    [enterConfigModeStarted]: (state) => ({
        ...state,
        configMode: false
    }),
    [enterConfigModeFinished]: (state) => ({
        ...state,
        configMode: true
    }),
    [enterConfigModeFailed]: (state) => ({
        ...state,
        configMode: false
    }),

    [exitConfigMode]: (state) => ({
        ...state,
        configMode: true
    }),
    [exitConfigModeStarted]: (state) => ({
        ...state,
        configMode: true
    }),
    [exitConfigModeFinished]: (state) => ({
        ...state,
        configMode: false
    }),
    [exitConfigModeFailed]: (state) => ({
        ...state,
        configMode: true
    }),

    [saveConfiguration]: (state, payload) => ({
        ...state,
        data: payload
    }),
    [saveConfigurationStarted]: (state, payload) => ({
        ...state
    }),
    [saveConfigurationFinished]: (state, payload) => ({
        ...state
    }),
    [saveConfigurationFailed]: (state, payload) => ({
        ...state
    }),
}, {
    configMode: false
});

export default configurationReducer;