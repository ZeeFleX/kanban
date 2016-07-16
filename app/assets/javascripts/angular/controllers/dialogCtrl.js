kanbanApp.controller('DialogController', function ($scope, $http, boardService, $mdDialog, task, project) {

  $scope.task = task;
  $scope.project = project;

  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };

  $scope.assigneeUser =  _.find($scope.project.users, function(u){
    return u.id == $scope.task.assignee_id;
  });

  $scope.reporterUser =  _.find($scope.project.users, function(u){
    return u.id == $scope.task.reporter_id;
  });


  $scope.ui = {};

  $scope.ui.selected = {
    assignee: $scope.assigneeUser,
    reporter: $scope.reporterUser
  };
  $scope.ui.searchTerm = '';


  // this.createTask = function( task ){

  //   task.due_date = moment(task.due_date_obj).format("D MMMM YYYY");

  // 	boardService.fn.createOrUpdateTask( task, 'create' );
  // 	createTaskModal.deactivate();

  // }

  // this.editTask = function( task ){  

  //   task.due_date = moment(task.due_date_obj).format("D MMMM YYYY");

  //   boardService.fn.createOrUpdateTask( task, 'update' );
  //   editTaskModal.deactivate();

  // };
});