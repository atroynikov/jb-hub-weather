import {createAction} from 'redux-act';

export const bootstrapWidget = createAction('Bootstrap widget');
export const bootstrapWidgetStarted = createAction('Started bootstrap widget');
export const bootstrapWidgetFinished = createAction('Finished bootstrap widget');
export const bootstrapWidgetFailed= createAction('Failed bootstrap widget');

export const refreshWidget = createAction('Refresh widget');
export const refreshWidgetStarted = createAction('Started refresh widget');
export const refreshWidgetFinished = createAction('Finished refresh widget');
export const refreshWidgetFailed = createAction('Filed refresh widget');