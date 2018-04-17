###!
# Renders a switch
#
# @param {object} nb-model - {recordCount, pageSize, currentPage}
# @param {function} nb-on-change - function(data) { // here to get data; }
#
# @example
#   <bn-ui-switch nb-model="model" nb-on-change="change(value)"></bn-ui-switch>
###
angular.module "bn.ui"
    .directive "bnUiSwitch", [
        ->
            restrict: "E"
            scope:
                nbModel: "="
                nbOnChange: "&?"
            template: '''
<span ng-class="{on: nbModel}" ng-click="change();">
    <span class="indicator"></span>
</span>
'''
            link: (scope, ele, attrs) ->
                scope.change = ->
                    scope.nbModel = !scope.nbModel
                    scope.nbOnChange {data: scope.nbModel} if angular.isFunction scope.nbOnChange
    ]