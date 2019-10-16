'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (mixinName) {
  return {
    bind: function bind(el, binding, vnode) {
      var $segment = vnode.context[mixinName];
      var properties = _typeof(binding.value) === 'object' && binding.value.properties ? binding.value.properties : undefined;
      var options = _typeof(binding.value) === 'object' && binding.value.options ? binding.value.options : undefined;
      var name = _typeof(binding.value) === 'object' && binding.value.value ? binding.value.value : binding.value;

      if (binding.modifiers.view || binding.arg === 'view' || getPath(binding.value, 'modifiers.view')) {
        return $segment.view(name, properties, options);
      }

      if (binding.modifiers.click || binding.arg === 'click' || getPath(binding.value, 'modifiers.click')) {
        el.addEventListener('click', clickHandler($segment, name, properties, options));
        return;
      }

      if (binding.modifiers.input || binding.arg === 'input' || getPath(binding.value, 'modifiers.input')) {
        el.addEventListener('keyup', inputHandler($segment, name, properties, options));
        return;
      }

      $segment.trackEvent(name, properties, options);
    }
  };
};

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var getPath = function getPath(obj, path) {
  var defaultReturn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

  var _path$split = path.split('.'),
      _path$split2 = _toArray(_path$split),
      p = _path$split2[0],
      rest = _path$split2.slice(1);

  if (!obj[p]) {
    return defaultReturn;
  }
  return rest.length <= 0 ? obj[p] : getPath(obj[p], rest.join('.'));
};

var clickHandler = function clickHandler($segment) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return function () {
    return $segment.click.apply($segment, args);
  };
};
var inputHandler = function inputHandler($segment) {
  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  return function () {
    return $segment.input.apply($segment, args);
  };
};