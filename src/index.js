/*
 * @Project ..
 * @author zongquan.hzq
 * @description ..
 */

const __ = Symbol('__');

//Tail Calls cannot written with es6 arrow function
function factorial(n, acc = 1) {
  if (n <= 1) return acc;

  return factorial(n - 1, n * acc);
}

function power(num , n, acc = 1) {
  if( num === __ ) { return num => power(num, n, acc) }

  if( n === 0 ) {
    return acc;
  }

  if(!n) { return n => power(num, n, acc) }

  return power(num, n - 1, num*acc)
}

const mapObj = (mapFn, obj) => {
  return Object.keys(obj).reduce((res, key, i) => {
    return {...res, [key]: mapFn(obj[key], i, key)}
  }, {});
}

const reduce = (reduceFn, initial, list) => {
  if(list === undefined) {
    return list => reduce(reduceFn, initial, list)
  }
  return list.reduce(reduceFn, initial);
}

const getBernsteinConst = (i, n) => {
  if(i === __) { return i => getBernsteinConst(i, n) }

  if(!n) { return n => getBernsteinConst(i, n) }

  return factorial(n) / factorial(i)
}

const getBernstein = (i, n) => {
  return function(t) {
    return getBernsteinConst(i, n) * power(1 - t, n - i) * power(t, i)
  }
}

const multiPoint = (point, t) => {
  const res = mapObj(num => num*t, point)
  return res;
}
const addPoints = reduce((res, point) => {
  return {
    x: res.x + point.x,
    y: res.y + point.y,
  }
}, {x: 0, y: 0})

const Beta = (i, j) => {
  return (points, t) => {
    if(t === __) return t => Beta(i, j)(points, t);

    const n = points.length - 1;

    if( j === 0 ) {
      return points[i]
    }

    return addPoints([
      multiPoint(
        Beta(i, j - 1)(points, t),
        1 - t
      ),
      multiPoint(
        Beta(i + 1, j - 1)(points, t),
        t
      )
    ])
  }
}

const getBezierCurve = points => Beta(0, points.length - 1)(points, __);

const getSubBezier = (points, t) => {
  const n = points.length - 1;

  const firstPoints = points.map((_, i) => Beta(0, i)(points, t));
  const secondPoints = points.map((_, i) => Beta(i, n - i)(points, t));

  return [firstPoints, secondPoints];
}

const API = {
  getSubBezier,
  getBezierCurve,
  Beta,
  getBernstein
}

export default API;
