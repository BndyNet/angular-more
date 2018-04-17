###!
# Renders a dropdown list
#
# @param {string} nb-label
# @param {object} nb-model
# @param {array} nb-source - [{label: '', value: ''}]
# @param {function} nb-on-change - fn(data)
###
angular.module "nb.ui"
    .directive "nbUiSelect", [
        ->
            restrict: "E"
            scope: 
                nbModel: "="
                nbSource: "="
                nbTextField: "@"
                nbValueField: "@"
                nbLabel: "@?"
                nbMultiple: "=?"
                nbPlaceholder: "@?"
                nbOnChange: "&?"
            template: '''
                <div class="form-group">
                    <label ng-bind-html="nbLabel" ng-if="nbLabel"></label>
                    <a class="form-control" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="placeholder" ng-if="selectedItems.length === 0">{{nbPlaceholder}}</span>
                        <span class="label label-primary" ng-repeat="item in selectedItems track by $index">
                            <span>{{item[nbTextField]}}</span>
                        </span>
                        <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="dLabel">
                        <li class="placeholder" ng-if="nbPlaceholder && !nbMultiple">
                            <a ng-click="onchange(null)">{{nbPlaceholder}}</a>
                        </li>
                        <li ng-repeat="item in nbSource track by $index">
                            <a ng-click="onchange(item)">
                                <i class="glyphicon glyphicon-ok" aria-hidden="true" ng-show="item.__selected"></i>
                                <span>{{item[nbTextField]}}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            '''
            link: (scope, elem, attrs) ->
                scope.selectedItems = []
                if scope.nbModel
                    angular.forEach scope.nbSource, (itemSource) ->
                        if angular.isArray(scope.nbModel)
                            angular.forEach scope.nbModel, (item) ->
                                if item is itemSource[scope.nbValueField]
                                    itemSource.__selected = true
                                    scope.selectedItems.push itemSource 
                        else 
                            if itemSource[scope.nbValueField] is scope.nbModel
                                itemSource.__selected = true
                                scope.selectedItems.push itemSource
                        return

                scope.onchange = (item) ->
                    if not item and not scope.nbMultiple
                        itemSource.__selected = false for itemSource in scope.nbSource
                        scope.selectedItems.length = 0
                        scope.nbModel = null
                        return;

                    if item.__selected and not scope.nbMultiple
                        return

                    if not scope.nbMultiple
                        itemSource.__selected = false for itemSource in scope.nbSource

                    item.__selected = !item.__selected
                    if item.__selected
                        if scope.nbMultiple
                            if scope.selectedItems.indexOf(item) < 0
                                scope.selectedItems.push item
                        else
                            scope.selectedItems.length = 0
                            scope.selectedItems.push item
                    else
                        if scope.selectedItems.indexOf(item) >= 0
                            scope.selectedItems.splice scope.selectedItems.indexOf(item), 1  and !item.__selected

                    selectedValues = []
                    selectedValues.push selectedItem[scope.nbValueField] for selectedItem in scope.selectedItems

                    if selectedValues.length > 0
                        scope.nbModel = if scope.nbMultiple then angular.copy(selectedValues) else selectedValues[0]
                    else
                        if scope.nbMultiple
                            scope.nbModel = angular.copy([]) 
                        else
                            scope.nbModel = null

                    scope.nbOnChange {data: scope.nbModel} if scope.nbOnChange
                    return;

                return
    ]