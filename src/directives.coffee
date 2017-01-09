app.directive "bnPager", ->
    restrict: "EA"
    template: '''
<div class="bn-pager" ng-show="model.RecordCount > 0">
    <div class="summary" ng-show="showSummary">
        <span ng-bind="(model.CurrentPage - 1) * model.PageSize + 1"></span> 
        - <span ng-bind="model.CurrentPage * model.PageSize > model.RecordCount ? model.RecordCount : model.CurrentPage * model.PageSize"></span> 
        / <span ng-bind="model.RecordCount"></span>
    </div>
    <nav aria-label="Page navigation">
      <ul class="pagination" ng-show="model.PageCount > 1">
        <li ng-class="{disabled: model.CurrentPage == 1}">
          <a href="#" aria-label="Previous" ng-click="page(model.CurrentPage-1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li ng-repeat="p in model.DisplayPageNumbers track by $index" ng-class="{active: model.CurrentPage == p, disabled: p < 0}">
          <a href="#" ng-show="p > 0" ng-click="page(p)"><span ng-bind="p"></span></a>
          <a href="#" ng-show="p < 0">...</a>
        </li>
        <li ng-class="{disabled: model.CurrentPage == model.PageCount}">
          <a href="#" aria-label="Next" ng-click="page(model.CurrentPage+1)">
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
        onPage: "=onPage"
    link: (scope, ele, attrs) ->
        scope.showSummary = if typeof(attrs["showSummary"]) isnt "undefined" then attrs["showSummary"] is "true" else true
        scope.model.PageCount = Math.ceil(scope.model.RecordCount / scope.model.PageSize) if typeof scope.model.PageCount is "undefined"
        
        scope.computePageNumbers = ->
            if scope.needComputePageNumber or typeof(scope.model.DisplayPageNumbers) is "undefined"
                scope.model.DisplayPageNumbers = []
                scope.needComputePageNumber = true
                if scope.model.PageCount <= 10
                    scope.model.DisplayPageNumbers.push p for p in [1..scope.model.PageCount]
                else
                    if scope.model.CurrentPage <= 5
                        scope.model.DisplayPageNumbers.push p for p in [1..7]
                        scope.model.DisplayPageNumbers.push -1
                        scope.model.DisplayPageNumbers.push p for p in [scope.model.PageCount-1..scope.model.PageCount]
                    else if scope.model.CurrentPage > scope.model.PageCount - 5
                        scope.model.DisplayPageNumbers.push p for p in [1,2]
                        scope.model.DisplayPageNumbers.push -1
                        scope.model.DisplayPageNumbers.push p for p in [scope.model.PageCount - 6..scope.model.PageCount]
                    else
                        scope.model.DisplayPageNumbers.push p for p in [1,2]
                        scope.model.DisplayPageNumbers.push -1
                        scope.model.DisplayPageNumbers.push p for p in [scope.model.CurrentPage - 2..scope.model.CurrentPage + 2]
                        scope.model.DisplayPageNumbers.push -1
                        scope.model.DisplayPageNumbers.push p for p in [scope.model.PageCount - 1..scope.model.PageCount]
                    
        scope.page = (p) ->
            p = 1 if p <= 0
            console.debug scope.model.PageCount
            p = scope.model.PageCount if p > scope.model.PageCount
            if scope.model.CurrentPage isnt p
                scope.onPage p
                scope.model.CurrentPage = p
                scope.computePageNumbers()
        
        scope.$on "onModelChanged", ->
            scope.computePageNumbers()
            
        scope.computePageNumbers()
        return
            