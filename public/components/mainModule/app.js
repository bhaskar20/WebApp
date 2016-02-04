'use strict';
angular
    .module('logiWebMain', [
        'oc.lazyLoad',
        'ui.router',
        'ui.bootstrap',
        'angular-loading-bar',
        'uiGmapgoogle-maps'
    ])
    .constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    })
    .run(function($rootScope, $state, loginService) {
        Parse.initialize("UKcM4qKQUwfsF7UTQbQ0u6feYVJaBLNpD4uP8zFQ",
            "euwUL2zze4fkotAp8NLr0DoTgE093Dnfi4OVVU2K");
        $rootScope.$on("auth-login-success", function() {
            $state.transitionTo("dashboard.home");
        });
        $rootScope.$on("auth-logout-success", function() {
            $state.transitionTo("home");
        });
        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
            if (toState.name === "login" && loginService.isAuthenticated()) {
                $state.transitionTo("dashboard.home");
                event.preventDefault();
            }
            if (toState.authenticate && !loginService.isAuthenticated()) {
                $state.transitionTo("home");
                event.preventDefault();
            }
        })
    })
    .config(['$stateProvider', 'AUTH_EVENTS', '$urlRouterProvider', '$ocLazyLoadProvider', '$locationProvider','uiGmapGoogleMapApiProvider',
function($stateProvider, AUTH_EVENTS, $urlRouterProvider, $ocLazyLoadProvider, $locationProvider,uiGmapGoogleMapApiProvider) {
            $locationProvider.html5Mode(true);
            $ocLazyLoadProvider.config({
                debug: true,
                events: true,
            });
            //map
                uiGmapGoogleMapApiProvider.configure({
                    //    key: 'your api key',
                    v: '3.20', //defaults to latest 3.X anyhow
                    libraries: 'weather,geometry,visualization'
                });


            $urlRouterProvider.otherwise('/home');

            $stateProvider
                .state('dashboard', {
                    url: '/dashboard',
                    authenticate: true,
                    templateUrl: 'components/dashboard/main.html',
                    resolve: {
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                    name: 'logiWebMain',
                                    files: [
                                        'components/header/header.js',
                                        'components/sidebar/sidebar.js',
                                        'components/sidebar-search/sidebar-search.js'
                                    ]
                                }),
                                $ocLazyLoad.load({
                                    name: 'toggle-switch',
                                    files: ["libs/angular-toggle-switch/angular-toggle-switch.min.js",
                                        "libs/angular-toggle-switch/angular-toggle-switch.css"
                                    ]
                                }),
                                $ocLazyLoad.load({
                                    name: 'ngAnimate',
                                    files: ['libs/angular-animate/angular-animate.js']
                                }),
                                $ocLazyLoad.load({
                                    name: 'ngCookies',
                                    files: ['libs/angular-cookies/angular-cookies.js']
                                }),
                                $ocLazyLoad.load({
                                    name: 'ngResource',
                                    files: ['libs/angular-resource/angular-resource.js']
                                }),
                                $ocLazyLoad.load({
                                    name: 'ngSanitize',
                                    files: ['libs/angular-sanitize/angular-sanitize.js']
                                })
                                // $ocLazyLoad.load({
                                //     name: 'ngTouch',
                                //     files: ['libs/angular-touch/angular-touch.js']
                                // })
                        }
                    }
                })
                .state('dashboard.home', {
                    url: '/home',
                    controller: 'dashboardHomeCtrl',
                    templateUrl: 'components/dashboard-home/dashboardHome.html',
                    resolve: {
                        loadMyFiles: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'logiWebMain',
                                files: [
                                    'components/dashboard-home/dashboardHome.js',
                                    'components/directives/stats/stats.js'
                                ]
                            })
                        }
                    }
                })
                .state('dashboard.reqOrder', {
                    templateUrl: 'components/req-order/reqOrder.html',
                    controller: 'reqOrderCtrl',
                    url: '/reqorder',
                    authenticate: true,
                    serie: true,
                    resolve: {
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: "logiWebMain",
                                files: [
                                    'components/req-order/reqOrderService.js',
                                    'components/req-order/reqOrder.js'
                                ]
                            })
                        }
                    }
                })
                .state('dashboard.order', {
                    templateUrl: 'components/order/order.html',
                    url: '/order',
                    controller: 'orderCtrl',
                    authenticate: true,
                    serie: true,
                    resolve: {
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: "logiWebMain",
                                files: [
                                    'components/order/orderService.js',
                                    'components/order/order.js'
                                ]
                            })

                        }
                    }
                })
                .state('dashboard.orderHistory', {
                    templateUrl: 'components/order-history/orderHistory.html',
                    url: '/order-history',
                    authenticate: true,
                    serie: true,
                    resolve: {
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: "logiWebMain",
                                files: [
                                    'components/order-history/orderHistoryService.js',
                                    'components/order-history/orderHistory.js'
                                ]
                            })
                        }
                    }
                })
                .state('dashboard.assignedTrips', {
                    templateUrl: 'components/assigned-trips/assignedTrips.html',
                    url: '/assigned-trips',
                    authenticate: true,
                    serie: true,
                    resolve: {
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: "logiWebMain",
                                files: [
                                    'components/assigned-trips/assignedTripsService.js',
                                    'components/assigned-trips/assignedTrips.js'
                                ]
                            })
                        }
                    }
                })
                .state('dashboard.ongoingTrips', {
                    templateUrl: 'components/ongoing-trips/ongoingTrips.html',
                    url: '/ongoing-trips',
                    authenticate: true,
                    serie: true,
                    resolve: {
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: "logiWebMain",
                                files: [
                                    'components/ongoing-trips/ongoingTripsService.js',
                                    'components/ongoing-trips/ongoingTrips.js'
                                ]
                            })
                        }
                    }
                })
                .state('dashboard.maps', {
                    templateUrl: 'components/maps/map.html',
                    url: '/map',
                    authenticate: true,
                    controller: 'mapController',
                    serie: true,
                    resolve: {
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                    name: "logiWebMain",
                                    files: [
                                        'components/maps/mapService.js',
                                        'components/maps/mapController.js'
                                    ]
                                })
                                
                        }
                    }
                })
                // .state('dashboard.panels-wells', {
                //     templateUrl: 'views/ui-elements/panels-wells.html',
                //     url: '/panels-wells'
                // })
                // .state('dashboard.buttons', {
                //     templateUrl: 'views/ui-elements/buttons.html',
                //     url: '/buttons'
                // })
                // .state('dashboard.notifications', {
                //     templateUrl: 'views/ui-elements/notifications.html',
                //     url: '/notifications'
                // })
                // .state('dashboard.typography', {
                //     templateUrl: 'views/ui-elements/typography.html',
                //     url: '/typography'
                // })
                // .state('dashboard.icons', {
                //     templateUrl: 'views/ui-elements/icons.html',
                //     url: '/icons'
                // })
                // .state('dashboard.grid', {
                //     templateUrl: 'views/ui-elements/grid.html',
                //     url: '/grid'
                // })
                .state('home', {
                    templateUrl: 'components/staticpart/home.html',
                    url: '/home',
                    authenticate: false,
                    resolve: {
                        loadMyFile: function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [
                                    'libs/modernizr.custom.js',
                                    'libs/move-top.js',
                                    /*'libs/easing.js',*/
                                    'libs/classie.js',
                                    'css/style.css',
                                    'libs/responsiveslides.min.js',
                                ]
                            })
                        }
                    }
                })
                // .state('about', {
                //     templateUrl: 'components/staticpart/about.html',
                //     url: '/about',
                //     authenticate: false,
                //     resolve: {
                //         loadMyFile: function($ocLazyLoad) {
                //             return $ocLazyLoad.load({
                //                 files: [
                //                     'libs/modernizr.custom.js',
                //                     'libs/move-top.js',
                //                     'libs/easing.js',
                //                     'libs/classie.js',
                //                     'libs/uisearch.js',
                //                     'css/style.css'
                //                 ]
                //             })
                //         }
                //     }
                // })
                // .state('contact', {
                //     templateUrl: 'components/staticpart/contact.html',
                //     url: '/contact',
                //     authenticate: false,
                //     resolve: {
                //         loadMyFile: function($ocLazyLoad) {
                //             return $ocLazyLoad.load({
                //                 files: [
                //                     'libs/modernizr.custom.js',
                //                     'libs/move-top.js',
                //                     'libs/easing.js',
                //                     'libs/classie.js',
                //                     'libs/uisearch.js',
                //                     'css/style.css'
                //                 ]
                //             })
                //         }
                //     }
                // })
                // .state('login', {
                //     templateUrl: 'components/login/login.html',
                //     url: '/login',
                //     controller: 'loginCtrl',
                //     authenticate: false,
                //     resolve: {
                //         function($ocLazyLoad) {
                //             return $ocLazyLoad.load({
                //                 name: "logiWebMain",
                //             })
                //         }
                //     }
                // })
        }
    ]);
