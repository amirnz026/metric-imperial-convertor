const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
  test('should correctly read a whole number input', function () {
    let result = convertHandler.getNum('54lbs');
    assert.typeOf(result, 'number');
  });
  test('should correctly read a decimal number input', function () {
    let result = convertHandler.getNum('5.123lbs');
    assert.typeOf(result, 'number');
  });
  test('should correctly read a fractional input', function () {
    let result = convertHandler.getNum('34/123kg');
    assert.typeOf(result, 'number');
  });
  test('should correctly read a fractional input with a decimal', function () {
    let result = convertHandler.getNum('3234/123L');
    assert.typeOf(result, 'number');
  });
  test('should correctly return an error on a double-fraction', function () {
    let result = convertHandler.getNum('3/2/3mi');
    assert.typeOf(result, 'number');
  });
  test('should correctly default to a numerical input of 1 when no numerical input is provided', function () {
    let result = convertHandler.getNum('kg');
    assert.equal(result, 1);
  });
  test('should correctly read each valid input unit', function () {
    let result = convertHandler.getUnit('24.42kg');
    assert.include(['gal', 'L', 'mi', 'km', 'lbs', 'kg'], result);
  });
  test('should correctly return an error for an invalid input unit', function () {
    let result = convertHandler.getUnit('24.62lbss');
    assert.notInclude(['gal', 'L', 'mi', 'km', 'lbs', 'kg'], result);
  });
  test('should return the correct return unit for each valid input unit', function () {
    let result = convertHandler.getReturnUnit('2/3kg');
    assert.equal(result, 'lbs');
  });
  test('should correctly return the spelled-out string unit for each valid input unit.', function () {
    let result = convertHandler.spellOutUnit('km');
    assert.equal(result, 'kilometers');
  });
  test('should correctly convert gal to L', function () {
    let result = convertHandler.getReturnUnit('gal');
    assert.equal(result, 'L');
  });
  test('should correctly convert L to gal', function () {
    let result = convertHandler.getReturnUnit('L');
    assert.equal(result, 'gal');
  });
  test('should correctly convert mi to km', function () {
    let result = convertHandler.getReturnUnit('mi');
    assert.equal(result, 'km');
  });
  test('should correctly convert km to mi', function () {
    let result = convertHandler.getReturnUnit('km');
    assert.equal(result, 'mi');
  });
  test('should correctly convert lbs to kg', function () {
    let result = convertHandler.getReturnUnit('lbs');
    assert.equal(result, 'kg');
  });
  test('should correctly convert kg to lbs', function () {
    let result = convertHandler.getReturnUnit('kg');
    assert.equal(result, 'lbs');
  });
});
