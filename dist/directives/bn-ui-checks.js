/*!
 * angular-more v2.0.0 (https://github.com/BndyNet/angular-more#readme)
 * (c) 2014-2017 Bndy.Net (http://www.bndy.net)
 */

"use strict";
angular.module("bn.ui.checks", ["ngSanitize"]).directive("bnUiChecks", function() {
  return {
    restrict: "E",
    replace: true,
    scope: {
      model: "=ngModel",
      label: "@",
      source: "=",
      multiple: "=?",
      withIcon: "=?"
    },
    template: '<div class="bn-ui-checks form-group">\n    <label ng-bind-html="label" ng-if="label"></label>\n    <div>\n        <div class="btn-group">\n            <label class="btn btn-default" ng-repeat="(key, value) in source" \n                ng-class="{active: isExisted(value)}" ng-click="select(value)">\n\n                <i class="glyphicon fa fa-fw {{multiple?\'glyphicon-check fa-check-square-o\':\'glyphicon-ok fa-dot-circle-o\'}}" ng-show="isExisted(value) && showIcon()"></i>\n                <i class="glyphicon fa fa-fw {{multiple?\'glyphicon-unchecked fa-square-o\':\'fa-circle-o\'}}" ng-show="!isExisted(value) && showIcon()"></i>\n                <span ng-bind="key"></span>\n            </label>\n        </div>\n    </div>\n</div>',
    link: function(scope, ele, attrs) {
      if (!scope.model && scope.multiple) {
        scope.model = [];
      }
      if (typeof scope.multiple === "undefined") {
        scope.multiple = false;
      }
      if (typeof scope.withIcon === "undefined") {
        scope.withIcon = false;
      }
      scope.showIcon = function() {
        if (typeof scope.withIcon === "undefined") {
          return false;
        } else {
          return scope.withIcon;
        }
      };
      scope.isExisted = function(value) {
        if (typeof scope.model === "undefined") {
          return false;
        }
        if (scope.multiple) {
          return scope.model.indexOf(value) >= 0;
        } else {
          return value.toString() === scope.model.toString();
        }
      };
      return scope.select = function(value) {
        if (scope.multiple) {
          if (scope.model.indexOf(value) < 0) {
            return scope.model.push(value);
          } else {
            return scope.model.splice(scope.model.indexOf(value), 1);
          }
        } else {
          return scope.model = value;
        }
      };
    }
  };
});
