(function () {
    'use strict';
 
    angular
        .module('wizardApp')
        .component('formComponent', {
            templateUrl:  '/app-resources/views/form/form.html',
            controller: 'FormController',
            controllerAs: 'vm'
        })
})();