SocialApp.controller('GroupMessageController',
    function ($scope, $rootScope, $q, $http, NgTableParams, SpinnerService) {

        $scope.expanded_rowId = undefined;
        $scope.selected_member = undefined;

        $scope.searchMember = null;
        $scope.searchKeyword = null;
        $scope.searchStatus = null;
        $scope.doSearch = null;
        $scope.searchDto = null;
        $scope.sortBy = 'createDate';
        $scope.desc = false;

        $scope.searchStatusOptions = [
            {display: '', value: null},
            {display: 'Read', value: true},
            {display: 'Unread', value: false}
        ];

        $scope.init = function () {

        };

        $scope.reset = function () {
            $scope.searchMember = null;
            $scope.searchKeyword = null;
            $scope.searchStatus = null;
            $scope.doSearch = null;
            $scope.searchDto = null;
            $scope.tableParams.reload();
        };

        $scope.search = function () {
            var memberId = ($scope.searchMember ? $scope.searchMember.id : null);
            $scope.searchDto = {
                memberId: memberId,
                status: $scope.searchStatus,
                keyword: $scope.searchKeyword
            };
            if (!validSearch($scope.searchDto)) {
                return;
            }
            $scope.doSearch = true;

            $scope.tableParams.reload();

            $scope.doSearch = null;

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
                            if ($scope.doSearch) {
                                httpGET = $http.post("app/member/messages?page=" + (params.page() - 1) + "&size=" + params.count() + "&sort=" + $scope.sortBy + "&desc=" + $scope.desc, $scope.searchDto)
                            } else {
                                httpGET = $http.get("app/member/messages?page=" + (params.page() - 1) + "&size=" + params.count() + "&sort=" + $scope.sortBy + "&desc=" + $scope.desc);
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

        let validSearch = function (searchDto) {
            // Check for no search criteria
            if (searchDto.memberId == null && searchDto.status == null && searchDto.keyword == null) {
                alert('Please set at least one search criteria and try again.');
                return false;
            }
            return true;
        };

        $scope.setSort = function (column) {
            $scope.desc = (column === $scope.sortBy) ? !$scope.desc : true;
            $scope.sortBy = column;
            $scope.tableParams.reload();
        }

    });

