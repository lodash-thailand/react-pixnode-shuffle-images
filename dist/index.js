'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _jsxFileName = 'index.js';

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n  overflow:hidden;\n  position: relative;\n'], ['\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n  overflow:hidden;\n  position: relative;\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  opacity: ', ';\n  width: 100%;\n  height: 100%;\n  background-size: cover;\n  background-position: center center;\n  position: absolute;\n  top:0;\n  left:0;\n  backgroundImage: url(', ');\n'], ['\n  opacity: ', ';\n  width: 100%;\n  height: 100%;\n  background-size: cover;\n  background-position: center center;\n  position: absolute;\n  top:0;\n  left:0;\n  backgroundImage: url(', ');\n']);
/**
 * Owner: Rungsikorn Rungsikavanich
 * This component will shuffle image
 * and lazy load image
 */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _reactMotion = require('react-motion');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Container = _styledComponents2.default.div(_templateObject);
var ImageContainer = _styledComponents2.default.div(_templateObject2, function (props) {
  return props.opacity || 1;
}, function (props) {
  return props.imageURL;
});

var ShuffleImage = function (_React$Component) {
  (0, _inherits3.default)(ShuffleImage, _React$Component);

  function ShuffleImage(props) {
    (0, _classCallCheck3.default)(this, ShuffleImage);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ShuffleImage.__proto__ || (0, _getPrototypeOf2.default)(ShuffleImage)).call(this, props));

    _this.state = {
      index: 0,
      images: [props.images[0]]
    };
    _this._nextImage = _this._nextImage.bind(_this);
    _this._beginAnimate = _this._beginAnimate.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(ShuffleImage, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._nextImage();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.timeout);
    }
  }, {
    key: '_nextImage',
    value: function _nextImage() {
      var _this2 = this;

      if (this.props.images.length < 1) {
        return;
      }
      var nextIndex = this.state.index + 1;
      if (this.state.index >= this.props.images.length - 1) {
        nextIndex = 0;
      }
      if (!this.state.images[nextIndex]) {
        // lazy image reload
        var c = new Image(); // eslint-disable-line
        c.onload = function () {
          _this2._beginAnimate(nextIndex);
        };
        c.src = this.props.images[nextIndex];
      } else {
        this._beginAnimate(nextIndex);
      }
    }
  }, {
    key: '_beginAnimate',
    value: function _beginAnimate(nextIndex) {
      var _this3 = this;

      this.setState(function (prevState) {
        return {
          images: [].concat((0, _toConsumableArray3.default)(prevState.images), [_this3.props.images[nextIndex]]),
          index: nextIndex,
          prevIndex: prevState.index
        };
      });
      this.timeout = setTimeout(this._nextImage, Math.random() * 12000 + 4000);
    }
  }, {
    key: '_willLeave',
    value: function _willLeave() {
      return { opacity: (0, _reactMotion.spring)(0, { stiffness: 60, damping: 26 }) };
    }
  }, {
    key: '_willEnter',
    value: function _willEnter() {
      return { opacity: (0, _reactMotion.spring)(1, { stiffness: 60, damping: 26 }) };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      return _react2.default.createElement(
        Container,
        { style: this.props.style, __source: {
            fileName: _jsxFileName,
            lineNumber: 87
          }
        },
        _react2.default.createElement(
          _reactMotion.TransitionMotion,
          {
            willLeave: this._willLeave,
            _willEnter: this._willEnter,
            styles: this.props.images.map(function (image, i) {
              return {
                key: image,
                data: _this4.state.images[i],
                style: { opacity: _this4.state.index === i ? (0, _reactMotion.spring)(1, { stiffness: 60, damping: 26 }) : (0, _reactMotion.spring)(0, { stiffness: 60, damping: 26 }) }
              };
            }),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 88
            }
          },
          function (styles) {
            return _react2.default.createElement(
              'div',
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 100
                }
              },
              styles.map(function (config) {
                return _react2.default.createElement(ImageContainer, { style: config.style, key: config.key, imageURL: config.data, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 101
                  }
                });
              })
            );
          }
        )
      );
    }
  }]);
  return ShuffleImage;
}(_react2.default.Component);

exports.default = ShuffleImage;
