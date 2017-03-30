###!
# Renders a color-picker control
#
# @param {object} ng-colors - e.x. [{key: 1, value: "#ff0000", description: "", css: "flag"}, ...]
# @param {object} ng-model - type of key
# @param {function} ng-change - fn(color)
#
# @example
#   <bn-ui-colorpicker ng-colors="[{}, {}, ...]" ng-model="model" ng-change="changeColor(color)"></bn-ui-colorpicker>
###
angular.module "bn.ui"
    .directive "bnUiColorpicker",
        ->
            restrict: "E"
            replace: true
            scope:
                ngColors: "=ngColors", ngModel: "=ngModel", onChange: "&onChange"
            template: '''
<span class="bn-ui-colorpicker dropdown">
  <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
      <span class="empty" ng-show="ngModel == null || typeof(ngModel) == 'undefined'"></span>
      <span ng-style="{'background-color': color.value}" ng-class="color.css" ng-show="color.key == ngModel" ng-repeat="color in ngColors" title="{{color.description}}"></span>
  </a>
  <ul class="dropdown-menu" ng-class="{inline: inline}">
      <li ng-repeat="color in ngColors">
          <a role="button" ng-click="onChange({color: color})">
              <span class="flag" style="" ng-class="color.css" ng-style="{'background-color': color.value}"></span>
              <span ng-bind="color.description"></span>
          </a>
      </li>
  </ul>
</span>
'''
            link: (scope, ele, attrs) ->
                inline = true
                for c in scope.ngColors
                    if c.description
                        inline = false
                        break
                scope.inline = inline
                return
