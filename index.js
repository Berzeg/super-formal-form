'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var PropTypes = _interopDefault(require('prop-types'));
var ChainReaction = _interopDefault(require('@super-formal/chain-reaction'));

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  return function () {
    var Super = _getPrototypeOf(Derived),
        result;

    if (_isNativeReflectConstruct()) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function identity(input) {
  return input;
}

var Form = /*#__PURE__*/function (_React$Component) {
  _inherits(Form, _React$Component);

  var _super = _createSuper(Form);

  function Form() {
    _classCallCheck(this, Form);

    return _super.apply(this, arguments);
  }

  _createClass(Form, [{
    key: "getPropsForSubComponent",
    value: function getPropsForSubComponent(id) {
      var adapter = this.props.adapters.hasOwnProperty(id) ? this.props.adapters[id] : identity;
      var state = this.props.state.hasOwnProperty(id) ? this.props.state[id] : {};
      var reactions = this.props.reactions.hasOwnProperty(id) ? this.props.reactions[id] : {};
      var reactionFunctions = {};

      for (var key in reactions) {
        reactionFunctions[key] = ChainReaction.resolve(reactions[key]).toFunction();
      }

      var adapterInput = {};
      Object.assign(adapterInput, state);
      Object.assign(adapterInput, reactionFunctions);
      return adapter(adapterInput);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var FormComponent = this.props.builders.hasOwnProperty(this.props.formID) ? this.props.builders[this.props.formID] : 'form';
      var formProps = this.getPropsForSubComponent(this.props.formID);
      return /*#__PURE__*/React.createElement(FormComponent, formProps, this.props.structure.map(function (item) {
        var Field = _this.props.builders[item.type];

        var fieldProps = _this.getPropsForSubComponent(item.id);

        return /*#__PURE__*/React.createElement(Field, _extends({
          key: item.id
        }, fieldProps));
      }));
    }
  }]);

  return Form;
}(React.Component);

Form.propTypes = {
  structure: PropTypes.array.isRequired,
  builders: PropTypes.object.isRequired,
  adapters: PropTypes.object,
  state: PropTypes.object,
  reactions: PropTypes.objectOf(ChainReaction),
  formID: PropTypes.string
};
Form.defaultProps = {
  formID: 'form'
};

module.exports = Form;
