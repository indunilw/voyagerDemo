'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'templates/dashboard.html'
            })
            .state('tables', {
                url: '/tables',
                templateUrl: 'templates/tables.html'
            })
            .state('movies',{
                url: '/movies',
                templateUrl: 'json/favorites.json'
            })
            .state('popup',{
                url: '/popup',
                templateUrl: 'templates/MovieCard.html'
            })
            .state('login',{
                url:'/login',
                templateUrl:'templates/tables.html'
            })
            .state('about',{
                url:'/about',
                templateUrl:'templates/About.html'
            });
            
    }
]);