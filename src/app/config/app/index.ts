import * as path from 'path'
import * as models from '../../../models'
import * as lib from '../../../lib'

export function getAppJS(g3Config: models.G3Config): string {
  if (g3Config.redux && g3Config.redux.store) {
    const storePath = path.resolve(g3Config._sourcePath, g3Config.redux.store)
    const rel = lib.forwardSlash(path.relative(g3Config._g3Path, storePath))

    return `import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {Router, ${g3Config.router.history}} from 'react-router';
import routes from './routes';
import configureStore from '${rel}';
const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={${g3Config.router.history}} routes={routes} />
  </Provider>,
  document.getElementById('${models.Const.DOM_REACT_ROOT}')
);`
  } else {
    return `import React from 'react';
import ReactDOM from 'react-dom';
import {Router, ${g3Config.router.history}} from 'react-router';
import routes from './routes';
ReactDOM.render(
  <Router onUpdate={() => window.scrollTo(0, 0)} history={${g3Config.router.history}} routes={routes} />,
  document.getElementById('${models.Const.DOM_REACT_ROOT}')
);`
  }
}
