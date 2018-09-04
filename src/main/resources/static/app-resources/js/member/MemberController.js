SocialApp.controller('MemberController',
    function ($scope, $rootScope, $q, $http, NgTableParams, SpinnerService) {

        $scope.expanded_rowId = undefined;
        $scope.selected_member = undefined;
        $scope.stats;
        $scope.sortBy = 'profileName';
        $scope.desc = false;
        $scope.queryParam;

        $scope.init = function () {
            socialStats();
        };

        let socialStats = function () {
            console.log("Populate social stats");
            var httpGET = $http.get("app/member/stat");


            httpGET.then(
                function (payload) {
                    $scope.stats = payload.data;
                    SpinnerService.stop();

                },
                function (err) {
                    console.log(err);

                    SpinnerService.stop();

                    reject([]);
                }
            );
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
                                $scope.queryParam = "page=" + (params.page() - 1) + "&size=" + params.count() + "&memberId=" + $scope.selected_member.id;
                                httpGET = $http.get("app/member/socialUsers?" + $scope.queryParam);
                            } else {
                                $scope.queryParam = "page=" + (params.page() - 1) + "&size=" + params.count() + "&sort=" + $scope.sortBy + "&desc=" + $scope.desc;
                                httpGET = $http.get("app/member/socialUsers?" + $scope.queryParam);
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

        $scope.setSort = function (column) {
            $scope.desc = (column === $scope.sortBy) ? !$scope.desc : true;
            $scope.sortBy = column;
            $scope.tableParams.reload();
        };

        $scope.export = function () {
            alert("export " + $scope.queryParam);
            //location.href = 'app/member/exportUsers?' + $scope.queryParam;
            $http.get('app/member/exportUsers?page=0&size=10000&' + $scope.queryParam).then(function (response) {
                let csvData;
                let data = {};

                data.headerData = 'User,Member,Status,Channels\n';
                data.filename = 'members.csv';
                data.csvData = response.data;

                downloadCSV(data);
            });
        };


        function downloadCSV(args) {

            let data, filename, link;
            let header = args.headerData;
            let csv = header + args.csvData;
            if (csv == null) return;

            filename = args.filename || 'export.csv';

            if (!csv.match(/^data:text\/csv/i)) {
                csv = 'data:text/csv;charset=utf-8,' + csv;
            }
            data = encodeURI(csv);

            link = document.createElement('a');
            link.setAttribute('href', data);
            link.setAttribute('download', filename);
            link.click();
        }
    });

