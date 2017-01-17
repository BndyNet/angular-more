/*!
 * angular-more v2.0.0 (https://github.com/BndyNet/angular-more#readme)
 * (c) 2014-2017 Bndy.Net (http://www.bndy.net)
 */

"use strict";

/*!
 * Renders pagination
 *
 * @param {object} ng-model - {recordCount, pageSize, currentPage}
 * @param {function} on-page - function(currentPage) { // here to get data; }
 *
 */
angular.module("bn.ui.pager", []).directive("bnUiPager", function() {
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
            scope.onPage(p);
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
