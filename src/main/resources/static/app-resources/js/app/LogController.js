SocialApp.controller('LogController',
    function ($scope, $rootScope, $q, $http, NgTableParams, SpinnerService) {

        $scope.expanded_rowId = undefined;
        $scope.selected_member = undefined;

        $scope.init = function () {

        };

        $scope.memberSelected = function () {
            $scope.reload();
        };

        $scope.reload = function () {
            if ($scope.tableParams.page() === 1) {
                $scope.tableParams.reload();
            } else {
                $scope.tableParams.page(1);
            }
        };

        $scope.tableParams = new NgTableParams(
            {
                page: 1,
                count: 50
            },
            {
                counts: [50, 100, 250, 500],
                filterDelay: 100,
                getData: function (params) {

                    return $q(
                        function (resolve, reject) {

                            SpinnerService.start();

                            var httpGET;
                            if ($scope.selected_member) {
                                httpGET = $http.get("app/requestLogs/member/" + $scope.selected_member.id + "/all?page=" + (params.page() - 1) + "&size=" + params.count())
                            } else {
                                httpGET = $http.get("app/requestLogs/all?page=" + (params.page() - 1) + "&size=" + params.count());
                            }

                            httpGET.then(
                                function (payload) {
                                    var page = payload.data;

                                    params.total(page.totalElements);
                                    SpinnerService.stop();

                                    resolve(page.content);
                                },
                                function (err) {
                                    console.log(err);

                                    SpinnerService.stop();

                                    reject([]);
                                }
                            );

                        }
                    );
                }
            }
        );


        $scope.expand = function (rowId) {
            if (rowId === $scope.expanded_rowId) {
                $scope.expanded_rowId = undefined;
            } else {
                $scope.expanded_rowId = rowId;
            }
        };

    });

