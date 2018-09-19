import { createReducer } from 'redux-act';

import {
    initConfiguration, saveConfiguration,
    enterConfigMode, enterConfigModeStarted, enterConfigModeFinished, enterConfigModeFailed,
    exitConfigMode, exitConfigModeStarted, exitConfigModeFailed, exitConfigModeFinished
} from '../actions/ConfigurationActions';

const configurationReducer = createReducer({
    [initConfiguration]: (state, config) => ({
        scale: config.scale || 'C'
    }),
    [saveConfiguration]: (state) => ({
        ...state
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
    })
}, {
    configMode: false,
    isConfiguring: false
});

export default configurationReducer;