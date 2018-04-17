###!
# Sets same height with parent.
#
# @example
#   <div style="height: 200px"><div bn-fill-height></div></div>
###
angular.module "nb.ui"
    .directive "bnFillHeight", [
        ->
            restrict: "A"
            link: (scope, ele, attrs) ->
                ele.css "height", ele.parent().height()
    ]
