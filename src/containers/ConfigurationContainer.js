import React from 'react';
import {connect} from 'react-redux';
import {
    compose, withState, setPropTypes, setDisplayName
} from 'recompose';

import ConfigurationComponent from '../components/ConfigurationComponent';
import {
    saveConfiguration, exitConfigMode
} from '../actions/ConfigurationActions';

const ConfigurationContainer = compose(
    withState('scale','setScale', 'C'),
    withState('source', 'setSource', 'geo'),
    connect(
        state => ({...state.configuration}),
        dispatch => ({
            save: (configuration) => dispatch(saveConfiguration(configuration)),
            cancel: () => dispatch(exitConfigMode())
        }),
        (stateProps, dispatchProps, ownProps) => ({
            ...stateProps,
            ...ownProps,
            onSave: () => dispatchProps.save({
                scale: ownProps.scale,
                source: ownProps.source
            }),
            onCancel: () => dispatchProps.cancel(),
        })
    ),
    setPropTypes({

    }),
    setDisplayName('ConfigurationContainer')
)(ConfigurationComponent);

export default ConfigurationContainer;