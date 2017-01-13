@app = angular.module "app", ["bnUi"] 

app.controller "BnUiInputCtrl", [
    "$scope"
    ($scope) ->
        $scope.model = {}
]