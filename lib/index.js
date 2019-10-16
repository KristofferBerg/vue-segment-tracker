'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.install = undefined;

var _segment_tracker = require('./segment_tracker');

var _segment_tracker2 = _interopRequireDefault(_segment_tracker);

var _directive = require('./directive');

var _directive2 = _interopRequireDefault(_directive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mixin(Vue, tracker) {
  Vue.prototype[tracker.mixinName] = tracker;
}

function install(Vue) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (opts.extend) {
    Object.assign(_segment_tracker2.default.prototype, opts.extend);
  }
  var tracker = new _segment_tracker2.default(opts);
  var directive = (0, _directive2.default)(tracker.mixinName);
  Vue.directive(tracker.directiveName, directive);
  mixin(Vue, tracker);
}

exports.install = install;