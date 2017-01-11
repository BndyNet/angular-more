"use strict";

/*!
 * angular filters about datetime
 * 
 * @required: moment.js
 */
angular.module("bnFilters", []).filter("appDate", function() {
  return function(input) {
    if (moment(input).isValid()) {
      if (moment.locale() === "zh-cn") {
        return moment(input).format("YYYY-M-D");
      }
      return moment(input).format("l");
    }
    return "";
  };
}).filter("appDateTime", function() {
  return function(input) {
    if (moment(input).isValid()) {
      if (moment.locale() === "zh-cn") {
        return moment(input).format("YYYY-M-D HH:mm:ss");
      }
      return moment(input).format("lll");
    }
    return "";
  };
}).filter("appFullDateTime", function() {
  return function(input) {
    if (moment(input).isValid()) {
      if (moment.locale() === "zh-cn") {
        return moment(input).format("llll");
      }
      return moment(input).format("llll");
    }
    return "";
  };
});
