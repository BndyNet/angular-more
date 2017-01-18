# [Angular More](https://github.com/bndynet/angular-more)

This is the extensions about directives, filters for angular.


## Dependencies

Requires:
 - angular
 - angular-sanitize
 - angular-date-time-input
 - angular-bootstrap-datetimepicker
 - bootstrap
 - [bootstrap-more](https://github.com/bndynet/bootstrap-more)
 - momentjs

## Quick start

- Clone the repo

    `git clone https://github.com/bndynet/angular-more.git`


### What's included

Within the download you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations. You'll see something like this:

```
angular-more/
├── dist/
│   ├── angular-more.css
│   ├── angular-more.min.css
│   ├── angular-more.js
│   └── angular-more.min.js
├── demo/
├── test/
└── src/
```

We provide compiled CSS and JS (`angular-more.*`), as well as compiled and minified CSS and JS (`angular-more.min.*`). 


### Usage

```html
<!-- Latest compiled and minified CSS -->
<link href="angular-more/dist/angular-more.min.css" rel="stylesheet"/>
<!-- Latest compiled and minified JavaScript -->
<script src="angular-more/dist/angular-more.min.js"></script>
```

```js
var app = angular.module("app", ["ngSanitize", "bn.ui.input", "bn.ui.select", ...]);
```

### Testing

Based on [jasmine](https://jasmine.github.io/).


### Examples

#### Directives

##### bn-ui-input

```html
<div class="row">
    <bn-ui-input class="col-xs-4" label="Username" ng-model="model.username" required></bn-ui-input>
    <bn-ui-input class="col-xs-4" label="Birthday" ng-model="model.birthday" type="date" format="MM/DD/YYYY"></bn-ui-input>
    <bn-ui-input class="col-xs-4" label="Date Time" ng-model="model.datetime" type="datetime" format="MM/DD/YYYY h:mm a"></bn-ui-input>
</div>
````#### bn-ui-select```html<bn-ui-select class="col-xs-4" label="Dropdown" ng-model="model.dropdown" ng-source="model.source"></bn-ui-select>``````js$scope.model = {    source: {"option 1": "1", "option 2": "2"},    dropdownn: "2"};```#### bn-ui-checks - source=\{key: value\} - multiple=true/false
 - with-icon=true/false
 - ng-model=object/[]         ```html<bn-ui-checks label="Radio/Checkbox" source="source" ng-model="model" multiple="true" with-icon="true"></bn-ui-checks>``````js$scope.source = {
    "Option 1": "Option 1",
    "Option 2": "Option 2",
    "Option 3": "Option 3",
    "Option 4": "Option 4",
    "Option 5": "Option 5",
};
$scope.model = ["Option 2", "Option 4"];```

#### bn-ui-pager

```html
<bn-ui-pager ng-model="{currentPage: 1, pageSize: 10, recordCount: 108 }" on-page="page(p)"></bn-ui-pager>
```

## Copyright and license

Code and documentation (c) 2014-2017 [Bndy.Net](http://www.bndy.net). Code released under the MIT License. 