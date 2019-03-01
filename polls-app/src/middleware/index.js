
import thunk from 'redux-thunk';
import {applyMiddleware} from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

export default composeEnhancers(applyMiddleware(thunk))