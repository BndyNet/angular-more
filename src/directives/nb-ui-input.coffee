###!
# Renders an form-group of bootstrap
# Requires: jQuery v2, moment.js
# 
# @param {string} nb-type - The type of textbox
# @param {string} nb-model - The variable of angular
# @param {bool} required - Required validation
# @param {string} class - The style class 
# @returns {string} Html string wrapped by form-group of bootstrap.
# 
# @example
#   <nb-ui-input nb-type="[date|datetime]" nb-format="yyyy-MM-dd" nb-model="formModel.email" class="col-xs-4" required>
#       <addon>
#           <i class="fa fa-at"></i>
#       </addon>
#   </nb-ui-input>
###
angular.module "nb.ui"
    .directive "nbUiInput", [ 
        ->
            restrict: "E"
            transclude: true
            scope: 
                nbModel: "="
                nbLabel: "@"
                nbAddon: "@"
                nbType: "@"
                nbFormat: "@"
            template: '''
                <div class="form-group">
                    <label ng-bind-html="nbLabel" ng-if="nbLabel"></label>
                    <div class="dropdown" ng-if="nbType==\'datetime\'||nbType==\'date\'">
                        <a class="dropdown-toggle" id="btn_{{tagId}}" role="button" data-toggle="dropdown" data-target="#" href="#">
                            <div class="input-group">
                                <input type="text" class="form-control" data-ng-model="nbModel" data-date-time-input="{{nbFormat}}" readonly>
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-calendar"></i>
                                </span>
                            </div>
                        </a>
                        <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                            <datetimepicker data-ng-model="nbModel" 
                                data-on-set-time="onTimeSet(newDate, oldDate)"
                                data-datetimepicker-config="{ dropdownSelector: \'#btn_\' + tagId, startView:\'day\', minView: nbType==\'date\' ? \'day\' : \'minute\' }" />
                        </ul>
                    </div>
                    <div class="{{nbAddon?\'input-group\':\'\'}}" ng-if="nbType!=\'datetime\'&&nbType!=\'date\'">
                        <input type="{{nbType}}" class="form-control" ng-model="nbModel" />
                        <div class="input-group-addon" ng-if="nbAddon" ng-bind-html="nbAddon"></div>
                    </div>
                </div>
            '''
            controller: [
                "$scope", "$element", "$transclude",
                ($scope, $element, $transclude) ->
                    $scope.tagId = parseInt Math.random() * 1000000
                    $transclude (clone) ->
                         addon = item for item in clone when item.tagName is "ADDON"
                         if addon
                            $scope.nbAddon = addon.innerHTML
                         return
            ]
            compile: (ele, attrs, transcludeFn) ->
                ele.find("input").attr("required", true) if attrs.required is "" or attrs.required is "true"
    ]