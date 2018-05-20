describe "Directives", ->
    $compile = null
    $rootScope = null
    $scope = null

    beforeEach ->
        module "nb.ui"
    beforeEach inject (_$compile_, _$rootScope_) ->
        $rootScope = _$rootScope_
        $scope = $rootScope.$new()
        $compile = _$compile_

    it "Render Pagination Component using <nb-ui-pager nb-model={} />", ->
        $scope.model =
            currentPage: 1
            pageSize: 10
            recordCount: 108

        ele = $compile("<nb-ui-pager nb-model='model' />") $scope
        $scope.$digest()
        expect(ele.find("li").length).toEqual(12)
        return

    it "Fill Height to Parent via @nb-fill-height", ->
        ele = $compile("<div style='height:200px; background-color: #dedede;'><div id='target' bn-fill-height style='background-color: rgba(255,0,0, .4);'></div></div>")($scope)
        expect(ele.html()).toContain("height:");
        return

    return
