/*
 * @Project ..
 * @author zongquan.hzq
 * @description ..
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var __ = Symbol('__');

//Tail Calls cannot written with es6 arrow function
function factorial(_x3) {
  var _arguments = arguments;
  var _again = true;

  _function: while (_again) {
    var n = _x3;
    _again = false;
    var acc = _arguments.length <= 1 || _arguments[1] === undefined ? 1 : _arguments[1];

    if (n <= 1) return acc;

    _arguments = [_x3 = n - 1, n * acc];
    _again = true;
    acc = undefined;
    continue _function;
  }
}

function power(_x4, _x5) {
  var _arguments2 = arguments;
  var _again2 = true;

  _function2: while (_again2) {
    var num = _x4,
        n = _x5;
    _again2 = false;
    var acc = _arguments2.length <= 2 || _arguments2[2] === undefined ? 1 : _arguments2[2];

    if (num === __) {
      return function (num) {
        return power(num, n, acc);
      };
    }

    if (n === 0) {
      return acc;
    }

    if (!n) {
      return function (n) {
        return power(num, n, acc);
      };
    }

    _arguments2 = [_x4 = num, _x5 = n - 1, num * acc];
    _again2 = true;
    acc = undefined;
    continue _function2;
  }
}

var mapObj = function mapObj(mapFn, obj) {
  return Object.keys(obj).reduce(function (res, key, i) {
    return _extends({}, res, _defineProperty({}, key, mapFn(obj[key], i, key)));
  }, {});
};

var reduce = function reduce(reduceFn, initial, list) {
  if (list === undefined) {
    return function (list) {
      return reduce(reduceFn, initial, list);
    };
  }
  return list.reduce(reduceFn, initial);
};

var getBernsteinConst = function getBernsteinConst(i, n) {
  if (i === __) {
    return function (i) {
      return getBernsteinConst(i, n);
    };
  }

  if (!n) {
    return function (n) {
      return getBernsteinConst(i, n);
    };
  }

  return factorial(n) / factorial(i);
};

var getBernstein = function getBernstein(i, n) {
  return function (t) {
    return getBernsteinConst(i, n) * power(1 - t, n - i) * power(t, i);
  };
};

var multiPoint = function multiPoint(point, t) {
  var res = mapObj(function (num) {
    return num * t;
  }, point);
  return res;
};
var addPoints = reduce(function (res, point) {
  return {
    x: res.x + point.x,
    y: res.y + point.y
  };
}, { x: 0, y: 0 });

var Beta = function Beta(i, j) {
  return function (points, t) {
    if (t === __) return function (t) {
      return Beta(i, j)(points, t);
    };

    var n = points.length - 1;

    if (j === 0) {
      return points[i];
    }

    return addPoints([multiPoint(Beta(i, j - 1)(points, t), 1 - t), multiPoint(Beta(i + 1, j - 1)(points, t), t)]);
  };
};

var getBezierCurve = function getBezierCurve(points) {
  return Beta(0, points.length - 1)(points, __);
};

var getSubBezier = function getSubBezier(points, t) {
  var n = points.length - 1;

  var firstPoints = points.map(function (_, i) {
    return Beta(0, i)(points, t);
  });
  var secondPoints = points.map(function (_, i) {
    return Beta(i, n - i)(points, t);
  });

  return [firstPoints, secondPoints];
};

var API = {
  getSubBezier: getSubBezier,
  getBezierCurve: getBezierCurve,
  Beta: Beta,
  getBernstein: getBernstein
};

exports['default'] = API;
module.exports = exports['default'];