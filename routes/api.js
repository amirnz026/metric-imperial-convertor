'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');
const express = require('express');
const router = express.Router();

const convertHandler = new ConvertHandler();

router.get('/convert', (req, res) => {
  const userQuery = req.query.input;
  const initNum = convertHandler.getNum(userQuery);
  const initUnit = convertHandler.getUnit(userQuery);
  const returnUnit = convertHandler.getReturnUnit(initUnit);
  const returnNum = convertHandler.convert(initNum, initUnit);
  if (initNum == 'invalid number' && initUnit == 'invalid unit') {
    return res.send('invalid number and unit');
  } else if (initNum == 'invalid number') {
    return res.send('invalid number');
  } else if (initUnit == 'invalid unit') {
    return res.send('invalid unit');
  } else {
    return res.json(
      convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
    );
  }
});

module.exports = {
  router: router,
  functionApp: function (app) {
    let convertHandler = new ConvertHandler();
  },
};
