kanbanApp.controller('BoardCtrl', function($scope, $http) {

	var routes = kanbanApp.routes;
	$scope.css = {};
	$scope.sortableOptions = [];

	function createOptions (status_id) {
    var options = {
      connectWith: ".k-tasks",
      cursor: "move",
      revert: 200,
      activate: function() {

      },
      beforeStop: function() {

      },
      change: function() {

      },
      create: function() {

      },
      deactivate: function() {

      },
      out: function() {

      },
      over: function( e, ui ) {
        $.each( $scope.statuses, function(key, status){
          if (status.id == status_id){
            status.over = true;
          } else{
            status.over = false;
          }
          $scope.$apply();
        })
      },
      receive: function( e, ui ) {
        
      },
      remove: function() {

      },
      sort: function( e, ui ) {

      },
      start: function() {

      },
      stop: function( e, ui ) {

        $.each($scope.statuses, function(sKey, status){
          $.each(status.tasks, function(tKey, task){
            task.status_id = status.id;
            task.sort = tKey;
          });
        });

        $.each( $scope.statuses, function(key, status){
          status.over = false;
        }); 
        sendTasks($scope.statuses);

      },
      update: function( e, ui ) {
   
      }
    };
    return options;

    function sendTasks(obj){
      $http({
        method: 'PUT',
        url: '/tasks/update',
        data: obj,
      }).then(function successCallback(response) {
        //console.log(response);
      }, function errorCallback(response) {
        //console.log(response);
      });
    }
  }

	$http({

	  method: 'GET',
	  url: '/board/get_board',
	  params:  {
	  	user_id: 1
	  },

	}).then(function successCallback(response) {

		$scope.swimlanes = response.data.swimlanes;
		$scope.statuses = response.data.statuses;

    $scope.css.statusStyle = {
    	width: 100 / $scope.statuses.length + '%'
    };

    $.each($scope.statuses, function(key, status){
	    $scope.sortableOptions[status.id] = createOptions(status.id);
    });

  }, function errorCallback(response) {
    console.log(data);
  });

});