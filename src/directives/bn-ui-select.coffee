"use strict"

angular.module "bn.ui.select", ["ngSanitize"]
    .directive "bnUiSelect", [
        ->
            restrict: "E"
            replace: true
            scope: 
                ngModel: "=ngModel"
                ngSource: "=ngSource"
                label: "@label"
            template: '''
                <div class="bn-ui-select form-group">
                    <label ng-bind-html="label" ng-if="label"></label>
                    <select ng-model="ngModel" class="form-control">
                        <option value="{{value}}" ng-bind="key" ng-repeat="(key, value) in ngSource"></option>
                    </select>
                </div>
            '''
    ]