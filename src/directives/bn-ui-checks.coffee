﻿"use strict"

angular.module "bn.ui.checks", ["ngSanitize"]
    .directive "bnUiChecks", 
    ->
        restrict: "E"
        replace: true
        scope:
            model: "=ngModel"
            label: "@"
            source: "="
            multiple: "=?"
            withIcon: "=?"
        template: '''
            <div class="bn-ui-checks form-group">
                <label ng-bind-html="label" ng-if="label"></label>
                <div>
                    <div class="btn-group">
                        <label class="btn btn-default" ng-repeat="(key, value) in source" 
                            ng-class="{active: isExisted(value)}" ng-click="select(value)">

                            <i class="glyphicon fa fa-fw {{multiple?\'glyphicon-check fa-check-square-o\':\'glyphicon-ok fa-dot-circle-o\'}}" ng-show="isExisted(value) && showIcon()"></i>
                            <i class="glyphicon fa fa-fw {{multiple?\'glyphicon-unchecked fa-square-o\':\'fa-circle-o\'}}" ng-show="!isExisted(value) && showIcon()"></i>
                            <span ng-bind="key"></span>
                        </label>
                    </div>
                </div>
            </div>
        '''
        link: (scope, ele, attrs) ->
            scope.model = [] if not scope.model and scope.multiple
            scope.multiple = false if typeof scope.multiple is "undefined"
            scope.withIcon = false if typeof scope.withIcon is "undefined"
            scope.showIcon = ->
                if typeof scope.withIcon is "undefined" then false else scope.withIcon
            scope.isExisted = (value) ->
                return false if typeof scope.model is "undefined"
                if scope.multiple then scope.model.indexOf(value) >= 0 else value.toString() == scope.model.toString()
            scope.select = (value) ->
                if scope.multiple
                    if scope.model.indexOf(value) < 0 
                        scope.model.push(value)
                    else
                        scope.model.splice scope.model.indexOf(value), 1
                else 
                    scope.model = value