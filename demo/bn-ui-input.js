this.app = angular.module("app", ["bnUi"]);

app.controller("BnUiInputCtrl", [
  "$scope", function($scope) {
    return $scope.model = {};
  }
]);
