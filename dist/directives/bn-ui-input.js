/*!
 * angular-more v2.0.0 (https://github.com/BndyNet/angular-more#readme)
 * (c) 2014-2017 Bndy.Net (http://www.bndy.net)
 */

"use strict";

/*!
 * Renders an form-group of bootstrap
 * Requires: jQuery v2, moment.js
 * 
 * @param {string} type - The type of textbox
 * @param {string} ng-model - The variable of angular
 * @param {bool} required - Required validation
 * @param {string} class - The style class 
 * @returns {string} Html string wrapped by form-group of bootstrap.
 * 
 * @example
 *   <bn-input type="[date|datetime]" format="yyyy-MM-dd" ng-model="formModel.email" class="col-xs-4" required>
 *       <addon>
 *           <i class="fa fa-at"></i>
 *       </addon>
 *   </bn-input>
 */
angular.module("bnUi", ["ngSanitize", "ui.bootstrap.datetimepicker", "ui.dateTimeInput"]).directive("bnUiInput", [
  function() {
    return {
      restrict: "E",
      replace: true,
      transclude: true,
      require: "ngModel",
      scope: {
        ngModel: "=ngModel",
        label: "@label",
        addon: "@addon",
        type: "@type",
        format: "@format"
      },
      template: '<div class="bn-ui-input form-group">\n    <label ng-bind-html="label" ng-if="label"></label>\n    <div class="dropdown" ng-if="type==\'datetime\'||type==\'date\'">\n        <a class="dropdown-toggle" id="btn_{{tagId}}" role="button" data-toggle="dropdown" data-target="#" href="#">\n            <div class="input-group">\n                <input type="text" class="form-control" data-ng-model="ngModel" data-date-time-input="{{format}}" readonly>\n                <span class="input-group-addon">\n                    <i class="glyphicon glyphicon-calendar fa fa-calendar"></i>\n                </span>\n            </div>\n        </a>\n        <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">\n            <datetimepicker data-ng-model="ngModel" \n                data-on-set-time="onTimeSet(newDate, oldDate)"\n                data-datetimepicker-config="{ dropdownSelector: \'#btn_\' + tagId, startView:\'day\', minView: type==\'date\' ? \'day\' : \'minute\' }" />\n        </ul>\n    </div>\n    <div class="{{addon?\'input-group\':\'\'}}" ng-if="type!=\'datetime\'&&type!=\'date\'">\n        <input type="{{type}}" class="form-control" ng-model="ngModel" />\n        <div class="input-group-addon" ng-if="addon" ng-bind-html="addon"></div>\n    </div>\n</div>',
      controller: [
        "$scope", "$element", "$transclude", function($scope, $element, $transclude) {
          $scope.tagId = parseInt(Math.random() * 1000000);
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
          return ele.find("input").attr("required", true);
        }
      }
    };
  }
]);
