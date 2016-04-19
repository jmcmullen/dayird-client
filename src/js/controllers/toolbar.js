angular.module('toolbar', [])
  .controller('toolbarCtrl', function($scope) {
    $scope.navItems = [
      { label: 'Feed', icon: 'home', state: 'feed' },
      { label: 'Notifications', icon: 'notifications', state: 'notifications' },
      { label: 'Profile', icon: 'person', state: 'profile' }
    ];

  })

;
