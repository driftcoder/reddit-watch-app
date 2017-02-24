import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore, compose} from 'redux';
import thunk from 'redux-thunk'

import Subreddit from 'containers/subreddit.js';
import getReducers from 'reducers/reducers.js';

const store = createStore(
  getReducers(),
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

render(
  <Provider store={store}>
    <Subreddit id="nintendoswitch"/>
  </Provider>,
  document.getElementById('app')
);
