SocialApp
    .factory("URLSecurity", function ($q, $location, AuthenticationService) {
        return {
            is_authenticated: function () {
                var deferred = $q.defer();

                AuthenticationService.validateAuthorization()
                    .then(function () {
                        deferred.resolve();

                    }, function () {
                        deferred.reject();

                        $location.path('/login');
                    });

                return deferred.promise;
            }
        };
    })
    .config(
        function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: '/app-resources/views/groupMessages.html',
                    controller: 'GroupMessageController',
                    name: 'groupMessage',
                    resolve: {
                        loggedIn: function (URLSecurity) {
                            return URLSecurity.is_authenticated();
                        }
                    }
                })
                .when('/groupMessages', {
                    templateUrl: '/app-resources/views/groupMessages.html',
                    controller: 'GroupMessageController',
                    name: 'groupMessage',
                    resolve: {
                        loggedIn: function (URLSecurity) {
                            return URLSecurity.is_authenticated();
                        }
                    }
                })
                .when('/members', {
                    templateUrl: '/app-resources/views/members.html',
                    controller: 'MemberController',
                    name: 'member',
                    resolve: {
                        loggedIn: function (URLSecurity) {
                            return URLSecurity.is_authenticated();
                        }
                    }
                })
                .when('/channel/:channelUrl', {
                    templateUrl: '/app-resources/views/messageHistory.html',
                    controller: 'MessageHistoryController',
                    name: 'channel',
                    resolve: {
                        loggedIn: function (URLSecurity) {
                            return URLSecurity.is_authenticated();
                        }
                    }
                })
                .when('/memberProfile/:userId', {
                    templateUrl: '/app-resources/views/memberProfile.html',
                    controller: 'MemberProfileController',
                    name: 'memberProfile',
                    resolve: {
                        loggedIn: function (URLSecurity) {
                            return URLSecurity.is_authenticated();
                        }
                    }
                })
                .when('/logs', {
                    templateUrl: 'app-resources/views/logs.html',
                    controller: 'LogController',
                    name: 'log',
                    resolve: {
                        loggedIn: function (URLSecurity) {
                            return URLSecurity.is_authenticated();
                        }
                    }
                })
                .when('/login', {
                    templateUrl: 'app-resources/views/login.html',
                    controller: 'LoginController',
                    name: 'login'
                })

                .when('/logout', {redirectTo: '/login'})
                .otherwise({redirectTo: "/"});
        });

SocialApp.run(
    function ($rootScope, $location, AuthenticationService) {
        $rootScope.navigateTo = function (view) {
            $location.path(view);
        };

        AuthenticationService.registerObserverCallback(
            function (user) {
                $rootScope.current_user = user;
            }
        );

        AuthenticationService.setupAuthorization();
    });

