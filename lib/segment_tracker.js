'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _loader = require('./loader');

var _loader2 = _interopRequireDefault(_loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultOptions = {
  integrations: {
    'All': true
  }
};

function defaultOptionsMapper(options) {
  return options;
}

function extendProperties(properties) {
  return properties;
}

var SegmentTracker = function () {
  function SegmentTracker() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, SegmentTracker);

    var key = opts.key,
        _opts$mixinName = opts.mixinName,
        mixinName = _opts$mixinName === undefined ? '$segment' : _opts$mixinName,
        _opts$directiveName = opts.directiveName,
        directiveName = _opts$directiveName === undefined ? 'segment' : _opts$directiveName,
        _opts$propertiesMappe = opts.propertiesMapper,
        propertiesMapper = _opts$propertiesMappe === undefined ? extendProperties : _opts$propertiesMappe,
        _opts$optionsMapper = opts.optionsMapper,
        optionsMapper = _opts$optionsMapper === undefined ? defaultOptionsMapper : _opts$optionsMapper,
        _opts$options = opts.options,
        options = _opts$options === undefined ? defaultOptions : _opts$options,
        _opts$config = opts.config,
        config = _opts$config === undefined ? {} : _opts$config,
        _opts$routing = opts.routing,
        routing = _opts$routing === undefined ? {} : _opts$routing,
        store = opts.store;

    if (!key) {
      throw new Error('Segment key need to be set on install options.');
    }
    this.store = store;
    this.routing = routing;
    this.config = config;
    this.mixinName = mixinName;
    this.directiveName = directiveName;
    this.options = options;
    this.optionsMapper = optionsMapper.bind(this);
    this.propertiesMapper = propertiesMapper.bind(this);
    (0, _loader2.default)(key, this.options);
    window.analytics.debug(Boolean(this.options.debug));
    this.initVueRouterGuard();
  }

  _createClass(SegmentTracker, [{
    key: 'initVueRouterGuard',
    value: function initVueRouterGuard() {
      var _this = this;

      if (!this.routing.vueRouter) {
        return;
      }

      if (this.routing.ignoredViews) {
        this.routing.ignoredViews = this.routing.ignoredViews.map(function (view) {
          return view.toLowerCase();
        });
      }

      if (!this.routing.preferredProperty) {
        this.routing.preferredProperty = 'path';
      }

      this.routing.vueRouter.afterEach(function (to) {
        if (_this.routing.ignoredViews && _this.routing.ignoredViews.indexOf(to[_this.routing.preferredProperty].toLowerCase()) !== -1) {
          return;
        }
        _this.view(to.meta.analytics || to[_this.routing.preferredProperty], _this.routing.ignoredModules);
      });

      return this.routing.ignoredViews;
    }
  }, {
    key: 'extendProperties',
    value: function extendProperties(opts) {
      return this.optionsMapper(Object.assign({}, this.options, opts));
    }
  }, {
    key: 'click',
    value: function click(name, properties, options, cb) {
      return window.analytics.track('Click ' + name, this.propertiesMapper(properties), this.extendProperties(options), cb);
    }
  }, {
    key: 'view',
    value: function view(name, properties, options, cb) {
      return window.analytics.page(name, Object.assign({}, this.propertiesMapper(properties), this.extendProperties(options)), cb);
    }
  }, {
    key: 'fire',
    value: function fire(name, properties, options, cb) {
      return window.analytics.track(name, this.propertiesMapper(properties), this.extendProperties(options), cb);
    }
  }, {
    key: 'input',
    value: function input(name, properties, options, cb) {
      return window.analytics.track('Input ' + name, this.propertiesMapper(properties), this.extendProperties(options), cb);
    }
  }, {
    key: 'trackEvent',
    value: function trackEvent(name, properties, options, cb) {
      return window.analytics.track(name, this.propertiesMapper(properties), this.extendProperties(options), cb);
    }
  }, {
    key: 'identify',
    value: function identify(id, traits, options, cb) {
      return window.analytics.identify(id, this.propertiesMapper(traits), this.extendProperties(options), cb);
    }
  }, {
    key: 'group',
    value: function group(id, traits, options, cb) {
      return window.analytics.group(id, this.propertiesMapper(traits), this.extendProperties(options), cb);
    }
  }, {
    key: 'alias',
    value: function alias(id, traits, options, cb) {
      return window.analytics.alias(id, this.propertiesMapper(traits), this.extendProperties(options), cb);
    }
  }, {
    key: 'trackLink',
    value: function trackLink(element, name, properties, options, cb) {
      return window.analytics.trackLink(element, 'Click ' + name, this.propertiesMapper(properties), this.extendProperties(options), cb);
    }
  }, {
    key: 'setSuperProperties',
    value: function setSuperProperties(opts) {
      this.options = opts;
    }
  }]);

  return SegmentTracker;
}();

exports.default = SegmentTracker;
