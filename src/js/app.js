angular.module('myApp', [
  'ui.router.state',
  'facebook',
  'toolbar',
  'login',
  'feed',
  'inbox',
  'profile'
])

.constant('API_URL', 'http://localhost:3000/api')
.constant('FACEBOOK_ID', '198055393910236')

.config(function(FacebookProvider, FACEBOOK_ID) {
  FacebookProvider.init(FACEBOOK_ID);
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('main', {
    url: '/',
    views: {
      'main': {
        controller: 'MainCtrl',
        resolve: {
          currentUser: function(UserService) {
            return UserService.getCurrentUser();
          }
        }
      },
    },
  });

  $urlRouterProvider.otherwise(function($injector, $location) {
    $location.replace();
    $location.path('/');
  });

})

// Check if the user is logged in.
.controller('HomeCtrl', function HomeCtrl($scope, $state, currentUser) {
  $state.go(currentUser ? 'feed':'login');
})

.service('UserService', function($http, API_URL) {
  return {
    getCurrentUser: function() {
      return $http({
        method: 'GET',
        url: API_URL + '/current-user/'
      }).success(function(response) {
        return response.data;
      });
    }
  };
});
