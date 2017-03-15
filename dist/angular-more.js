/*!
 * angular-more v2.0.0 (https://github.com/BndyNet/angular-more#readme)
 * (c) 2014-2017 Bndy.Net (http://www.bndy.net)
 */

"use strict";
angular.module("bn.ui", ["ngSanitize", "ui.bootstrap.datetimepicker", "ui.dateTimeInput"]);


/*!
 * angular filters about datetime
 * 
 * @required: moment.js
 */
angular.module("bn.ui").filter("appDate", function() {
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


/*!
 * Radio or Check Buttons
 *
 * @param {object} ng-model
 * @param {string} label - The label
 * @param {object} source - {"text1": "value", "text2": "value", ...}
 * @param {boolean} multiple - Optional, default false
 * @param {boolean} withIcon - Optional, default false
 * @param {boolean} showButton - Optional, default false
 *
 */
angular.module("bn.ui").directive("bnUiChecks", function() {
  return {
    restrict: "E",
    replace: true,
    scope: {
      model: "=ngModel",
      label: "@",
      source: "=",
      multiple: "=?",
      withIcon: "=?",
      showButton: "=?"
    },
    template: '<div class="bn-ui-checks form-group">\n    <label ng-bind-html="label" ng-if="label"></label>\n    <div>\n        <div class="{{showButton ? \'btn-group\' : \'form-control-static\'}}">\n            <label ng-class="{\'btn btn-default\': showButton, \'active\': showButton && isExisted(value)}" ng-repeat="(key, value) in source"\n                ng-class="{active: isExisted(value)}" ng-click="select(value)">\n\n                <i class="glyphicon fa fa-fw {{multiple?\'glyphicon-check fa-check-square-o\':\'glyphicon-ok fa-dot-circle-o\'}}" ng-show="isExisted(value) && showIcon()"></i>\n                <i class="glyphicon fa fa-fw {{multiple?\'glyphicon-unchecked fa-square-o\':\'fa-circle-o\'}}" ng-show="!isExisted(value) && showIcon()"></i>\n                <span ng-bind="key"></span>\n            </label>\n        </div>\n    </div>\n</div>',
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


/*!
 * Renders a color-picker control
 *
 * @param {object} ng-colors - e.x. [{key: 1, value: "#ff0000", description: "", css: "flag"}, ...]
 * @param {object} ng-model - type of key
 * @param {function} ng-change - fn(color)
 *
 * @example
 *   <bn-ui-colorpicker ng-colors="[{}, {}, ...]" ng-model="model" ng-change="changeColor(color)"></bn-ui-colorpicker>
 */
angular.module("bn.ui").directive("bnUiColorpicker", function() {
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
angular.module("bn.ui").directive("bnUiInput", [
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


/*!
 * Renders pagination
 *
 * @param {object} ng-model - {recordCount, pageSize, currentPage}
 * @param {function} on-page - function(currentPage) { // here to get data; }
 *
 */
angular.module("bn.ui").directive("bnUiPager", function() {
  return {
    restrict: "E",
    template: '<div class="bn-ui-pager" ng-show="model.recordCount > 0">\n    <div class="summary" ng-show="showSummary">\n        <span ng-bind="(model.currentPage - 1) * model.pageSize + 1"></span>\n        - <span ng-bind="model.currentPage * model.pageSize > model.recordCount ? model.recordCount : model.currentPage * model.pageSize"></span>\n        / <span ng-bind="model.recordCount"></span>\n    </div>\n    <nav aria-label="Page navigation">\n      <ul class="pagination" ng-show="model.pageCount > 1">\n        <li ng-class="{disabled: model.currentPage == 1}">\n          <a href="#" aria-label="Previous" ng-click="page(model.currentPage-1)">\n            <span aria-hidden="true">&laquo;</span>\n          </a>\n        </li>\n        <li ng-repeat="p in model.displayPageNumbers track by $index" ng-class="{active: model.currentPage == p, disabled: p < 0}">\n          <a href="#" ng-show="p > 0" ng-click="page(p)"><span ng-bind="p"></span></a>\n          <a href="#" ng-show="p < 0">...</a>\n        </li>\n        <li ng-class="{disabled: model.currentPage == model.pageCount}">\n          <a href="#" aria-label="Next" ng-click="page(model.currentPage+1)">\n            <span aria-hidden="true">&raquo;</span>\n          </a>\n        </li>\n      </ul>\n    </nav>\n</div>',
    replace: true,
    scope: {
      model: "=ngModel",
      onPage: "&onPage"
    },
    link: function(scope, ele, attrs) {
      if (typeof scope.model === "undefined") {
        scope.model = {};
      }
      scope.showSummary = typeof attrs["showSummary"] !== "undefined" ? attrs["showSummary"] === "true" : true;
      if (typeof scope.model.pageCount === "undefined") {
        scope.model.pageCount = Math.ceil(scope.model.recordCount / scope.model.pageSize);
      }
      scope.computePageNumbers = function() {
        var i, j, k, l, len, len1, m, n, o, p, q, ref, ref1, ref10, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9;
        if (scope.needComputePageNumber || typeof scope.model.displayPageNumbers === "undefined") {
          scope.model.displayPageNumbers = [];
          scope.needComputePageNumber = true;
          if (scope.model.pageCount <= 10) {
            for (p = i = 1, ref = scope.model.pageCount; 1 <= ref ? i <= ref : i >= ref; p = 1 <= ref ? ++i : --i) {
              scope.model.displayPageNumbers.push(p);
            }
          } else {
            if (scope.model.currentPage <= 5) {
              for (p = j = 1; j <= 7; p = ++j) {
                scope.model.displayPageNumbers.push(p);
              }
              scope.model.displayPageNumbers.push(-1);
              for (p = k = ref1 = scope.model.pageCount - 1, ref2 = scope.model.pageCount; ref1 <= ref2 ? k <= ref2 : k >= ref2; p = ref1 <= ref2 ? ++k : --k) {
                scope.model.displayPageNumbers.push(p);
              }
            } else if (scope.model.currentPage > scope.model.pageCount - 5) {
              ref3 = [1, 2];
              for (l = 0, len = ref3.length; l < len; l++) {
                p = ref3[l];
                scope.model.displayPageNumbers.push(p);
              }
              scope.model.displayPageNumbers.push(-1);
              for (p = m = ref4 = scope.model.pageCount - 6, ref5 = scope.model.pageCount; ref4 <= ref5 ? m <= ref5 : m >= ref5; p = ref4 <= ref5 ? ++m : --m) {
                scope.model.displayPageNumbers.push(p);
              }
            } else {
              ref6 = [1, 2];
              for (n = 0, len1 = ref6.length; n < len1; n++) {
                p = ref6[n];
                scope.model.displayPageNumbers.push(p);
              }
              scope.model.displayPageNumbers.push(-1);
              for (p = o = ref7 = scope.model.currentPage - 2, ref8 = scope.model.currentPage + 2; ref7 <= ref8 ? o <= ref8 : o >= ref8; p = ref7 <= ref8 ? ++o : --o) {
                scope.model.displayPageNumbers.push(p);
              }
              scope.model.displayPageNumbers.push(-1);
              for (p = q = ref9 = scope.model.pageCount - 1, ref10 = scope.model.pageCount; ref9 <= ref10 ? q <= ref10 : q >= ref10; p = ref9 <= ref10 ? ++q : --q) {
                scope.model.displayPageNumbers.push(p);
              }
            }
          }
        }
      };
      scope.page = function(p) {
        if (p <= 0) {
          p = 1;
        }
        if (p > scope.model.pageCount) {
          p = scope.model.pageCount;
        }
        if (scope.model.currentPage !== p) {
          if (scope.onPage) {
            scope.onPage({
              page: p
            });
          }
          scope.model.currentPage = p;
          scope.computePageNumbers();
        }
      };
      scope.$on("onModelChanged", function() {
        return scope.computePageNumbers();
      });
      scope.computePageNumbers();
    }
  };
});

angular.module("bn.ui").directive("bnUiSearch", [
  function() {
    return {
      restrict: "E",
      replace: true,
      scope: {
        model: "=ngModel",
        placeholder: "@"
      },
      template: '<div class="bn-ui-search">\n    <i class="glyphicon glyphicon-search fa fa-search"></i>\n    <input type="text" ng-model="model" class="form-control" placeholder="{{placeholder}}" />\n    <span class="ng-cloak" role="button" ng-show="model" ng-click="model=null">&times;</span>\n</div>'
    };
  }
]);


/*!
 * Renders a dropdown list
 *
 * @param {string} label
 * @param {object} ng-model
 * @param {object} source - {"Option": "value", ""}
 */
angular.module("bn.ui").directive("bnUiSelect", [
  function() {
    return {
      restrict: "E",
      replace: true,
      scope: {
        model: "=ngModel",
        source: "=",
        label: "@"
      },
      template: '<div class="bn-ui-select form-group">\n    <label ng-bind-html="label" ng-if="label"></label>\n    <select ng-model="model" class="form-control">\n        <option value="{{value}}" ng-bind="key" ng-repeat="(key, value) in source"></option>\n    </select>\n</div>'
    };
  }
]);


/*!
 * Sets same height with parent.
 *
 * @example
 *   <div style="height: 200px"><div bn-fill-height></div></div>
 */
angular.module("bn.ui").directive("bnFillHeight", [
  function() {
    return {
      restrict: "A",
      link: function(scope, ele, attrs) {
        return ele.css("height", ele.parent().height());
      }
    };
  }
]);
