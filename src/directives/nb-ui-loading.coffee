###!
# Loading status for element
#
# @example
#   <button class="btn btn-danger" nb-ui-loading="isLoading">Save</button>
###
angular.module "nb.ui"
    .directive "nbUiLoading", ["$compile", ($compile) ->
        restrict: "A"
        link: (scope, elem, attrs) ->
            elem.css "width", elem.outerWidth()
            elem.css "height", elem.outerHeight()

            isContentElem = true
            if elem[0].tagName.toLocaleUpperCase() is "BUTTON" or elem[0].tagName.toLocaleUpperCase() is "A" or elem.attr("ng-click")
                isContentElem = false
            contentStyle = if isContentElem then "opacity-lg" else ""
            children = $compile(elem.contents())(scope);
            scope.$watch attrs.nbUiLoading, (value) ->
                elem.attr "disabled", value
                if value
                    elem.prepend "<div class='in-process #{contentStyle}'><div><i class='bounce1'></i><i class='bounce2'></i><i class='bounce3'></i></div></div>"
                    return if isContentElem
                    angular.forEach children, (child) ->
                        if angular.element(child)[0].nodeName is '#text'
                            angular.element(child).remove();
                        else
                            angular.element(child).css "visibility", "hidden"
                else
                    angular.element(document.querySelector(".in-process")).remove()
                    return if isContentElem
                    angular.forEach children, (child) ->
                        if angular.element(child)[0].nodeName is '#text'
                            elem.append child
                        else 
                            angular.element(child).css "visibility", "visible"
            return
    ]