angular.module('feed', [])

.config(function config($stateProvider, $urlRouterProvider) {
  $stateProvider.state('feed', {
    url: '/Feed',
    'abstract': true,
    views: {
      "main": {
        controller: 'FeedCtrl',
        templateUrl: '../../views/feed.html'
      }
    },
    data:{ pageTitle: 'Dayird - Feed' }
  })

  /*.state('feed.post', {
    url: '/post',
    controller: 'PostFeedCtrl',
    templateUrl: '../../views/feed-post.html'
  });*/

  //$urlRouterProvider.when('/school-admin', '/school-admin/settings');
})

.controller('feedCtrl', function($scope) {
  $scope.message = 'Feed View';

})

;
