/*!
 * angular-more v2.0.0 (https://github.com/BndyNet/angular-more#readme)
 * (c) 2014-2017 Bndy.Net (http://www.bndy.net)
 */

"use strict";

/*!
 * @param {object} ng-colors - e.x. [{key: 1, value: "#ff0000", description: "", css: "flag"}, ...]
 * @param {object} ng-model - type of key
 * @param {function} ng-change - fn(color)
 *
 * @example
 *   <bn-ui-colorpicker ng-colors="[{}, {}, ...]" ng-model="model" ng-change="changeColor(color)"></bn-ui-colorpicker>
 */
angular.module("bn.ui.colorpicker", []).directive("bnUiColorpicker", function() {
  return {
    restrict: "E",
    replace: true,
    scope: {
      ngColors: "=ngColors",
      ngModel: "=ngModel",
      onChange: "&ngChange"
    },
    template: '<span class="bn-ui-colorpicker dropdown">\n  <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" style="display: inline-block;">\n      <span class="empty" style="width: 1em; height: 1em; display: inline-block; vertical-align: text-top; border: solid 1px #dedede;" ng-show="ngModel == null || typeof(ngModel) == \'undefined\'"></span>\n      <span style="width: 1em; height: 1em; display: inline-block; vertical-align: text-top;" ng-style="{\'background-color\': color.value}" ng-class="color.css" ng-show="color.key == ngModel" ng-repeat="color in ngColors" title="{{color.description}}"></span>\n  </a>\n  <ul class="dropdown-menu" style="{{inline?\'padding:5px;\':\'\'}}">\n      <li ng-repeat="color in ngColors" style="{{inline?\'float:left;\':\'\'}}">\n          <a role="button" ng-click="onChange({color: color})" style="{{inline?\'padding:3px;\':\'\'}}">\n              <span style="width: 1em; height: 1em; display: inline-block; vertical-align: text-top;" ng-class="color.css" ng-style="{\'background-color\': color.value}"></span>\n              <span ng-bind="color.description"></span>\n          </a>\n      </li>\n  </ul>\n</span>',
    link: function(scope, ele, attrs) {
      var c, i, inline, len, ref;
      inline = true;
      ref = scope.ngColors;
      for (i = 0, len = ref.length; i < len; i++) {
        c = ref[i];
        if (c.description) {
          inline = false;
          break;
        }
      }
      scope.inline = inline;
    }
  };
});
