###!
# Renders pagination
#
# @param {object} nb-model - {recordCount, pageSize, currentPage}
# @param {function} nb-on-page - function(currentPage) { // here to get data; }
#
###
angular.module "nb.ui"
    .directive "nbUiPager", ->
        restrict: "E"
        template: '''
    <div ng-show="nbModel.recordCount > 0">
        <div class="summary" ng-show="showSummary">
            <span ng-bind="(nbModel.currentPage - 1) * nbModel.pageSize + 1"></span>
            - <span ng-bind="nbModel.currentPage * nbModel.pageSize > nbModel.recordCount ? nbModel.recordCount : nbModel.currentPage * nbModel.pageSize"></span>
            / <span ng-bind="nbModel.recordCount"></span>
        </div>
        <nav aria-label="Page navigation">
          <ul class="pagination" ng-show="nbModel.pageCount > 1">
            <li ng-class="{disabled: nbModel.currentPage == 1}">
              <a aria-label="Previous" ng-click="page(nbModel.currentPage-1)">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li ng-repeat="p in nbModel.displayPageNumbers track by $index" ng-class="{active: nbModel.currentPage == p, disabled: p < 0}">
              <a ng-show="p > 0" ng-click="page(p)"><span ng-bind="p"></span></a>
              <a ng-show="p < 0">...</a>
            </li>
            <li ng-class="{disabled: nbModel.currentPage == nbModel.pageCount}">
              <a aria-label="Next" ng-click="page(nbModel.currentPage+1)">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
    </div>
        '''
        scope:
            nbModel: "="
            nbOnPage: "&"
        link: (scope, ele, attrs) ->
            scope.nbModel = {} if typeof(scope.nbModel) is "undefined"
            scope.showSummary = if typeof(attrs["showSummary"]) isnt "undefined" then attrs["showSummary"] is "true" else true

            scope.$watch "nbModel", (newValue, oldValue) -> 
                return if not newValue
                scope.nbModel.pageCount = Math.ceil(scope.nbModel.recordCount / scope.nbModel.pageSize) if typeof scope.nbModel.pageCount is "undefined"
                if typeof(scope.nbModel.displayPageNumbers) is "undefined"
                    scope.nbModel.displayPageNumbers = []
                    if scope.nbModel.pageCount <= 10
                        scope.nbModel.displayPageNumbers.push p for p in [1..scope.nbModel.pageCount]
                    else
                        if scope.nbModel.currentPage <= 5
                            scope.nbModel.displayPageNumbers.push p for p in [1..7]
                            scope.nbModel.displayPageNumbers.push -1
                            scope.nbModel.displayPageNumbers.push p for p in [scope.nbModel.pageCount-1..scope.nbModel.pageCount]
                        else if scope.nbModel.currentPage > scope.nbModel.pageCount - 5
                            scope.nbModel.displayPageNumbers.push p for p in [1,2]
                            scope.nbModel.displayPageNumbers.push -1
                            scope.nbModel.displayPageNumbers.push p for p in [scope.nbModel.pageCount - 6..scope.nbModel.pageCount]
                        else
                            scope.nbModel.displayPageNumbers.push p for p in [1,2]
                            scope.nbModel.displayPageNumbers.push -1
                            scope.nbModel.displayPageNumbers.push p for p in [scope.nbModel.currentPage - 2..scope.nbModel.currentPage + 2]
                            scope.nbModel.displayPageNumbers.push -1
                            scope.nbModel.displayPageNumbers.push p for p in [scope.nbModel.pageCount - 1..scope.nbModel.pageCount]
                return

            scope.page = (p) ->
                p = 1 if p <= 0
                p = scope.nbModel.pageCount if p > scope.nbModel.pageCount
                if scope.nbModel.currentPage isnt p
                    scope.nbOnPage {page:p} if scope.nbOnPage
                    scope.nbModel.currentPage = p 
                return

            return