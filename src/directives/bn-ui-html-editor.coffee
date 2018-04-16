###!
# Html Editor
#
# @example
#   <bn-ui-html-editor ng-model="content"></bn-ui-html-editor>
###
angular.module "bn.ui"
    .directive "bnUiHtmlEditor", ->
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