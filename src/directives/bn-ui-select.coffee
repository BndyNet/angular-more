###!
# Renders a dropdown list
#
# @param {string} label
# @param {object} ng-model
# @param {object} source - {"Option": "value", ""}
###
angular.module "bn.ui"
    .directive "bnUiSelect", [
        ->
            restrict: "E"
            replace: true
            scope: 
                model: "=ngModel"
                source: "="
                label: "@"
            template: '''
                <div class="bn-ui-select form-group">
                    <label ng-bind-html="label" ng-if="label"></label>
                    <select ng-model="model" class="form-control">
                        <option value="{{value}}" ng-bind="key" ng-repeat="(key, value) in source"></option>
                    </select>
                </div>
            '''
    ]