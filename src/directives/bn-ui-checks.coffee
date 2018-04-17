###!
# Radio or Check Buttons
#
# @param {object} nb-model
# @param {string} nb-label - The label
# @param {object} nb-source - [{"labelField": "value", "valueField": "value"}, ...]
# @param {boolean} nb-multiple - Optional, default false
# @param {boolean} nb-with-icon - Optional, default false
# @param {boolean} nb-show-button - Optional, default false
# @param {function} nb-on-change- Optional, fn(data)
#
###
angular.module "bn.ui"
    .directive "bnUiChecks", 
    ->
        restrict: "E"
        scope:
            nbModel: "=?"
            nbLabel: "@"
            nbSource: "="
            nbTextField: "@"
            nbValueField: "@"
            nbMultiple: "=?"
            nbWithIcon: "=?"
            nbShowButton: "=?"
            nbOnChange: "&?"
        template: '''
            <div class="form-group">
                <label ng-bind-html="nbLabel" ng-if="nbLabel"></label>
                <div>
                    <div class="{{nbShowButton ? 'btn-group' : 'form-control-static'}}">
                        <label ng-class="{'btn btn-default': nbShowButton, 'active': nbShowButton && isExisted(item)}" ng-repeat="item in nbSource"
                            ng-class="{active: isExisted(item)}" ng-click="itemClick(item)">
                            <i class="glyphicon fa fa-fw {{nbMultiple?\'glyphicon-check fa-check-square-o\':\'glyphicon-check fa-dot-circle-o\'}}" ng-show="isExisted(item) && showIcon()"></i>
                            <i class="glyphicon fa fa-fw {{nbMultiple?\'glyphicon-unchecked fa-square-o\':\'glyphicon-unchecked fa-circle-o\'}}" ng-show="!isExisted(item) && showIcon()"></i>
                            <span>{{getItemText(item)}}</span>
                        </label>
                    </div>
                </div>
            </div>
        '''
        link: (scope, ele, attrs) ->
            checkedItems = [];
            if typeof scope.nbModel is 'undefined'
                scope.nbModel = if scope.nbMultiple then [] else null

            syncModel = ->
                if scope.nbMultiple
                    scope.nbModel.length = 0;
                    angular.forEach checkedItems, (checkedItem) ->
                        scope.nbModel.push checkedItem[scope.nbValueField]
                else
                    scope.nbModel = if checkedItems.length > 0 then checkedItems[0][scope.nbValueField] else null

            if scope.nbModel
                if angular.isArray(scope.nbModel)
                    angular.forEach scope.nbModel, (item) -> 
                        angular.forEach scope.nbSource, (sourceItem) -> 
                            checkedItems.push sourceItem if sourceItem[scope.nbValueField] is item
                else 
                    angular.forEach scope.nbSource, (sourceItem) ->
                        checkedItems.push sourceItem if sourceItem[scope.nbValueField] is scope.nbModel
            
            scope.nbMultiple = false if typeof scope.nbMultiple is "undefined"
            scope.nbWithIcon = false if typeof scope.nbWithIcon is "undefined"
            scope.nbShowButton = true if not scope.nbWithIcon
            scope.$watch "nbWithIcon", (value) -> 
                scope.nbShowButton = true if not value
            scope.$watch "nbShowButton", (value) -> 
                scope.nbWithIcon = true if not value
            scope.showIcon = ->
                if typeof scope.nbWithIcon is "undefined" then false else scope.nbWithIcon
            scope.isExisted = (item) ->
                return false if checkedItems.length is 0
                if scope.nbMultiple 
                    return checkedItems.indexOf(item) >= 0 
                else if checkedItems.length > 0
                    return checkedItems[0] == item
                return false
            scope.getItemText = (item) ->
                item[scope.nbTextField]
            scope.itemClick = (item) ->
                if scope.nbMultiple
                    if checkedItems.indexOf(item) < 0
                        checkedItems.push(item)
                    else
                        checkedItems.splice checkedItems.indexOf(item), 1
                else
                    checkedItems.length = 0
                    checkedItems.push item
                syncModel()
                scope.nbOnChange {data: scope.nbModel} if scope.nbOnChange
            return