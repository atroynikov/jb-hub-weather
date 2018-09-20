import { createReducer } from 'redux-act';

import {
    initConfiguration,
    enterConfigMode, enterConfigModeStarted, enterConfigModeFinished, enterConfigModeFailed,
    exitConfigMode, exitConfigModeStarted, exitConfigModeFailed, exitConfigModeFinished,
    saveConfiguration, saveConfigurationStarted, saveConfigurationFinished, saveConfigurationFailed
} from '../actions/ConfigurationActions';

const configurationReducer = createReducer({
    [initConfiguration]: (state, config) => ({
        scale: config.scale || 'C'
    }),

    [enterConfigMode]: (state) => ({
        ...state,
        configMode: false,
        isConfiguring: true
    }),
    [enterConfigModeStarted]: (state) => ({
        ...state,
        configMode: false,
        isConfiguring: true
    }),
    [enterConfigModeFinished]: (state) => ({
        ...state,
        configMode: true,
        isConfiguring: true
    }),
    [enterConfigModeFailed]: (state) => ({
        ...state,
        configMode: false,
        isConfiguring: true
    }),

    [exitConfigMode]: (state) => ({
        ...state,
        configMode: true,
        isConfiguring: false
    }),
    [exitConfigModeStarted]: (state) => ({
        ...state,
        configMode: true,
        isConfiguring: true
    }),
    [exitConfigModeFinished]: (state) => ({
        ...state,
        configMode: false,
        isConfiguring: true
    }),
    [exitConfigModeFailed]: (state) => ({
        ...state,
        configMode: true,
        isConfiguring: true
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
    configMode: false,
    isConfiguring: false
});

export default configurationReducer;