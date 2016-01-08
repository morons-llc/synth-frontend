import '../css/master.sass'
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import PatchApp from './containers/patch_app'
import PatchAppReducer from './reducers'

let store = createStore(PatchAppReducer)
let appContainer = document.getElementById('app-container')

render(
  <Provider store={ store }>
    <PatchApp />
  </Provider>,
  appContainer
)
