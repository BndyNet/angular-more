/*!
 * @bndynet/angular-more v3.0.0 (https://github.com/bndynet/angular-more#readme)
 * (c) 2014-2018 Bndy.Net (http://bndy.net)
 */

/**
 * Utils for AngularJS v1.x
 * @author Bendy Zhang <zb@bndy.net>
 * @copyright BNDY.NET 2017
 * @see {@link http://bndy.net|Home Page}
 * @external angular
 */

'use strict';

;(function (angular) {
    /**
     * Starts angular application.
     * @function external:angular.start
     * @param {string} appName  - The angular application module name.
     * @param {object=} options  - The options injected.
     * @param {function} options.run - The fun function.
     * @param {function} options.config  - The config function.
     * @param {object} options.httpInterceptor - The httpIntercaptor.
     * @param {function} options.httpInterceptor.request - The intercaptor about request.
     * @param {function} options.httpInterceptor.requestError - The intercaptor about requestError.
     * @param {function} options.httpInterceptor.response - The intercaptor about response.
     * @param {function} options.httpInterceptor.responseError - The intercaptor about responseError.
     * 
     * @example <caption>Usage</caption>
     * angular.start('ngApp', {
     *      request: function(config) {},
     *      requestError: function(rejection) {},
     *      response: function(response) {},
     *      responseError: function(rejection) {},
     *      ...
     * });
     * 
     */
    angular.start = function (appName, options) {
        options = options || {};
        var app = angular.module(appName);

        if (angular.isFunction(options.config)) {
            app.config(options.config);
        }

        if (angular.isFunction(options.run)) {
            app.run(options.run);
        }

        if (angular.isObject(options.httpInterceptor)) {
            app.config([
                '$provide', '$qProvider', '$httpProvider',
                function ($provide, $qProvider, $httpProvider) {
                    $qProvider.errorOnUnhandledRejections(false);

                    // http interceptor
                    $provide.factory('appHttpInterceptor', [
                        '$q', '$injector', '$timeout',
                        function ($q, $injector, $timeout) {
                            return {
                                'request': function (config) {
                                    if (angular.isFunction(options.httpInterceptor.request)) {
                                        options.httpInterceptor.request(config);
                                    }
                                    return config;
                                },
                                'requestError': function (rejection) {
                                    if (angular.isFunction(options.httpInterceptor.requestError)) {
                                        options.httpInterceptor.requestError(rejection);
                                    } else {
                                        console.error(rejection);
                                    }
                                    return $q.reject(rejection);
                                },
                                'response': function (response) {
                                    if (angular.isFunction(options.httpInterceptor.response)) {
                                        options.httpInterceptor.response(response);
                                    }
                                    return response;
                                },
                                'responseError': function (rejection) {
                                    if (angular.isFunction(options.httpInterceptor.responseError)) {
                                        options.httpInterceptor.responseError(rejection);
                                    } else {
                                        console.error(rejection);
                                    }
                                    return $q.reject(rejection);
                                }
                            };
                        }
                    ]);
                    $httpProvider.interceptors.push('appHttpInterceptor');
                }
            ]);
        }

        angular.element(document).ready(function () {
            angular.bootstrap(document, [appName]);
        });
    }

    /**
     * Resets Form validation status.
     * @function external:angular.resetForm
     * @param {object} scopeDotFormName - The object of angular Form.
     * @example
     * angular.resetForm($scope.formName);
     */
    angular.resetForm = function (scopeDotFormName) {
        var ngForm = scopeDotFormName;
        ngForm.$setPristine();
        ngForm.$setUntouched();
        ngForm.$error = {};
        for (var item in ngForm) {
            if (item.indexOf('$') < 0) {
                if (ngForm[item]) {
                    ngForm[item].$error = {};
                }
            }
        }
    };

    /**
     * Gets a single Promise that resolves all $http functions.
     * @function external:angular.ajaxAll
     * @param {$http} argument - A $http such as $http.get()
     * @param {$http} ... - more
     * @returns {Promise} A single promise.
     * @example
     * angular.ajaxAll($http.get(...), $http.post(...)).then(function(values){}, function(rejections){});
     * angular.ajaxAll($http.get(...));
     */
    angular.ajaxAll = function () {
        var promises = [];
        for (var idx = 0; idx < arguments.length; idx++) {
            var ajax = arguments[idx];
            promises.push(new Promise(function (resolve, reject) {
                ajax.then(resolve, reject);
            }));
        }
        return Promise.all(promises);
    }

})(angular);
"use strict";
angular.module("nb.ui", ["ngSanitize", "ui.bootstrap.datetimepicker", "ui.dateTimeInput"]);


/*!
 * angular filters about datetime
 * 
 * @required: moment.js
 */
angular.module("nb.ui").filter("appDate", function() {
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
 * @param {object} nb-model
 * @param {string} nb-label - The label
 * @param {object} nb-source - [{"labelField": "value", "valueField": "value"}, ...]
 * @param {boolean} nb-multiple - Optional, default false
 * @param {boolean} nb-with-icon - Optional, default false
 * @param {boolean} nb-show-button - Optional, default false
 * @param {function} nb-on-change- Optional, fn(data)
 *
 */
angular.module("nb.ui").directive("nbUiChecks", function() {
  return {
    restrict: "E",
    scope: {
      nbModel: "=?",
      nbLabel: "@",
      nbSource: "=",
      nbTextField: "@",
      nbValueField: "@",
      nbMultiple: "=?",
      nbWithIcon: "=?",
      nbShowButton: "=?",
      nbOnChange: "&?"
    },
    template: '<div class="form-group">\n    <label ng-bind-html="nbLabel" ng-if="nbLabel"></label>\n    <div>\n        <div class="{{nbShowButton ? \'btn-group\' : \'form-control-static\'}}">\n            <label ng-class="{\'btn btn-default\': nbShowButton, \'active\': nbShowButton && isExisted(item)}" ng-repeat="item in nbSource"\n                ng-class="{active: isExisted(item)}" ng-click="itemClick(item)">\n                <i class="glyphicon fa fa-fw {{nbMultiple?\'glyphicon-check fa-check-square-o\':\'glyphicon-check fa-dot-circle-o\'}}" ng-show="isExisted(item) && showIcon()"></i>\n                <i class="glyphicon fa fa-fw {{nbMultiple?\'glyphicon-unchecked fa-square-o\':\'glyphicon-unchecked fa-circle-o\'}}" ng-show="!isExisted(item) && showIcon()"></i>\n                <span>{{getItemText(item)}}</span>\n            </label>\n        </div>\n    </div>\n</div>',
    link: function(scope, ele, attrs) {
      var checkedItems, syncModel;
      checkedItems = [];
      if (typeof scope.nbModel === 'undefined') {
        scope.nbModel = scope.nbMultiple ? [] : null;
      }
      syncModel = function() {
        if (scope.nbMultiple) {
          scope.nbModel.length = 0;
          return angular.forEach(checkedItems, function(checkedItem) {
            return scope.nbModel.push(checkedItem[scope.nbValueField]);
          });
        } else {
          return scope.nbModel = checkedItems.length > 0 ? checkedItems[0][scope.nbValueField] : null;
        }
      };
      if (scope.nbModel) {
        if (angular.isArray(scope.nbModel)) {
          angular.forEach(scope.nbModel, function(item) {
            return angular.forEach(scope.nbSource, function(sourceItem) {
              if (sourceItem[scope.nbValueField] === item) {
                return checkedItems.push(sourceItem);
              }
            });
          });
        } else {
          angular.forEach(scope.nbSource, function(sourceItem) {
            if (sourceItem[scope.nbValueField] === scope.nbModel) {
              return checkedItems.push(sourceItem);
            }
          });
        }
      }
      if (typeof scope.nbMultiple === "undefined") {
        scope.nbMultiple = false;
      }
      if (typeof scope.nbWithIcon === "undefined") {
        scope.nbWithIcon = false;
      }
      if (!scope.nbWithIcon) {
        scope.nbShowButton = true;
      }
      scope.$watch("nbWithIcon", function(value) {
        if (!value) {
          return scope.nbShowButton = true;
        }
      });
      scope.$watch("nbShowButton", function(value) {
        if (!value) {
          return scope.nbWithIcon = true;
        }
      });
      scope.showIcon = function() {
        if (typeof scope.nbWithIcon === "undefined") {
          return false;
        } else {
          return scope.nbWithIcon;
        }
      };
      scope.isExisted = function(item) {
        if (checkedItems.length === 0) {
          return false;
        }
        if (scope.nbMultiple) {
          return checkedItems.indexOf(item) >= 0;
        } else if (checkedItems.length > 0) {
          return checkedItems[0] === item;
        }
        return false;
      };
      scope.getItemText = function(item) {
        return item[scope.nbTextField];
      };
      scope.itemClick = function(item) {
        if (scope.nbMultiple) {
          if (checkedItems.indexOf(item) < 0) {
            checkedItems.push(item);
          } else {
            checkedItems.splice(checkedItems.indexOf(item), 1);
          }
        } else {
          checkedItems.length = 0;
          checkedItems.push(item);
        }
        syncModel();
        if (scope.nbOnChange) {
          return scope.nbOnChange({
            data: scope.nbModel
          });
        }
      };
    }
  };
});


/*!
 * Renders a color-picker control
 *
 * @param {object} nb-colors - e.x. [{key: 1, value: "#ff0000", description: "", css: "flag"}, ...]
 * @param {object} nb-model - type of key
 * @param {function} nb-on-change - fn(data)
 *
 * @example
 *   <nb-ui-colorpicker nb-colors="[{}, {}, ...]" nb-model="model" nb-on-change="changeColor(color)"></nb-ui-colorpicker>
 */
angular.module("nb.ui").directive("nbUiColorpicker", function() {
  return {
    restrict: "E",
    scope: {
      nbColors: "=",
      nbModel: "=?",
      nbOnChange: "&?"
    },
    template: '<span class="dropdown">\n  <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">\n      <span class="empty" ng-show="nbModel == null || typeof(nbModel) == \'undefined\'"></span>\n      <span ng-style="{\'background-color\': color.value}" ng-class="color.css" ng-show="color.key == nbModel" ng-repeat="color in nbColors" title="{{color.description}}"></span>\n  </a>\n  <ul class="dropdown-menu" ng-class="{inline: inline}">\n      <li ng-repeat="color in nbColors">\n          <a role="button" ng-click="nbOnChange({data: color})">\n              <span class="flag" style="" ng-class="color.css" ng-style="{\'background-color\': color.value}"></span>\n              <span ng-bind="color.description"></span>\n          </a>\n      </li>\n  </ul>\n</span>',
    link: function(scope, ele, attrs) {
      var c, i, inline, len, ref;
      inline = true;
      ref = scope.nbColors;
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
 * Html Editor
 *
 * @example
 *   <nb-ui-html-editor ng-model="content"></nb-ui-html-editor>
 */
angular.module("nb.ui").directive("nbUiHtmlEditor", function() {
  return {
    restrict: "E",
    require: '?ngModel',
    link: function(scope, elem, attrs, ngModel) {
      var ck, updateModel;
      if (typeof CKEDITOR === 'undefined') {
        throw new Error('Can not find CKEDITOR');
      }
      CKEDITOR.config.height = 360;
      ck = CKEDITOR.replace(elm[0]);
      if (!ngModel) {
        return;
      }
      ck.on('instanceReady', function() {
        return ck.setData(ngModel.$viewValue);
      });
      updateModel = function() {
        return scope.$apply(function() {
          return ngModel.$setViewValue(ck.getData());
        });
      };
      ck.on('change', updateModel);
      ck.on('key', updateModel);
      ck.on('dataReady', updateModel);
      ngModel.$render = function(value) {
        return ck.setData(ngModel.$viewValue);
      };
    }
  };
});


/*!
 * Renders an form-group of bootstrap
 * Requires: jQuery v2, moment.js
 * 
 * @param {string} nb-type - The type of textbox
 * @param {string} nb-model - The variable of angular
 * @param {bool} required - Required validation
 * @param {string} class - The style class 
 * @returns {string} Html string wrapped by form-group of bootstrap.
 * 
 * @example
 *   <nb-ui-input nb-type="[date|datetime]" nb-format="yyyy-MM-dd" nb-model="formModel.email" class="col-xs-4" required>
 *       <addon>
 *           <i class="fa fa-at"></i>
 *       </addon>
 *   </nb-ui-input>
 */
angular.module("nb.ui").directive("nbUiInput", [
  function() {
    return {
      restrict: "E",
      transclude: true,
      scope: {
        nbModel: "=",
        nbLabel: "@",
        nbAddon: "@",
        nbType: "@",
        nbFormat: "@"
      },
      template: '<div class="form-group">\n    <label ng-bind-html="nbLabel" ng-if="nbLabel"></label>\n    <div class="dropdown" ng-if="nbType==\'datetime\'||nbType==\'date\'">\n        <a class="dropdown-toggle" id="btn_{{tagId}}" role="button" data-toggle="dropdown" data-target="#" href="#">\n            <div class="input-group">\n                <input type="text" class="form-control" data-ng-model="nbModel" data-date-time-input="{{nbFormat}}" readonly>\n                <span class="input-group-addon">\n                    <i class="glyphicon glyphicon-calendar"></i>\n                </span>\n            </div>\n        </a>\n        <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">\n            <datetimepicker data-ng-model="nbModel" \n                data-on-set-time="onTimeSet(newDate, oldDate)"\n                data-datetimepicker-config="{ dropdownSelector: \'#btn_\' + tagId, startView:\'day\', minView: nbType==\'date\' ? \'day\' : \'minute\' }" />\n        </ul>\n    </div>\n    <div class="{{nbAddon?\'input-group\':\'\'}}" ng-if="nbType!=\'datetime\'&&nbType!=\'date\'">\n        <input type="{{nbType}}" class="form-control" ng-model="nbModel" />\n        <div class="input-group-addon" ng-if="nbAddon" ng-bind-html="nbAddon"></div>\n    </div>\n</div>',
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
              $scope.nbAddon = addon.innerHTML;
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
 * Loading status for element
 *
 * @example
 *   <button class="btn btn-danger" nb-ui-loading="isLoading">Save</button>
 */
angular.module("nb.ui").directive("nbUiLoading", [
  "$compile", function($compile) {
    return {
      restrict: "A",
      link: function(scope, elem, attrs) {
        var children, contentStyle, isContentElem;
        elem.css("width", elem.outerWidth());
        elem.css("height", elem.outerHeight());
        isContentElem = true;
        if (elem[0].tagName.toLocaleUpperCase() === "BUTTON" || elem[0].tagName.toLocaleUpperCase() === "A" || elem.attr("ng-click")) {
          isContentElem = false;
        }
        contentStyle = isContentElem ? "opacity-lg" : "";
        children = $compile(elem.contents())(scope);
        scope.$watch(attrs.nbUiLoading, function(value) {
          elem.attr("disabled", value);
          if (value) {
            elem.prepend("<div class='in-process " + contentStyle + "'><div><i class='bounce1'></i><i class='bounce2'></i><i class='bounce3'></i></div></div>");
            if (isContentElem) {
              return;
            }
            return angular.forEach(children, function(child) {
              if (angular.element(child)[0].nodeName === '#text') {
                return angular.element(child).remove();
              } else {
                return angular.element(child).css("visibility", "hidden");
              }
            });
          } else {
            angular.element(document.querySelector(".in-process")).remove();
            if (isContentElem) {
              return;
            }
            return angular.forEach(children, function(child) {
              if (angular.element(child)[0].nodeName === '#text') {
                return elem.append(child);
              } else {
                return angular.element(child).css("visibility", "visible");
              }
            });
          }
        });
      }
    };
  }
]);


/*!
 * Renders pagination
 *
 * @param {object} nb-model - {recordCount, pageSize, currentPage}
 * @param {function} nb-on-page - function(currentPage) { // here to get data; }
 *
 */
angular.module("nb.ui").directive("nbUiPager", function() {
  return {
    restrict: "E",
    template: '<div ng-show="nbModel.recordCount > 0">\n    <div class="summary" ng-show="showSummary">\n        <span ng-bind="(nbModel.currentPage - 1) * nbModel.pageSize + 1"></span>\n        - <span ng-bind="nbModel.currentPage * nbModel.pageSize > nbModel.recordCount ? nbModel.recordCount : nbModel.currentPage * nbModel.pageSize"></span>\n        / <span ng-bind="nbModel.recordCount"></span>\n    </div>\n    <nav aria-label="Page navigation">\n      <ul class="pagination" ng-show="nbModel.pageCount > 1">\n        <li ng-class="{disabled: nbModel.currentPage == 1}">\n          <a aria-label="Previous" ng-click="page(nbModel.currentPage-1)">\n            <span aria-hidden="true">&laquo;</span>\n          </a>\n        </li>\n        <li ng-repeat="p in nbModel.displayPageNumbers track by $index" ng-class="{active: nbModel.currentPage == p, disabled: p < 0}">\n          <a ng-show="p > 0" ng-click="page(p)"><span ng-bind="p"></span></a>\n          <a ng-show="p < 0">...</a>\n        </li>\n        <li ng-class="{disabled: nbModel.currentPage == nbModel.pageCount}">\n          <a aria-label="Next" ng-click="page(nbModel.currentPage+1)">\n            <span aria-hidden="true">&raquo;</span>\n          </a>\n        </li>\n      </ul>\n    </nav>\n</div>',
    scope: {
      nbModel: "=",
      nbOnPage: "&"
    },
    link: function(scope, ele, attrs) {
      if (typeof scope.nbModel === "undefined") {
        scope.nbModel = {};
      }
      scope.showSummary = typeof attrs["showSummary"] !== "undefined" ? attrs["showSummary"] === "true" : true;
      scope.$watch("nbModel", function(newValue, oldValue) {
        var i, j, k, l, len, len1, m, n, o, p, q, ref, ref1, ref10, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9;
        if (!newValue) {
          return;
        }
        if (typeof scope.nbModel.pageCount === "undefined") {
          scope.nbModel.pageCount = Math.ceil(scope.nbModel.recordCount / scope.nbModel.pageSize);
        }
        if (typeof scope.nbModel.displayPageNumbers === "undefined") {
          scope.nbModel.displayPageNumbers = [];
          if (scope.nbModel.pageCount <= 10) {
            for (p = i = 1, ref = scope.nbModel.pageCount; 1 <= ref ? i <= ref : i >= ref; p = 1 <= ref ? ++i : --i) {
              scope.nbModel.displayPageNumbers.push(p);
            }
          } else {
            if (scope.nbModel.currentPage <= 5) {
              for (p = j = 1; j <= 7; p = ++j) {
                scope.nbModel.displayPageNumbers.push(p);
              }
              scope.nbModel.displayPageNumbers.push(-1);
              for (p = k = ref1 = scope.nbModel.pageCount - 1, ref2 = scope.nbModel.pageCount; ref1 <= ref2 ? k <= ref2 : k >= ref2; p = ref1 <= ref2 ? ++k : --k) {
                scope.nbModel.displayPageNumbers.push(p);
              }
            } else if (scope.nbModel.currentPage > scope.nbModel.pageCount - 5) {
              ref3 = [1, 2];
              for (l = 0, len = ref3.length; l < len; l++) {
                p = ref3[l];
                scope.nbModel.displayPageNumbers.push(p);
              }
              scope.nbModel.displayPageNumbers.push(-1);
              for (p = m = ref4 = scope.nbModel.pageCount - 6, ref5 = scope.nbModel.pageCount; ref4 <= ref5 ? m <= ref5 : m >= ref5; p = ref4 <= ref5 ? ++m : --m) {
                scope.nbModel.displayPageNumbers.push(p);
              }
            } else {
              ref6 = [1, 2];
              for (n = 0, len1 = ref6.length; n < len1; n++) {
                p = ref6[n];
                scope.nbModel.displayPageNumbers.push(p);
              }
              scope.nbModel.displayPageNumbers.push(-1);
              for (p = o = ref7 = scope.nbModel.currentPage - 2, ref8 = scope.nbModel.currentPage + 2; ref7 <= ref8 ? o <= ref8 : o >= ref8; p = ref7 <= ref8 ? ++o : --o) {
                scope.nbModel.displayPageNumbers.push(p);
              }
              scope.nbModel.displayPageNumbers.push(-1);
              for (p = q = ref9 = scope.nbModel.pageCount - 1, ref10 = scope.nbModel.pageCount; ref9 <= ref10 ? q <= ref10 : q >= ref10; p = ref9 <= ref10 ? ++q : --q) {
                scope.nbModel.displayPageNumbers.push(p);
              }
            }
          }
        }
      });
      scope.page = function(p) {
        if (p <= 0) {
          p = 1;
        }
        if (p > scope.nbModel.pageCount) {
          p = scope.nbModel.pageCount;
        }
        if (scope.nbModel.currentPage !== p) {
          if (scope.nbOnPage) {
            scope.nbOnPage({
              page: p
            });
          }
          scope.nbModel.currentPage = p;
        }
      };
    }
  };
});

angular.module("nb.ui").directive("nbUiSearch", [
  function() {
    return {
      restrict: "E",
      scope: {
        nbModel: "=",
        nbPlaceholder: "@?",
        nbOnChange: "&?"
      },
      template: '<div>\n    <i class="glyphicon glyphicon-search fa fa-search"></i>\n    <input type="text" ng-model="nbModel" class="form-control" placeholder="{{nbPlaceholder}}" ng-change="nbOnChange({data: nbModel})" />\n    <span class="ng-cloak" role="button" ng-show="nbModel" ng-click="nbModel=null;nbOnChange({data: nbModel})">&times;</span>\n</div>'
    };
  }
]);


/*!
 * Renders a dropdown list
 *
 * @param {string} nb-label
 * @param {object} nb-model
 * @param {array} nb-source - [{label: '', value: ''}]
 * @param {function} nb-on-change - fn(data)
 */
angular.module("nb.ui").directive("nbUiSelect", [
  function() {
    return {
      restrict: "E",
      scope: {
        nbModel: "=",
        nbSource: "=",
        nbTextField: "@",
        nbValueField: "@",
        nbLabel: "@?",
        nbMultiple: "=?",
        nbPlaceholder: "@?",
        nbOnChange: "&?"
      },
      template: '<div class="form-group">\n    <label ng-bind-html="nbLabel" ng-if="nbLabel"></label>\n    <a class="form-control" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\n        <span class="placeholder" ng-if="selectedItems.length === 0">{{nbPlaceholder}}</span>\n        <span class="label label-primary" ng-repeat="item in selectedItems track by $index">\n            <span>{{item[nbTextField]}}</span>\n        </span>\n        <span class="caret"></span>\n    </a>\n    <ul class="dropdown-menu" aria-labelledby="dLabel">\n        <li class="placeholder" ng-if="nbPlaceholder && !nbMultiple">\n            <a ng-click="onchange(null)">{{nbPlaceholder}}</a>\n        </li>\n        <li ng-repeat="item in nbSource track by $index">\n            <a ng-click="onchange(item)">\n                <i class="glyphicon glyphicon-ok" aria-hidden="true" ng-show="item.__selected"></i>\n                <span>{{item[nbTextField]}}</span>\n            </a>\n        </li>\n    </ul>\n</div>',
      link: function(scope, elem, attrs) {
        scope.selectedItems = [];
        if (scope.nbModel) {
          angular.forEach(scope.nbSource, function(itemSource) {
            if (angular.isArray(scope.nbModel)) {
              angular.forEach(scope.nbModel, function(item) {
                if (item === itemSource[scope.nbValueField]) {
                  itemSource.__selected = true;
                  return scope.selectedItems.push(itemSource);
                }
              });
            } else {
              if (itemSource[scope.nbValueField] === scope.nbModel) {
                itemSource.__selected = true;
                scope.selectedItems.push(itemSource);
              }
            }
          });
        }
        scope.onchange = function(item) {
          var i, itemSource, j, k, len, len1, len2, ref, ref1, ref2, selectedItem, selectedValues;
          if (!item && !scope.nbMultiple) {
            ref = scope.nbSource;
            for (i = 0, len = ref.length; i < len; i++) {
              itemSource = ref[i];
              itemSource.__selected = false;
            }
            scope.selectedItems.length = 0;
            scope.nbModel = null;
            return;
          }
          if (item.__selected && !scope.nbMultiple) {
            return;
          }
          if (!scope.nbMultiple) {
            ref1 = scope.nbSource;
            for (j = 0, len1 = ref1.length; j < len1; j++) {
              itemSource = ref1[j];
              itemSource.__selected = false;
            }
          }
          item.__selected = !item.__selected;
          if (item.__selected) {
            if (scope.nbMultiple) {
              if (scope.selectedItems.indexOf(item) < 0) {
                scope.selectedItems.push(item);
              }
            } else {
              scope.selectedItems.length = 0;
              scope.selectedItems.push(item);
            }
          } else {
            if (scope.selectedItems.indexOf(item) >= 0) {
              scope.selectedItems.splice(scope.selectedItems.indexOf(item), 1 && !item.__selected);
            }
          }
          selectedValues = [];
          ref2 = scope.selectedItems;
          for (k = 0, len2 = ref2.length; k < len2; k++) {
            selectedItem = ref2[k];
            selectedValues.push(selectedItem[scope.nbValueField]);
          }
          if (selectedValues.length > 0) {
            scope.nbModel = scope.nbMultiple ? angular.copy(selectedValues) : selectedValues[0];
          } else {
            if (scope.nbMultiple) {
              scope.nbModel = angular.copy([]);
            } else {
              scope.nbModel = null;
            }
          }
          if (scope.nbOnChange) {
            scope.nbOnChange({
              data: scope.nbModel
            });
          }
        };
      }
    };
  }
]);


/*!
 * Renders a switch
 *
 * @param {object} nb-model - {recordCount, pageSize, currentPage}
 * @param {function} nb-on-change - function(data) { // here to get data; }
 *
 * @example
 *   <nb-ui-switch nb-model="model" nb-on-change="change(value)"></nb-ui-switch>
 */
angular.module("nb.ui").directive("nbUiSwitch", [
  function() {
    return {
      restrict: "E",
      scope: {
        nbModel: "=",
        nbOnChange: "&?"
      },
      template: '<span ng-class="{on: nbModel}" ng-click="change();">\n    <span class="indicator"></span>\n</span>',
      link: function(scope, ele, attrs) {
        return scope.change = function() {
          scope.nbModel = !scope.nbModel;
          if (angular.isFunction(scope.nbOnChange)) {
            return scope.nbOnChange({
              data: scope.nbModel
            });
          }
        };
      }
    };
  }
]);


/*!
 * Sets same height with parent.
 *
 * @example
 *   <div style="height: 200px"><div bn-fill-height></div></div>
 */
angular.module("nb.ui").directive("bnFillHeight", [
  function() {
    return {
      restrict: "A",
      link: function(scope, ele, attrs) {
        return ele.css("height", ele.parent().height());
      }
    };
  }
]);
