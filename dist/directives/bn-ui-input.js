"use strict";

/*!
 * Renders an form-group of bootstrap
 * 
 * @param {string} type - The type of textbox
 * @param {string} ng-model - The variable of angular
 * @param {bool} required - Required validation
 * @param {string} class - The style class 
 * @returns {string} Html string wrapped by form-group of bootstrap.
 * 
 * @example
 *   <bn-input type="email" ng-model="formModel.email" class="col-xs-4" required>
 *       <addon>
 *           <i class="fa fa-at"></i>
 *       </addon>
 *   </bn-input>
 */
angular.module("bnUi", []).directive("bnUiInput", [
  function() {
    return {
      restrict: "E",
      replace: true,
      transclude: true,
      scope: {
        ngModel: "=ngModel",
        label: "@label",
        addon: "@addon"
      },
      template: '<div class="bn-ui-input form-group">\n    <label ng-bind-html="label" ng-if="label"></label>\n    <div class="{{addon?\'input-group\':\'\'}}">\n        <input class="form-control" ng-model="ngModel" />\n        <div class="input-group-addon" ng-if="addon" ng-bind-html="addon"></div>\n    </div>\n</div>',
      controller: [
        "$scope", "$element", "$transclude", function($scope, $element, $transclude) {
          return $transclude(function(clone) {
            var addon, i, item, len;
            for (i = 0, len = clone.length; i < len; i++) {
              item = clone[i];
              if (item.tagName === "ADDON") {
                addon = item;
              }
            }
            if (addon) {
              $scope.addon = addon.innerHTML;
            }
          });
        }
      ],
      compile: function(ele, attrs, transcludeFn) {
        if (attrs.required === "" || attrs.required === "true") {
          ele.find("input").attr("required", true);
        }
        if (attrs.type) {
          return ele.find("input").attr("type", attrs.type);
        } else {
          return ele.find("input").attr("type", "text");
        }
      }
    };
  }
]);
