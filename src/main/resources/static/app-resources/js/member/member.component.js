(function () {
    'use strict';
 
    angular
        .module('wizardApp')
        .component('memberComponent', {
            templateUrl:  'app-resources/views/personal/personal.html',
            controller: 'MemberController',
            controllerAs: 'vm',
        })
})();