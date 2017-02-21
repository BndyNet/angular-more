/*!
 * angular-more v2.0.0 (https://github.com/BndyNet/angular-more#readme)
 * (c) 2014-2017 Bndy.Net (http://www.bndy.net)
 */

"use strict";
angular.module("bn.common", []).directive("bnFillHeight", [
  function() {
    return {
      restrict: "A",
      link: function(scope, ele, attrs) {
        ele.css("height", ele.parent().height());
        return console.debug(ele.html());
      }
    };
  }
]);
