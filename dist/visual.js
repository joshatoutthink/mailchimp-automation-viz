// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../../../../../../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../../../../../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../../../../../../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"../stylesheets/visual-page.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../../../../../../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../javascripts/flip.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var getDelta = function getDelta(elOne, elTwo) {
  return {
    deltaX: elOne.left - elTwo.left,
    deltaY: elOne.top - elTwo.top,
    deltaW: elOne.width / elTwo.width,
    deltaH: elOne.height / elTwo.height
  };
};
/**
 *
 * @param {String} el class name of the element that will animate
 * @param {Function} stateChange the function which causes the elements to change size
 * @param {Number}  timing animation time in seconds: optional
 * @param {Boolean} scale wheather to animate scale: optional
 * @param {Boolean} translate wheather to animate translate: optional
 */


function flip(_ref) {
  var el = _ref.el,
      stateChange = _ref.stateChange,
      _ref$timing = _ref.timing,
      timing = _ref$timing === void 0 ? 0.3 : _ref$timing,
      _ref$scale = _ref.scale,
      scale = _ref$scale === void 0 ? true : _ref$scale,
      _ref$translate = _ref.translate,
      translate = _ref$translate === void 0 ? true : _ref$translate;

  //records the size and positon
  var firstBoxes = _toConsumableArray(document.querySelectorAll(el));

  var firstRects = firstBoxes.map(function (box) {
    var isScale = box.classList.contains("no-scale") ? false : true;
    var bg1 = box;
    if (bg1 === null) return;
    var firstRect = bg1.getBoundingClientRect();
    return {
      rect: firstRect,
      key: bg1.dataset.key,
      isScale: isScale
    };
  });
  console.log(firstRects); //changes the state causing layout change

  stateChange();
  requestAnimationFrame(function () {
    firstRects.forEach(function (_ref2) {
      var rect = _ref2.rect,
          key = _ref2.key,
          isScale = _ref2.isScale;
      var firstRect = rect,
          firstKey = key;
      var secondBox = document.querySelector("[data-key=\"".concat(firstKey, "\"]")); //records the second size and position
      //L.ast

      var secondRect = secondBox.getBoundingClientRect(); //I.nvert

      var _getDelta = getDelta(firstRect, secondRect),
          deltaX = _getDelta.deltaX,
          deltaY = _getDelta.deltaY,
          deltaW = _getDelta.deltaW,
          deltaH = _getDelta.deltaH; //sets second box as the firt box size and posistion


      secondBox.style.transition = "none";
      secondBox.style.transformOrigin = "center top";
      secondBox.style.transform = "\n      ".concat(translate ? "translate(".concat(deltaX, "px, ").concat(deltaY, "px)") : "", " \n      ").concat(isScale ? "scale(".concat(deltaW, ", ", 0, ")") : "", "\n      "); //P.lay

      requestAnimationFrame(function () {
        secondBox.style.transition = "transform ".concat(timing, "s ease");
        secondBox.style.transform = "none";
      });
    });
  });
}

var _default = flip;
exports.default = _default;
},{}],"../javascripts/visual-page.js":[function(require,module,exports) {
"use strict";

var _flip = _interopRequireDefault(require("./flip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

///////////////--///////////////////////////////
function widgetInit() {
  var widget = document.querySelector("#va-widget");
  var automations = document.querySelectorAll(".automation");

  var viewLinks = _toConsumableArray(automations).map(function (automation) {
    return automation.querySelector('[data-action="view"]');
  });
  /* state toggling funtions */
  //controls going from list and automation view


  function activateState(link) {
    var stateValue = typeof link === "string" ? link : link.closest(".automation").dataset.active ? "list" : link.dataset.show;
    (0, _flip.default)({
      el: "[data-key]",
      stateChange: function stateChange() {
        return widget.dataset.state = stateValue;
      }
    }); //removes all active attributes

    document.querySelectorAll("[data-active]").forEach(function (el) {
      return el.removeAttribute("data-active");
    }); //adds active attribute to automation which was clicked

    document.querySelectorAll("[data-show=\"".concat(stateValue, "\"]")).forEach(function (el) {
      return el.closest(".automation").setAttribute("data-active", true);
    });
  } //controls going from emails and stats view from with in the automation view


  function activateAutomationState(btn) {
    //toggles the dataset attr
    var automation = document.querySelector(".automation[data-active]");
    var automationState = automation.dataset.automationview === "emails" ? "stats" : "emails";
    automation.dataset.automationview = automationState; //changes the button text

    var btnText = automationState === "emails" ? "show automation stats" : "view automation emails";
    btn.innerText = btnText;
  }
  /* */

  /* eventListeners and small cosmetic functions */
  //toggles the state between list and the active automation


  viewLinks.forEach(function (link) {
    return link.addEventListener("click", function () {
      return activateState(link);
    });
  } //TODO scroll to container top
  ); //controls the state when go back button is clicked

  var back = widget.querySelectorAll(".back");
  back.forEach(function (back) {
    return back.addEventListener("click", function () {
      return activateState("list");
    });
  } //TODO scroll to container top
  ); //toggles the automation state

  var automationStateToggle = document.querySelectorAll(".toggle-automation-view");

  _toConsumableArray(automationStateToggle).forEach(function (toggler) {
    return toggler.addEventListener("click", function () {
      return activateAutomationState(toggler);
    });
  }); //gives the button initial text


  automations.forEach(function (automation) {
    var toggle = automation.querySelector(".toggle-automation-view");
    toggle.innerText = automation.getAttribute("data-automationView") === "emails" ? "show automation stats" : "view automation emails";
  }); ///creates a staggering effect for automation-emails && automation-stats

  var innerAutomations = document.querySelectorAll(".automation-emails, .automation-stats");
  innerAutomations.forEach(function (innerAutomation, i) {
    return _toConsumableArray(innerAutomation.querySelectorAll("li")).forEach(function (li, i) {
      li.style.setProperty("--delay", i);
    });
  });
}

window.addEventListener("load", function () {
  return widgetInit();
});
},{"./flip":"../javascripts/flip.js"}],"visual.js":[function(require,module,exports) {
"use strict";

require("../stylesheets/visual-page.scss");

require("../javascripts/visual-page");
},{"../stylesheets/visual-page.scss":"../stylesheets/visual-page.scss","../javascripts/visual-page":"../javascripts/visual-page.js"}],"../../../../../../../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50231" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","visual.js"], null)
//# sourceMappingURL=/visual.js.map