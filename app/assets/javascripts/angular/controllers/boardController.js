kanbanApp.controller('BoardCtrl', function($scope, $http) {

	var routes = kanbanApp.routes;

	$http.get( routes.board._index ).success(function(data) {

		$scope.trackers = data.trackers;
		$scope.statuses = data.statuses;
    $scope.tasks = data.tasks;

	});

});