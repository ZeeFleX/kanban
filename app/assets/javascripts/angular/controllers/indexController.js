kanbanApp.controller('IndexCtrl', function($scope, $http) {

	$http.get('/index/index.json').success(function(data) {
    $scope.users = data;
	});

});