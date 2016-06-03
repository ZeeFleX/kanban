kanbanApp.controller('BoardCtrl', function($scope, $http) {

	var routes = kanbanApp.routes;
	$scope.css = {};

	$http({

	  method: 'GET',
	  url: '/board/get_board',
	  params:  {
	  	user_id: 1
	  },

	}).then(function successCallback(response) {

		$scope.swimlanes = response.data.swimlanes;
		$scope.statuses = response.data.statuses;
    $scope.tasks = response.data.tasks;

    $scope.css.statusStyle = {
    	width: 100 / $scope.statuses.length + '%'
    };

  }, function errorCallback(response) {
    console.log(data);
  });

});