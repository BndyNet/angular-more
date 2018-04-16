###!
# Loading status for element
#
# @example
#   <button class="btn btn-danger" bn-ui-loading="isLoading">Save</button>
###
angular.module "bn.ui"
    .directive "bnUiLoading", ["$compile", ($compile) ->
        restrict: "A"
        link: (scope, elem, attrs) ->
            elem.css 'width', elem.outerWidth()
            elem.css 'height', elem.outerHeight()

            children = $compile(elem.contents())(scope);
            scope.$watch attrs.bnUiLoading, (value) ->
                elem.attr "disabled", value
                if value
                    elem.prepend '''
                        <div class="in-process"><div><i class="bounce1"></i><i class="bounce2"></i><i class="bounce3"></i></div></div>
                        '''
                    angular.forEach children, (child) ->
                        if angular.element(child)[0].nodeName is '#text'
                            angular.element(child).remove();
                        else
                            angular.element(child).css "visibility", "hidden"
                else
                    angular.element(document.querySelector(".in-process")).remove()
                    angular.forEach children, (child) ->
                        if angular.element(child)[0].nodeName is '#text'
                            elem.append child
                        else 
                            angular.element(child).css "visibility", "visible"
            return
    ]