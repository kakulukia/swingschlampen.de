'use strict';

angular.module('bootstrap.tabset', [])
    .directive('tabset', function () {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            controller: function($scope, $location) {
                $scope.templateUrl = '';
                var tabs = $scope.tabs = [];
                var controller = this;

                this.selectTab = function (tab) {
                    angular.forEach(tabs, function (tab) {
                        tab.selected = false;
                    });
                    tab.selected = true;
                    $location.path(tab.title);
                };

                this.setTabTemplate = function (templateUrl) {
                    $scope.templateUrl = templateUrl;
                }

                this.addTab = function (tab) {
                    if ($location.path() != '') {
                        if ('/' + tab.title == $location.path()){
                            controller.selectTab(tab);
                        }
                    }
                    else {
                        if (tabs.length == 0 || '/' + tab.title == $location.path()) {
                            controller.selectTab(tab);
                        }
                    }
                    tabs.push(tab);
                };
            },
            template:
                '<div class="row-fluid">' +
                '<div class="row-fluid">' +
                '<ul class="navtabs" ng-transclude></ul>' +
                '</div>' +
                '<div class="row-fluid">' +
                '<ng-include src="templateUrl">' +
                '</ng-include></div>' +
                '</div>'
        };
    })
    .directive('tab', function () {
        return {
            restrict: 'E',
            replace: true,
            require: '^tabset',
            scope: {
                title: '@',
                templateUrl: '@'
            },
            link: function(scope, element, attrs, tabsetController) {
                tabsetController.addTab(scope);

                scope.select = function () {
                    tabsetController.selectTab(scope);
                }

                scope.$watch('selected', function () {
                    if (scope.selected) {
                        tabsetController.setTabTemplate(scope.templateUrl);
                    }
                });
            },
            template:
                '<li ng-class="{active: selected}">' +
                '<a href="" ng-click="select()">{{ title }}</a>' +
                '</li>'
        };
    });
