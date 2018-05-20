describe("Filters", function() {
  var filter;
  filter = null;
  beforeEach(module("nb.ui"));
  beforeEach(inject(function(_$filter_) {
    return filter = _$filter_;
  }));
  describe("Date & Time", function() {
    var arg1, dt, result, result1;
    dt = "1/1/2017 01:02:03";
    arg1 = Date.parse(dt);
    result = "1/1/2017";
    it(dt + " | appDate -> " + result, function() {
      return expect(filter("appDate")(arg1)).toEqual(result);
    });
    result1 = "Jan 1, 2017 1:02 AM";
    it(dt + " | appDateTime -> " + result1, function() {
      return expect(filter("appDateTime")(arg1)).toEqual(result1);
    });
  });
});
