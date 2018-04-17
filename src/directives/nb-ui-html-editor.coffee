###!
# Html Editor
#
# @example
#   <nb-ui-html-editor ng-model="content"></nb-ui-html-editor>
###
angular.module "nb.ui"
    .directive "nbUiHtmlEditor", ->
        restrict: "E"
        require: '?ngModel'
        link: (scope, elem, attrs, ngModel) ->
            if typeof CKEDITOR is 'undefined'
                throw new Error('Can not find CKEDITOR')

            CKEDITOR.config.height = 360
            ck = CKEDITOR.replace elm[0]
            return if not ngModel 

            ck.on 'instanceReady', ->
                ck.setData ngModel.$viewValue

            updateModel = ->
                scope.$apply ->
                    ngModel.$setViewValue ck.getData()

            ck.on 'change', updateModel
            ck.on 'key', updateModel
            ck.on 'dataReady', updateModel

            ngModel.$render = (value) ->
                ck.setData ngModel.$viewValue

            return