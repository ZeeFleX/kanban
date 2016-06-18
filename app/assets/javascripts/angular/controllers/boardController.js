kanbanApp.controller('BoardCtrl', function($scope, $http) {

	var routes = kanbanApp.routes;
	$scope.css = {};
	$scope.sortableOptions = [];

	function createOptions (status_id) {
    var options = {
      connectWith: ".k-tasks",
      cursor: "move",
      revert: 200,
      over: function( e, ui ) {
        $.each( $scope.swimlanes, function(swimKey, swimlane){
          
          $.each( swimlane.statuses, function(statKey, status){
            console.log( status_id );
            if (swimlane.id + '-' + status.id == status_id){
              status.over = true;
            } else{
              status.over = false;
            }
            $scope.$apply();
          })

        });
      },
      stop: function( e, ui ) {
        $.each( $scope.swimlanes, function(swimKey, swimlane){

          $.each(swimlane.statuses, function(statKey, status){
            if( status.swimlane_id == swimlane.id ){
              $.each(status.tasks, function(taskKey, task){
                  task.swimlane_id = swimlane.id;
                  task.status_id = status.id;
                  task.sort = taskKey;
              });
            }

            status.over = false;

          });

        });

        sendTasks($scope.swimlanes);
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

    $scope.css.statusStyle = {
    	width: 100 / $scope.swimlanes[0].statuses.length + '%'
    };

    $.each($scope.swimlanes, function(swimKey, swimlane){

      $.each(swimlane.statuses, function(statkey, status){
        $scope.sortableOptions[swimlane.id + '-' + status.id] = createOptions(swimlane.id + '-' + status.id);
      });

    });
    

  }, function errorCallback(response) {
    console.log(data);
  });

});