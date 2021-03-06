describe("Directives", function() {
  var $compile, $rootScope, $scope;
  $compile = null;
  $rootScope = null;
  $scope = null;
  beforeEach(function() {
    return module("nb.ui");
  });
  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    return $compile = _$compile_;
  }));
  it("Render Pagination Component using <nb-ui-pager nb-model={} />", function() {
    var ele;
    $scope.model = {
      currentPage: 1,
      pageSize: 10,
      recordCount: 108
    };
    ele = $compile("<nb-ui-pager nb-model='model' />")($scope);
    $scope.$digest();
    expect(ele.find("li").length).toEqual(12);
  });
  it("Fill Height to Parent via @nb-fill-height", function() {
    var ele;
    ele = $compile("<div style='height:200px; background-color: #dedede;'><div id='target' bn-fill-height style='background-color: rgba(255,0,0, .4);'></div></div>")($scope);
    expect(ele.html()).toContain("height:");
  });
});
