"use strict"

angular.module "bn.common", []
    .directive "bnFillHeight", [
        ->
            restrict: "A"
            link: (scope, ele, attrs) ->
                ele.css "height", ele.parent().height()
                console.debug ele.html()
    ]
