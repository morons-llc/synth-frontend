import '../css/master.sass';
import HelloBox from './hello-box';
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import PatchApp from './containers/patch_app';
import patchAppReducer from './reducers';

let store = createStore(patchAppReducer);
let appContainer = document.getElementById('app-container');

render(
  <Provider store={store}>
    <PatchApp />
  </Provider>,
  appContainer
);
