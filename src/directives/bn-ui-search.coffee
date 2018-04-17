angular.module "bn.ui"
    .directive "bnUiSearch", [
        ->
            restrict: "E"
            scope:
                nbModel: "="
                nbPlaceholder: "@?"
                nbOnChange: "&?"
            template: '''
<div>
    <i class="glyphicon glyphicon-search fa fa-search"></i>
    <input type="text" ng-model="nbModel" class="form-control" placeholder="{{nbPlaceholder}}" ng-change="nbOnChange({data: nbModel})" />
    <span class="ng-cloak" role="button" ng-show="nbModel" ng-click="nbModel=null;nbOnChange({data: nbModel})">&times;</span>
</div>
'''
]
