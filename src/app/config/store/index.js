"use strict";
var path = require('path');
var models = require('../../../models');
var lib = require('../../../lib');
function getStoreJS(g3Config) {
    var reducersPath = path.resolve(g3Config._sourcePath, models.Const.DIR_LIB_REDUCERS);
    var rel = lib.forwardSlash(path.relative(g3Config._g3Path, reducersPath));
    return "import { applyMiddleware, createStore, compose } from 'redux'\nimport thunkMiddleware from 'redux-thunk'\nimport createLogger from 'redux-logger'\nimport {persistStore, autoRehydrate} from 'redux-persist'\n\nimport reducers from '" + rel + "'\n\nexport default function configureStore() {\n  let store = null\n\n  if (window['devToolsExtension']) {\n    store = createStore(\n      reducers,\n      {},\n      compose(\n        applyMiddleware(thunkMiddleware, createLogger()),\n        autoRehydrate(),\n        window['devToolsExtension']()\n      )\n    );\n  } else {\n    store = createStore(\n      reducers,\n      applyMiddleware(thunkMiddleware, createLogger()),\n      autoRehydrate()\n    )\n  }\n\n  persistStore(store)\n\n  return store\n}\n";
}
exports.getStoreJS = getStoreJS;
//# sourceMappingURL=index.js.map