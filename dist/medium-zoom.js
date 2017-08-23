/*!
 * medium-zoom v0.1.7
 * Medium zoom on your pictures in vanilla JavaScript
 * Copyright 2017 Francois Chalifour
 * https://github.com/francoischalifour/medium-zoom
 * Licensed under MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("mediumZoom", [], factory);
	else if(typeof exports === 'object')
		exports["mediumZoom"] = factory();
	else
		root["mediumZoom"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Adds a zoom effect on a selection of images when clicked.
 *
 * @param {(string|Object[])} [selector] The images to apply the zoom to
 * @param {number} [options.margin=0] Space outside the zoomed image
 * @param {string} [options.background="#fff"] The color of the overlay
 * @param {number} [options.scrollOffset=48] Number of pixels to scroll to dismiss the zoom
 * @param {boolean} [options.metaClick=true] Enables the action on meta click
 */
var mediumZoom = function mediumZoom(selector) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$margin = _ref.margin,
      margin = _ref$margin === undefined ? 0 : _ref$margin,
      _ref$background = _ref.background,
      background = _ref$background === undefined ? '#fff' : _ref$background,
      _ref$scrollOffset = _ref.scrollOffset,
      scrollOffset = _ref$scrollOffset === undefined ? 48 : _ref$scrollOffset,
      _ref$metaClick = _ref.metaClick,
      metaClick = _ref$metaClick === undefined ? true : _ref$metaClick,
      _ref$defaultTimeout = _ref.defaultTimeout,
      defaultTimeout = _ref$defaultTimeout === undefined ? 150 : _ref$defaultTimeout;

  var SUPPORTED_FORMATS = ['IMG'];
  var KEY_ESC = 27;
  var KEY_Q = 81;
  var CANCEL_KEYS = [KEY_ESC, KEY_Q];

  var isSupported = function isSupported(img) {
    return SUPPORTED_FORMATS.includes(img.tagName);
  };
  var isScaled = function isScaled(img) {
    return img.naturalWidth !== img.width;
  };
  var isListOrCollection = function isListOrCollection(selector) {
    return NodeList.prototype.isPrototypeOf(selector) || HTMLCollection.prototype.isPrototypeOf(selector);
  };
  var isNode = function isNode(selector) {
    return selector && selector.nodeType === 1;
  };

  var getImages = function getImages() {
    try {
      return Array.isArray(selector) ? selector.filter(isSupported) : isListOrCollection(selector) ? [].concat(_toConsumableArray(selector)).filter(isSupported) : isNode(selector) ? [selector].filter(isSupported) : typeof selector === 'string' ? [].concat(_toConsumableArray(document.querySelectorAll(selector))).filter(isSupported) : [].concat(_toConsumableArray(document.querySelectorAll(SUPPORTED_FORMATS.map(function (attr) {
        return attr.toLowerCase();
      }).join(',')))).filter(isScaled);
    } catch (err) {
      throw new TypeError('The provided selector is invalid.\n' + 'Expects a CSS selector, a Node element, a NodeList, an HTMLCollection or an array.\n' + 'See: https://github.com/francoischalifour/medium-zoom');
    }
  };

  var createOverlay = function createOverlay() {
    var overlay = document.createElement('div');
    overlay.classList.add('medium-zoom-overlay');
    overlay.style.backgroundColor = options.background;

    return overlay;
  };

  var zoom = function zoom() {
    if (!target) return;

    var event = new Event('show');
    target.dispatchEvent(event);

    scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    isAnimating = true;

    document.body.appendChild(overlay);

    requestAnimationFrame(function () {
      document.body.classList.add('medium-zoom--open');
    });

    target.classList.add('medium-zoom-image--open');

    target.addEventListener('transitionend', onZoomEnd);

    animateTarget();
  };

  var zoomOut = function zoomOut() {
    if (!target) return;

    var event = new Event('hide');
    target.dispatchEvent(event);

    setTimeout(function () {
      isAnimating = true;
      document.body.classList.remove('medium-zoom--open');
      target.style.transform = 'none';

      target.addEventListener('transitionend', onZoomOutEnd);
    }, options.defaultTimeout);
  };

  var triggerZoom = function triggerZoom(event) {
    if (!target) {
      target = event ? event.target : images[0];
      zoom();
    } else {
      zoomOut();
    }
  };

  var update = function update() {
    var newOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    options = _extends({}, options, newOptions);

    if (options.background) {
      overlay.style.backgroundColor = options.background;
    }

    return options;
  };

  var addEventListeners = function addEventListeners(type, listener) {
    images.forEach(function (image) {
      image.addEventListener(type, listener);
    });
  };

  var detach = function detach() {
    var doDetach = function doDetach() {
      var event = new Event('detach');

      images.forEach(function (image) {
        image.classList.remove('medium-zoom-image');
        image.removeEventListener('click', onClick);
        image.dispatchEvent(event);
      });

      if (target) {
        target.removeEventListener('transitionend', doDetach);
      }
    };

    if (!target) {
      doDetach();
    } else {
      zoomOut();
      target.addEventListener('transitionend', doDetach);
    }
  };

  var onClick = function onClick(event) {
    if (event.metaKey || event.ctrlKey) {
      if (options.metaClick) {
        return window.open(event.target.getAttribute('data-original') || event.target.parentNode.href || event.target.src, '_blank');
      }
    }

    event.preventDefault();

    triggerZoom(event);
  };

  var onZoomEnd = function onZoomEnd() {
    isAnimating = false;
    target.removeEventListener('transitionend', onZoomEnd);

    var event = new Event('shown');
    target.dispatchEvent(event);
  };

  var onZoomOutEnd = function onZoomOutEnd() {
    if (!target) return;

    document.body.removeChild(overlay);
    target.classList.remove('medium-zoom-image--open');

    isAnimating = false;
    target.removeEventListener('transitionend', onZoomOutEnd);

    var event = new Event('hidden');
    target.dispatchEvent(event);

    target = null;
  };

  var onScroll = function onScroll() {
    if (isAnimating || !target) return;

    var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;

    if (Math.abs(scrollTop - currentScroll) > options.scrollOffset) {
      zoomOut();
    }
  };

  var onDismiss = function onDismiss(event) {
    if (CANCEL_KEYS.includes(event.keyCode || event.which)) {
      zoomOut();
    }
  };

  var animateTarget = function animateTarget() {
    if (!target) return;

    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    var viewportWidth = windowWidth - options.margin * 2;
    var viewportHeight = windowHeight - options.margin * 2;

    var _target = target,
        width = _target.width,
        height = _target.height,
        _target$naturalWidth = _target.naturalWidth,
        naturalWidth = _target$naturalWidth === undefined ? +Infinity : _target$naturalWidth,
        _target$naturalHeight = _target.naturalHeight,
        naturalHeight = _target$naturalHeight === undefined ? +Infinity : _target$naturalHeight;

    var _target$getBoundingCl = target.getBoundingClientRect(),
        top = _target$getBoundingCl.top,
        left = _target$getBoundingCl.left;

    var isCenterAligned = Math.abs(windowWidth / 2 - (left + width / 2)) <= 10;

    var scaleX = Math.min(naturalWidth, viewportWidth) / width;
    var scaleY = Math.min(naturalHeight, viewportHeight) / height;
    var scale = Math.min(scaleX, scaleY) || 1;
    var translateX = isCenterAligned ? 0 : (-left + (viewportWidth - width) / 2 + options.margin) / scale;
    var translateY = (-top + (viewportHeight - height) / 2 + options.margin) / scale;

    target.style.transform = 'scale(' + scale + ') translate3d(' + translateX + 'px, ' + translateY + 'px, 0)';
  };

  var options = {
    margin: margin,
    background: background,
    scrollOffset: scrollOffset,
    metaClick: metaClick,
    defaultTimeout: defaultTimeout
  };

  if (selector instanceof Object) {
    options = _extends({}, options, selector);
  }

  var images = getImages(selector);
  var overlay = createOverlay();

  var target = null;
  var scrollTop = 0;
  var isAnimating = false;

  images.forEach(function (elem) {
    elem.classList.add('medium-zoom-image');
    elem.addEventListener('click', onClick);
  });
  overlay.addEventListener('click', zoomOut);
  document.addEventListener('scroll', onScroll);
  document.addEventListener('keyup', onDismiss);
  window.addEventListener('resize', zoomOut);

  return {
    show: triggerZoom,
    hide: zoomOut,
    toggle: triggerZoom,
    update: update,
    addEventListeners: addEventListeners,
    detach: detach,
    images: images,
    options: options
  };
};

module.exports = mediumZoom;

/***/ })
/******/ ]);
});
//# sourceMappingURL=medium-zoom.js.map