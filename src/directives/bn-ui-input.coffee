###!
# Renders an form-group of bootstrap
# Requires: jQuery v2, moment.js
# 
# @param {string} type - The type of textbox
# @param {string} ng-model - The variable of angular
# @param {bool} required - Required validation
# @param {string} class - The style class 
# @returns {string} Html string wrapped by form-group of bootstrap.
# 
# @example
#   <bn-input type="[date|datetime]" format="yyyy-MM-dd" ng-model="formModel.email" class="col-xs-4" required>
#       <addon>
#           <i class="fa fa-at"></i>
#       </addon>
#   </bn-input>
###
angular.module "bn.ui"
    .directive "bnUiInput", [ 
        ->
            restrict: "E"
            replace: true
            transclude: true
            require: "ngModel"
            scope: 
                ngModel: "=ngModel"
                label: "@label"
                addon: "@addon"
                type: "@type"
                format: "@format"
            template: '''
                <div class="bn-ui-input form-group">
                    <label ng-bind-html="label" ng-if="label"></label>
                    <div class="dropdown" ng-if="type==\'datetime\'||type==\'date\'">
                        <a class="dropdown-toggle" id="btn_{{tagId}}" role="button" data-toggle="dropdown" data-target="#" href="#">
                            <div class="input-group">
                                <input type="text" class="form-control" data-ng-model="ngModel" data-date-time-input="{{format}}" readonly>
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-calendar fa fa-calendar"></i>
                                </span>
                            </div>
                        </a>
                        <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                            <datetimepicker data-ng-model="ngModel" 
                                data-on-set-time="onTimeSet(newDate, oldDate)"
                                data-datetimepicker-config="{ dropdownSelector: \'#btn_\' + tagId, startView:\'day\', minView: type==\'date\' ? \'day\' : \'minute\' }" />
                        </ul>
                    </div>
                    <div class="{{addon?\'input-group\':\'\'}}" ng-if="type!=\'datetime\'&&type!=\'date\'">
                        <input type="{{type}}" class="form-control" ng-model="ngModel" />
                        <div class="input-group-addon" ng-if="addon" ng-bind-html="addon"></div>
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
                            $scope.addon = addon.innerHTML
                         return
            ]
            compile: (ele, attrs, transcludeFn) ->
                ele.find("input").attr("required", true) if attrs.required is "" or attrs.required is "true"
    ]