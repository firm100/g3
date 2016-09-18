"use strict";
var path = require('path');
var models = require('../../../models');
var lib = require('../../../lib');
function getAppJS(g3Config) {
    var rel = '';
    if (g3Config.redux.store) {
        var storePath = path.resolve(g3Config._sourcePath, g3Config.redux.store);
        rel = lib.forwardSlash(path.relative(g3Config._g3Path, storePath));
    }
    else if (lib.isDirectory(path.resolve(g3Config._sourcePath, models.Const.DIR_LIB_REDUCERS))) {
        rel = './store';
    }
    if (rel) {
        return "import React from 'react';\n    import ReactDOM from 'react-dom';\n    import { Provider } from 'react-redux';\n    import {Router, " + g3Config.router.history + "} from 'react-router';\n    import routes from './routes';\n    import configureStore from '" + rel + "';\n    const store = configureStore();\n    ReactDOM.render(\n    <Provider store={store}>\n    <Router onUpdate={() => window.scrollTo(0, 0)} history={" + g3Config.router.history + "} routes={routes} />\n    </Provider>,\n    document.getElementById('" + models.Const.DOM_REACT_ROOT + "')\n    );";
    }
    else {
        return "import React from 'react';\nimport ReactDOM from 'react-dom';\nimport {Router, " + g3Config.router.history + "} from 'react-router';\nimport routes from './routes';\nReactDOM.render(\n  <Router onUpdate={() => window.scrollTo(0, 0)} history={" + g3Config.router.history + "} routes={routes} />,\n  document.getElementById('" + models.Const.DOM_REACT_ROOT + "')\n);";
    }
}
exports.getAppJS = getAppJS;
//# sourceMappingURL=index.js.map