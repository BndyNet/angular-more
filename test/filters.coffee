describe "Filters", ->
    
    filter = null
    beforeEach module "bn.ui"
    beforeEach inject (_$filter_) ->
        filter = _$filter_

    describe "Date & Time", ->
        dt = "1/1/2017 01:02:03"
        arg1 = Date.parse dt

        result = "1/1/2017"
        it "#{dt} | appDate -> #{result}", ->
            expect(filter("appDate")(arg1)).toEqual result

        result1 = "Jan 1, 2017 1:02 AM"
        it "#{dt} | appDateTime -> #{result1}", ->
            expect(filter("appDateTime")(arg1)).toEqual result1
        return

    return
