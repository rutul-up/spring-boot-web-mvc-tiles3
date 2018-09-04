SocialApp.controller('MessageHistoryController',
    function ($scope, $routeParams, $rootScope, $q, $http, NgTableParams, SpinnerService) {


        var channelUrl = $routeParams.channelUrl;


        $scope.init = function () {
            $scope.channelUrl = channelUrl;
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

                            var httpGET = $http.get("app/member/messageHistory/"+ channelUrl +"?page=" + (params.page() - 1) + "&size=" + params.count());


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




    });

