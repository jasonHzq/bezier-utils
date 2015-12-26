require('babel/register');
var utils = require('../lib/');
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);
var expect = chai.expect;

var getSubBezier = utils.getSubBezier
  , getBezierCurve = utils.getBezierCurve
  , points = [{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 0}];

describe('getBezierCurve', function() {
  it('should be a symmetrical curve', function(){
    var curve = getBezierCurve(points)
    var diff = Math.abs(curve(0.3).y - curve(0.7).y);
    var spy = chai.spy(diff);

    expect(spy).to.below(0.000001);
  });
});


describe('getSubBezier', function() {
  it('should be a sub curve', function(){
    var curve = getBezierCurve(points)
    var subCurve = getBezierCurve(getSubBezier(points)[0])
    var diff = Math.abs(curve(0.3).y - subCurve(0.7).y);
    var spy = chai.spy(diff)

    expect(spy).to.below(0.000001);
  });
});
