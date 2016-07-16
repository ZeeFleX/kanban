kanbanApp.controller('BoardCtrl', function($scope, $http, $mdDialog, $mdMedia, boardService) {
  
  $scope.showCreateTaskDialog = function(ev, swimlane_id, status_id) {

    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

    var task = {
      swimlane_id: swimlane_id,
      status_id: status_id,
      due_date: new Date()

    };

    $mdDialog.show({
      controller: 'DialogController',
      templateUrl: '/partials/createTaskDialog',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen,
      locals: {
        $mdDialog: $mdDialog,
        task: task,
        project: boardService.project
      }
    })
    .then(function(answer) {
      boardService.fn.createOrUpdateTask( task, 'create' );
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };

  $scope.showEditTaskDialog = function(ev, task) {

    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

    $mdDialog.show({
      controller: 'DialogController',
      templateUrl: '/partials/editTaskDialog',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen,
      locals: {
        $mdDialog: $mdDialog,
        task: task,
        project: boardService.project
      }
    })
    .then(function(answer) {
      console.log(task);
      boardService.fn.createOrUpdateTask( task, 'update' );
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };


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

    var dateObject = moment(str).toDate();
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
    boardService.task.due_date_obj = moment(boardService.task.due_date).toDate();
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

        $.each(status.tasks, function(taskKey, task){
          task.due_date = new Date(task.due_date);
        });
      });
    });

  });

});

// function DialogController($scope, $mdDialog, task) {

//   $scope.task = task;
//   $scope.hide = function() {
//     $mdDialog.hide();
//   };
//   $scope.cancel = function() {
//     $mdDialog.cancel();
//   };
//   $scope.answer = function(answer) {
//     $mdDialog.hide(answer);
//   };
// }