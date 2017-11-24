###!
# Renders pagination
#
# @param {object} ng-model - {recordCount, pageSize, currentPage}
# @param {function} on-page - function(currentPage) { // here to get data; }
#
###
angular.module "bn.ui"
    .directive "bnUiPager", ->
        restrict: "E"
        template: '''
    <div class="bn-ui-pager" ng-show="model.recordCount > 0">
        <div class="summary" ng-show="showSummary">
            <span ng-bind="(model.currentPage - 1) * model.pageSize + 1"></span>
            - <span ng-bind="model.currentPage * model.pageSize > model.recordCount ? model.recordCount : model.currentPage * model.pageSize"></span>
            / <span ng-bind="model.recordCount"></span>
        </div>
        <nav aria-label="Page navigation">
          <ul class="pagination" ng-show="model.pageCount > 1">
            <li ng-class="{disabled: model.currentPage == 1}">
              <a aria-label="Previous" ng-click="page(model.currentPage-1)">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li ng-repeat="p in model.displayPageNumbers track by $index" ng-class="{active: model.currentPage == p, disabled: p < 0}">
              <a ng-show="p > 0" ng-click="page(p)"><span ng-bind="p"></span></a>
              <a ng-show="p < 0">...</a>
            </li>
            <li ng-class="{disabled: model.currentPage == model.pageCount}">
              <a aria-label="Next" ng-click="page(model.currentPage+1)">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
    </div>
        '''
        replace: true
        scope:
            model: "=ngModel"
            onPage: "&onPage"
        link: (scope, ele, attrs) ->
            scope.model = {} if typeof(scope.model) is "undefined"
            scope.showSummary = if typeof(attrs["showSummary"]) isnt "undefined" then attrs["showSummary"] is "true" else true

            scope.$watch "model", (newValue, oldValue) -> 
                return if not newValue
                scope.model.pageCount = Math.ceil(scope.model.recordCount / scope.model.pageSize) if typeof scope.model.pageCount is "undefined"
                if typeof(scope.model.displayPageNumbers) is "undefined"
                    scope.model.displayPageNumbers = []
                    if scope.model.pageCount <= 10
                        scope.model.displayPageNumbers.push p for p in [1..scope.model.pageCount]
                    else
                        if scope.model.currentPage <= 5
                            scope.model.displayPageNumbers.push p for p in [1..7]
                            scope.model.displayPageNumbers.push -1
                            scope.model.displayPageNumbers.push p for p in [scope.model.pageCount-1..scope.model.pageCount]
                        else if scope.model.currentPage > scope.model.pageCount - 5
                            scope.model.displayPageNumbers.push p for p in [1,2]
                            scope.model.displayPageNumbers.push -1
                            scope.model.displayPageNumbers.push p for p in [scope.model.pageCount - 6..scope.model.pageCount]
                        else
                            scope.model.displayPageNumbers.push p for p in [1,2]
                            scope.model.displayPageNumbers.push -1
                            scope.model.displayPageNumbers.push p for p in [scope.model.currentPage - 2..scope.model.currentPage + 2]
                            scope.model.displayPageNumbers.push -1
                            scope.model.displayPageNumbers.push p for p in [scope.model.pageCount - 1..scope.model.pageCount]
                return

            scope.page = (p) ->
                p = 1 if p <= 0
                p = scope.model.pageCount if p > scope.model.pageCount
                if scope.model.currentPage isnt p
                    scope.onPage {page:p} if scope.onPage
                    scope.model.currentPage = p 
                return

            return