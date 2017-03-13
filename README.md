# [Angular More](https://github.com/bndynet/angular-more)
 
[Demo](http://bndy.net/angular-more/demo/)

This is the extensions about directives, filters for Angular.


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
    
    `git submodule init`
    
    `git submodule update`
    
- Update node modules

    `npm install`


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
var app = angular.module("app", ["bn.ui"]);
```



### Testing



Based on [Jasmine](https://jasmine.github.io/) and Karma.




### Examples



#### Directives



##### bn-ui-input


```html
<div class="row">
    <bn-ui-input class="col-xs-4" label="Username" ng-model="model.username" required></bn-ui-input>
    <bn-ui-input class="col-xs-4" label="Birthday" ng-model="model.birthday" type="date" format="MM/DD/YYYY"></bn-ui-input>
    <bn-ui-input class="col-xs-4" label="Date Time" ng-model="model.datetime" type="datetime" format="MM/DD/YYYY h:mm a"></bn-ui-input>
</div>
````

#### bn-ui-select

 - ng-model=string
 - source=\{text: value\}

```html
<bn-ui-select class="col-xs-4" label="Dropdown" ng-model="model.dropdown" source="model.source"></bn-ui-select>
```
```js
$scope.model = {
    source: {"option 1": "1", "option 2": "2"},
    dropdown: "2"
};
```

#### bn-ui-checks

 - source=\{text: value\}
 - multiple=true/false
 - with-icon=true/false
 - ng-model=object/[]         
 - show-button=true/false

```html
<bn-ui-checks label="Radio/Checkbox" source="source" ng-model="model" multiple="true" with-icon="true" show-button="true"></bn-ui-checks>
```

```js
$scope.source = {
    "Option 1": "1",
    "Option 2": "2",
    "Option 3": "3",
    "Option 4": "4",
    "Option 5": "5",
};
$scope.model = ["2", "4"];
```


#### bn-ui-pager

 - ng-model={currentPage, pageSize, recordCount}
 - on-page=fn(page)  _//"page" is required_

```html

<bn-ui-pager ng-model="{currentPage: 1, pageSize: 10, recordCount: 108 }" on-page="getData(page)"></bn-ui-pager>

```




## Copyright and license



Code and documentation (c) 2014-2017 [Bndy.Net](http://www.bndy.net). Code released under the MIT License. 
