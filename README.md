### bezier utils

calculate bezier curve using De Casteljau's algorithm. We can divide bezier curve to any sub curves by using bezier utils.

### API

```
/*
 * get bezier curve function
 * @return curve function: time (0 ~ 1) => point ({x, y})
 * @param control points, array
 * point is an object of shape {x, y}
*/
getBezierCurve

/*
 * get sub bezier curve control points
 * @return sub points, eg: [firstPoints, secondPoints]
 * @param control points of parent bezier curve, array
 * @param split time, float from 0 to 1
*/
getSubBezier

/eg:
const points = [{
    x: 0,
    y: 0
}, {
    x: 1,
    y: 1
}, {
    x: 2,
    y: 0
}]
const parentCurve = getBezierCurve(points);
const [firstPoints, secondPoints] = getSubBezier(points);

const firstSubCurve = getBezierCurve(firstPoints);
const secondSubCurve = getBezierCurve(secondPoints);

```
