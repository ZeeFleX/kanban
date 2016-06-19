kanbanApp.controller('BoardCtrl', function($scope, $http, createTaskModal, editTaskModal, boardService) {
  
  $scope.itemArray = [
      {id: 1, name: 'first'},
      {id: 2, name: 'second'},
      {id: 3, name: 'third'},
      {id: 4, name: 'fourth'},
      {id: 5, name: 'fifth'}
  ];

  $scope.selected = { value: $scope.itemArray[0] };



  $scope.task = {};

  $scope.createTask = function(swimlane_id, status_id){

    boardService.task = {
      reporter_id: 1,
      assignee_id: 1,
      project_id: 1,
      swimlane_id: swimlane_id,
      status_id: status_id,
      tracker_id: 1,
      sort: 0
    }

    createTaskModal.activate();
  };

  $scope.editTask = function( task ){
    boardService.task = task;

    editTaskModal.activate();
  };

  var routes = kanbanApp.routes;
  $scope.css = {};
  $scope.sortableOptions = [];

  boardService.fn.getBoard( function(swimlanes){
    $scope.swimlanes = swimlanes;

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
          boardService.fn.sortTasks( $scope.swimlanes );
          sendTasks( $scope.swimlanes );
        }
      };
      return options;

      function sendTasks(obj){
        $http({
          method: 'PUT',
          url: '/board/update_board',
          data: obj,
        }).then(function successCallback(response) {

        }, function errorCallback(response) {

        });
      }
    }

    $scope.css.statusStyle = {
      width: 100 / $scope.swimlanes[0].statuses.length + '%'
    };

    $.each($scope.swimlanes, function(swimKey, swimlane){

      $.each(swimlane.statuses, function(statkey, status){
        $scope.sortableOptions[swimlane.id + '-' + status.id] = createOptions(swimlane.id + '-' + status.id);
      });

    });

  });

});