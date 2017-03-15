angular.module "bn.ui"
    .directive "bnUiSearch", [
        ->
            restrict: "E"
            replace: true
            scope:
                model: "=ngModel"
                placeholder: "@"
            template: '''
<div class="bn-ui-search">
    <i class="glyphicon glyphicon-search fa fa-search"></i>
    <input type="text" ng-model="model" class="form-control" placeholder="{{placeholder}}" />
    <span class="ng-cloak" role="button" ng-show="model" ng-click="model=null">&times;</span>
</div>
'''
]
