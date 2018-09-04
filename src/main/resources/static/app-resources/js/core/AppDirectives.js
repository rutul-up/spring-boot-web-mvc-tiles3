SocialApp.directive('httpQueryRequestLog', function () {
    return {
        restrict: 'A',
        scope: {
            requestLog: '=httpQueryRequestLog'
        },

        link: function ($scope, elem, attrs, ctrl) {

        },
        templateUrl: 'app-resources/views/httpQueryRequestLog.html'
    };
});

SocialApp.directive('httpQueryResponseLog', function () {
    return {
        restrict: 'A',
        scope: {
            responseLog: '=httpQueryResponseLog'
        },

        link: function ($scope, elem, attrs, ctrl) {

        },
        templateUrl: 'app-resources/views/httpQueryResponseLog.html'
    };
});

SocialApp.directive('httpQueryComments', function () {
    return {
        restrict: 'A',
        scope: {
            comments: '=httpQueryComments'
        },

        link: function ($scope, elem, attrs, ctrl) {

        },
        templateUrl: 'app-resources/views/httpQueryComments.html'
    };
});

SocialApp.directive('httpQueryLog', function () {
    return {
        restrict: 'A',
        scope: {
            httpQueryLog: '=httpQueryLog',
            title: '@httpQueryLogTitle'
        },

        link: function ($scope, elem, attrs, ctrl) {

        },
        templateUrl: 'app-resources/views/httpQueryLog.html'
    };
});

SocialApp.directive('httpQueryThrowable', function () {
    return {
        restrict: 'A',
        scope: {
            throwable: '=httpQueryThrowable'
        },

        link: function ($scope, elem, attrs, ctrl) {

        },
        templateUrl: 'app-resources/views/httpQueryThrowable.html'
    };
});

SocialApp
    .controller('EllipsisModalController',
        function ($scope, $uibModalInstance, $uibModalParams) {

            $scope.init = function () {
                $scope.string = $uibModalParams.string;
                $scope.title = $uibModalParams.title;
                $scope.jsonString = $scope.isJson($scope.string);
            };

            $scope.close = function () {
                $uibModalInstance.dismiss();
            };

            $scope.beautifyJson = function (string) {
                if (string) {
                    var json = '';
                    if (typeof json != 'string') {
                        json = JSON.stringify(json, undefined, 2);
                    } else {
                        try {
                            json = JSON.stringify(JSON.parse(string), undefined, 2);
                        } catch (e) {
                            return string;
                        }
                    }

                    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                        var cls = 'number';
                        if (/^"/.test(match)) {
                            if (/:$/.test(match)) {
                                cls = 'key';
                            } else {
                                cls = 'string';
                            }
                        } else if (/true|false/.test(match)) {
                            cls = 'boolean';
                        } else if (/null/.test(match)) {
                            cls = 'null';
                        }
                        return '<span class="' + cls + '">' + match + '</span>';
                    });
                }

                return string;

            };

            $scope.isJson = function (string) {
                try {
                    JSON.parse(string)
                } catch (e) {
                    return false;
                }

                return true;
            };

        })
    .directive('ellipsis', function ($uibModal) {

        return {
            restrict: 'A',
            scope: {
                string: '=ellipsis',
                length: '@ellipsisLength',
                title: '@ellipsisTitle'
            },

            link: function ($scope, elem, attrs, ctrl) {

                $scope.modal = function () {
                    var modalInstance = $uibModal.open({
                        templateUrl: '/app-resources/views/ellipsisModal.html',
                        windowClass: 'ellipsis-modal-widow',
                        controller: 'EllipsisModalController',
                        backdrop: 'static',
                        resolve: {
                            $uibModalParams: function () {
                                return {
                                    string: $scope.string,
                                    title: $scope.title
                                };
                            }
                        }
                    });

                    modalInstance.result.then(
                        function () {
                        }
                    );
                };


            },
            templateUrl: '/app-resources/views/ellipsis.html'
        };
    });

SocialApp
    .directive('selectMember', function ($timeout, $http, $filter) {
        return {
            restrict: 'E',
            require: 'ngModel',
            scope: {
                member: '=ngModel',
                limit: '@',
                placeholder: '@',
                magnifier: '@',
                ngDisabled: '='
            },

            link: function ($scope, elem, attrs, ctrl) {
                $scope.limit = $scope.limit || "10";

                $scope.searchMembers = function (matcher) {

                    return $http.get("app/member/search?matcher=" + encodeURIComponent(matcher))
                        .then(function (response) {
                            return response.data.slice(0, $scope.limit);
                        });
                };

                $scope.stringify = function (member) {
                    return $filter('member')(member);
                };

                $scope.memberSelected = function () {
                    ctrl.$setViewValue($scope.member);
                };

                $scope.clear = function () {
                    $scope.member = undefined;
                    $scope.memberSelected();
                };
            },
            templateUrl: '/app-resources/views/typeaheadMemberSelector.html'
        };
    });

SocialApp
    .directive('openFileSelector', function () {
        return {
            restrict: 'A',
            link: function (scope, element) {

                element.bind('click', function (e) {
                    angular.element('#openFileSelector').trigger('click');
                });
            }
        };
    });

SocialApp.directive('sortIndicator', function ($compile) {
    var sortNotSelectedTemplate = '<span class="glyphicon glyphicon-sort" style="color:rgb(146,146,146);" aria-hidden="true"></span>';
    var sortAscTemplate = '<span class="glyphicon glyphicon-sort-by-alphabet" style="color:rgb(146,146,146);" aria-hidden="true"></span>';
    var sortDescTemplate = '<span class="glyphicon glyphicon-sort-by-alphabet-alt" style="color:rgb(146,146,146);" aria-hidden="true"></span>';

    var getTemplate = function (selected, desc) {
        if (selected && !desc) {
            return sortAscTemplate;
        } else if (selected && desc) {
            return sortDescTemplate
        }

        return sortNotSelectedTemplate;
    };

    var linker = function (scope, element, attrs) {
        var setHtml = function (selected, desc) {
            element.html(getTemplate(selected, desc));
            $compile(element.contents())(scope);
        };

        // Watch for changes to the attributes
        scope.$watchCollection('[selected, desc]', function (newValues) {
            setHtml(newValues[0], newValues[1]);
        });

        // Init
        setHtml(scope.selected, scope.desc);
    };

    return {
        restrict : 'E',
        link : linker,
        scope : {
            selected : '=',
            desc : '='
        }
    };
});

