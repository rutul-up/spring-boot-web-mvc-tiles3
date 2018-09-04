SocialApp.controller('HomeController',
    function ($scope, $rootScope, $q, $http, NgTableParams, SpinnerService) {

        $scope.tab_name = "MEMBERS";



        /* $scope.tabs = [
             {link: '/', label: 'Email'},
             {link: '/#!/push', label: 'Push'}
         ];

         $scope.selectedTab = $scope.tabs[0];
         $scope.setSelectedTab = function (tab) {
             $scope.selectedTab = tab;
         };

         $scope.tabClass = function (tab) {
             if ($scope.selectedTab === tab) {
                 return "active";
             } else {
                 return "";
             }
         }*/




        $scope.tab_nameChanged = function (tab_name) {
            if ($scope.tab_name !== tab_name) {

                $scope.tab_name = tab_name;

            }
        };
    });

