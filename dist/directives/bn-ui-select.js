/*!
 * angular-more v2.0.0 (https://github.com/BndyNet/angular-more#readme)
 * (c) 2014-2017 Bndy.Net (http://www.bndy.net)
 */

"use strict";
angular.module("bn.ui.select", ["ngSanitize"]).directive("bnUiSelect", [
  function() {
    return {
      restrict: "E",
      replace: true,
      scope: {
        ngModel: "=ngModel",
        ngSource: "=ngSource",
        label: "@label"
      },
      template: '<div class="bn-ui-select form-group">\n    <label ng-bind-html="label" ng-if="label"></label>\n    <select ng-model="ngModel" class="form-control">\n        <option value="{{value}}" ng-bind="key" ng-repeat="(key, value) in ngSource"></option>\n    </select>\n</div>'
    };
  }
]);
