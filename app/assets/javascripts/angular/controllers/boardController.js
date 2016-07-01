kanbanApp.controller('BoardCtrl', function($scope, $http, createTaskModal, editTaskModal, boardService, uibDateParser) {
  
  $scope.project = [];
  $scope.task = {};

  $scope.calcRemaining = function( createdAt, deadline ){

    var msAllotted = moment(deadline) - moment(createdAt),
        msRemaining = moment(deadline) - moment(),
        result = {};

    if( msRemaining > 0){
      result.remainingString = Math.ceil(msRemaining / 1000 / 60 / 60 / 24) + ' дней';
      result.passedPercent = Math.ceil((msAllotted - msRemaining) / msAllotted * 100);
    }else{
      result.remainingString = 'Задача просрочена';
      result.passedPercent = 100;
    }

    return result;
  }

  $scope.formatDate = function( str ){

    var dateObject = uibDateParser.parse(str, "yyyy-MM-dd");
    return moment(dateObject).format("D MMMM YYYY");
  }

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
    boardService.task.due_date_obj = uibDateParser.parse(boardService.task.due_date, "yyyy-MM-dd");
    editTaskModal.activate();
  };

  var routes = kanbanApp.routes;
  $scope.css = {};
  $scope.sortableOptions = [];

  boardService.fn.getBoard( function( project ){

    $scope.project = project;
    $scope.swimlanes = project.swimlanes;
    $scope.users = project.users;

    function createOptions (status_id) {
      var options = {
        connectWith: ".k-tasks",
        cursor: "move",
        revert: 200,
        over: function( e, ui ) {
          $.each( $scope.swimlanes, function(swimKey, swimlane){
            
            $.each( swimlane.statuses, function(statKey, status){
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
          boardService.fn.sendTasks( $scope.swimlanes );
        }
      };
      return options;
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