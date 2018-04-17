###!
# Renders a color-picker control
#
# @param {object} nb-colors - e.x. [{key: 1, value: "#ff0000", description: "", css: "flag"}, ...]
# @param {object} nb-model - type of key
# @param {function} nb-on-change - fn(data)
#
# @example
#   <bn-ui-colorpicker nb-colors="[{}, {}, ...]" nb-model="model" nb-on-change="changeColor(color)"></bn-ui-colorpicker>
###
angular.module "bn.ui"
    .directive "bnUiColorpicker",
        ->
            restrict: "E"
            scope:
                nbColors: "=", nbModel: "=?", nbOnChange: "&?"
            template: '''
<span class="dropdown">
  <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
      <span class="empty" ng-show="nbModel == null || typeof(nbModel) == 'undefined'"></span>
      <span ng-style="{'background-color': color.value}" ng-class="color.css" ng-show="color.key == nbModel" ng-repeat="color in nbColors" title="{{color.description}}"></span>
  </a>
  <ul class="dropdown-menu" ng-class="{inline: inline}">
      <li ng-repeat="color in nbColors">
          <a role="button" ng-click="nbOnChange({data: color})">
              <span class="flag" style="" ng-class="color.css" ng-style="{'background-color': color.value}"></span>
              <span ng-bind="color.description"></span>
          </a>
      </li>
  </ul>
</span>
'''
            link: (scope, ele, attrs) ->
                inline = true
                for c in scope.nbColors
                    if c.description
                        inline = false
                        break
                scope.inline = inline
                return
