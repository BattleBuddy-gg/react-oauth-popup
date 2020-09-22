"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OauthPopup = function (_React$PureComponent) {
  _inherits(OauthPopup, _React$PureComponent);

  function OauthPopup() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, OauthPopup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = OauthPopup.__proto__ || Object.getPrototypeOf(OauthPopup)).call.apply(_ref, [this].concat(args))), _this), _this.createPopup = function () {
      var _this$props = _this.props,
          url = _this$props.url,
          title = _this$props.title,
          width = _this$props.width,
          height = _this$props.height,
          onCode = _this$props.onCode;

      var left = window.screenX + (window.outerWidth - width) / 2;
      var top = window.screenY + (window.outerHeight - height) / 2.5;
      _this.externalWindow = window.open(url, title, "width=" + width + ",height=" + height + ",left=" + left + ",top=" + top);

      _this.codeCheck = setInterval(function () {
        try {
          var _params = new URL(_this.externalWindow.location).searchParams;
          var _code = _params.get("code");
          if (!_code) {
            return;
          }
          clearInterval(_this.codeCheck);
          clearInterval(_this.closeCheck);
          onCode(_code, _params);
          _this.externalWindow.close();
        } catch (e) {}
      }, 20);

      _this.closeCheck = setInterval(function () {
        if (_this.externalWindow.closed) {
          _this.props.onClose();
          clearInterval(_this.codeCheck);
          clearInterval(_this.closeCheck);
        }
      }, 20);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(OauthPopup, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { onClick: this.createPopup },
        " ",
        this.props.children,
        " "
      );
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.externalWindow) {
        this.externalWindow.close();
      }
    }
  }]);

  return OauthPopup;
}(React.PureComponent);

OauthPopup.defaultProps = {
  onClose: function onClose() {},
  width: 500,
  height: 500,
  url: "",
  title: ""
};
exports.default = OauthPopup;