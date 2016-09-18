import * as path from 'path'
import * as models from '../../../models'
import * as lib from '../../../lib'

export function getStoreJS(g3Config: models.G3Config): string {
  const reducersPath = path.resolve(g3Config._sourcePath, models.Const.DIR_LIB_REDUCERS)
  const rel = lib.forwardSlash(path.relative(g3Config._g3Path, reducersPath))

  return `import { applyMiddleware, createStore, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import {persistStore, autoRehydrate} from 'redux-persist'

import reducers from '${rel}'

export default function configureStore() {
  let store = null

  if (window['devToolsExtension']) {
    store = createStore(
      reducers,
      {},
      compose(
        applyMiddleware(thunkMiddleware, createLogger()),
        autoRehydrate(),
        window['devToolsExtension']()
      )
    );
  } else {
    store = createStore(
      reducers,
      applyMiddleware(thunkMiddleware, createLogger()),
      autoRehydrate()
    )
  }

  persistStore(store)

  return store
}
`
}
