"use strict"

###!
# Renders an form-group of bootstrap
# 
# @param {string} type - The type of textbox
# @param {string} ng-model - The variable of angular
# @param {bool} required - Required validation
# @param {string} class - The style class 
# @returns {string} Html string wrapped by form-group of bootstrap.
# 
# @example
#   <bn-input type="email" ng-model="formModel.email" class="col-xs-4" required>
#       <addon>
#           <i class="fa fa-at"></i>
#       </addon>
#   </bn-input>
###
angular.module "bnUi", []
    .directive "bnUiInput", [ 
        ->
            restrict: "E"
            replace: true
            transclude: true
            scope: 
                ngModel: "=ngModel"
                label: "@label"
                addon: "@addon"
            template: '''
                <div class="bn-ui-input form-group">
                    <label ng-bind-html="label" ng-if="label"></label>
                    <div class="{{addon?\'input-group\':\'\'}}">
                        <input class="form-control" ng-model="ngModel" />
                        <div class="input-group-addon" ng-if="addon" ng-bind-html="addon"></div>
                    </div>
                </div>
            '''
            controller: [
                "$scope", "$element", "$transclude",
                ($scope, $element, $transclude) ->
                    $transclude (clone) ->
                         addon = item for item in clone when item.tagName is "ADDON"
                         if addon
                            $scope.addon = addon.innerHTML
                         return
            ]
            compile: (ele, attrs, transcludeFn) ->
                ele.find("input").attr("required", true) if attrs.required is "" or attrs.required is "true"
                if attrs.type then ele.find("input").attr("type", attrs.type) else ele.find("input").attr("type", "text")
    ]