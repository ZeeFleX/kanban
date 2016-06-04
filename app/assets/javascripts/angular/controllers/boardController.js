kanbanApp.controller('BoardCtrl', function($scope, $http) {

	var routes = kanbanApp.routes;
	$scope.css = {};
	$scope.sortableOptions = [];

	function createOptions (status_id) {
    var options = {
      connectWith: ".k-tasks",
      activate: function() {
        //console.log(status_id + ": activate");
      },
      beforeStop: function() {
        //console.log(status_id + ": beforeStop");
      },
      change: function() {
        //console.log(status_id + ": change");
      },
      create: function() {
        //console.log(status_id + ": create");
      },
      deactivate: function() {
        //console.log(status_id + ": deactivate");
      },
      out: function() {
        //console.log(status_id + ": out");
      },
      over: function() {
        //console.log(status_id + ": over");
      },
      receive: function( e, ui ) {
        var	task_id = ui.item[0].id;

        $http({
				  method: 'PUT',
				  url: '/tasks/update',
				  data:  {
				  	task_id: task_id,
				  	status_id: status_id
				  },

				}).then(function successCallback(response) {
					console.log(response);
			  }, function errorCallback(response) {
			    console.log(response);
			  });
      },
      remove: function() {
        //console.log(status_id + ": remove");
      },
      sort: function() {
        //console.log(status_id + ": sort");
      },
      start: function() {
        //console.log(status_id + ": start");
      },
      stop: function( e, ui ) {
        
      },
      update: function() {
        //console.log(status_id + ": update");
      }
    };
    return options;
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