

SocialApp.controller('MemberProfileController',
    function ($scope, $routeParams, $rootScope, $q, $http, NgTableParams, SpinnerService) {

        $scope.expanded_rowId = undefined;
        $scope.selected_member = undefined;

        $scope.queryParam;

        $scope.memberProfile = null;


        function populateMemberProfile() {
            $scope.userId = $routeParams.userId;
            console.log('User is', $scope.userId);
            console.log("Do some magic" )
        }

        $scope.init = function () {

            populateMemberProfile();
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

