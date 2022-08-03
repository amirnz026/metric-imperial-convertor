const REGEX = /([\d*[\/\.]*]*)([a-zA-Z]+)/;
const UNITS = ['lbs', 'kg', 'mi', 'km', 'gal', 'L'];

function ConvertHandler() {
  this.getNum = function (input) {
    try {
      let result = eval(REGEX.exec(input)[1]);
      if (!result) {
        result = 1;
      }
      return Number(result.toFixed(6));
    } catch (err) {
      return 'invalid number';
    }
  };

  this.getUnit = function (input) {
    let result = REGEX.exec(input)[2];
    if (UNITS.includes(result)) {
      return result;
    } else {
      return 'invalid unit';
    }
  };

  this.getReturnUnit = function (initUnit) {
    let result = this.getUnit(initUnit);
    switch (result) {
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
      case 'gal':
        result = 'L';
        break;
      case 'L':
        result = 'gal';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
      default:
        return 'invalid getReturnUnit';
    }

    return result;
  };

  this.spellOutUnit = function (unit) {
    let result = unit;
    switch (unit) {
      case 'kg':
        result = 'kilograms';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
      case 'gal':
        result = 'gallons';
        break;
      case 'L':
        result = 'liters';
        break;
      default:
        return 'invalid spellOutUnit';
    }

    return result;
  };

  this.convert = function (initNum, initUnit) {
    let result = '';
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    switch (initUnit) {
      case 'gal':
        result = (initNum * galToL).toFixed(5);
        break;
      case 'L':
        result = (initNum / galToL).toFixed(5);
        break;
      case 'lbs':
        result = (initNum * lbsToKg).toFixed(6);
        break;
      case 'kg':
        result = (initNum / lbsToKg).toFixed(6);
        break;
      case 'mi':
        result = (initNum * miToKm).toFixed(5);
        break;
      case 'km':
        result = (initNum / miToKm).toFixed(5);
        break;
      default:
        return 'invalid convert';
    }

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = {
      initNum,
      initUnit,
      returnNum: Number(returnNum),
      returnUnit,
      string: `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`,
    };
    return result;
  };
}

module.exports = ConvertHandler;
