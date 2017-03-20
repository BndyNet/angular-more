###!
# Renders a switch
#
# @param {object} ng-model - {recordCount, pageSize, currentPage}
# @param {function} on-change - function(value) { // here to get data; }
#
# @example
#   <bn-ui-switch ng-model="model" on-change="change(value)"></bn-ui-switch>
###
angular.module "bn.ui"
    .directive "bnUiSwitch", [
        ->
            restrict: "E"
            replace: true
            scope:
                model: "=ngModel"
                onChange: "&onChange"
            template: '''
<span class="bn-ui-switch" ng-class="{on: model}" ng-click="change();">
    <span class="indicator"></span>
</span>
'''
            link: (scope, ele, attrs) ->
                scope.change = ->
                    scope.model = !scope.model
                    scope.onChange {value: scope.model} if angular.isFunction scope.onChange
    ]