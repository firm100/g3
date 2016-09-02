"use strict";
var Const = (function () {
    function Const() {
    }
    Const.DIR_DOT_G3 = '.g3';
    Const.DIR_COMPONENTS = 'components';
    Const.DIR_CONTAINERS = 'containers';
    Const.DIR_LIB = 'lib';
    Const.DIR_STYLES = 'styles';
    Const.DIR_IMAGES = 'images';
    Const.FILE_G3_YML = 'g3.yml';
    Const.FILE_ROUTES_YML = 'routes.yml';
    Const.FILE_ROUTES_JS = 'routes.js';
    Const.FILE_APP = 'app';
    Const.FILE_INDEX = 'index';
    Const.FILE_LAYOUT = 'layout';
    Const.DOM_REACT_ROOT = 'root';
    Const.DEFAULT_TAG_NAMES = [
        'Link',
        'IndexLink'
    ];
    Const.DEFAULT_TAG_NAMES_LOWER = [
        'link',
        'indexlink'
    ];
    Const.DEFAULT_IMPORTS = "import React from 'react';\nimport { Link, IndexLink } from 'react-router';";
    Const.API_ACCESS_TOKEN = "X-Get3W-Access-Token";
    Const.API_USER = "X-Get3W-User";
    Const.API_HOST = "get3w.com";
    Const.API_DOMAIN = "http://api.get3w.com/";
    Const.HOME_DIR_NAME = ".g3";
    Const.HOME_CONFIG_NAME = "config.json";
    Const.STATUS_NOT_MODIFIED = 304;
    Const.STATUS_BAD_REQUEST = 400;
    Const.STATUS_UNAUTHORIZED = 401;
    Const.STATUS_PAYMENT_REQUIRED = 402;
    Const.STATUS_FORBIDDEN = 403;
    Const.STATUS_NOT_FOUND = 404;
    Const.STATUS_METHOD_NOT_ALLOWED = 405;
    Const.STATUS_NOT_ACCEPTABLE = 406;
    Const.STATUS_PROXY_AUTHENTICATION_REQUIRED = 407;
    Const.STATUS_REQUEST_TIMEOUT = 408;
    Const.STATUS_CONFLICT = 409;
    Const.STATUS_GONE = 410;
    Const.STATUS_LENGTH_REQUIRED = 411;
    Const.STATUS_INTERNAL_SERVER_ERROR = 500;
    Const.COMMAND_BUILD = 'build';
    Const.COMMAND_PARSE = 'parse';
    Const.COMMAND_RUN = 'run';
    Const.COMMAND_SERVE = 'serve';
    Const.COMMAND_STATUS = 'status';
    return Const;
}());
exports.Const = Const;
//# sourceMappingURL=const.js.map