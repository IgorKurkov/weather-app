'use strict';

var _selectors = require('./inc/_selectors.js');

var _render = require('./render.js');

var render = _interopRequireWildcard(_render);

var _request = require('./request.js');

var request = _interopRequireWildcard(_request);

var _listen = require('./listen.js');

var listen = _interopRequireWildcard(_listen);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

render.buildRecentCities();
listen.isInputPopulate(request, render); //init

window.onpopstate = function () {
  listen.isInputPopulate(request, render); //init
};