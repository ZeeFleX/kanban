kanbanApp.controller('taskModalCtrl', function ($http, createTaskModal, editTaskModal, boardService) {
  
  this.task = boardService.task;
  this.project = boardService.project;

  this.assigneeUser =  _.find(boardService.project.users, function(u){
    return u.id == boardService.task.assignee_id;
  });

  boardService.ui = {
    selected: { value: this.assigneeUser }
  };

  this.ui = boardService.ui;

  this.closeMe = function(){
    createTaskModal.deactivate();
    editTaskModal.deactivate();
  }

  this.createTask = function( task ){
  	
  	boardService.task.title = task.title;
  	boardService.task.description = task.description;
    boardService.task.assignee_id = this.ui.selected.value.id;

  	$http({
      method: 'POST',
      url: '/tasks',
      data: boardService.task,
    }).then(function successCallback(response) {
    	var task = response.data;

    	$.each(boardService.project.swimlanes, function(swimKey, swimlane){
    		if( task.swimlane_id == swimlane.id){

    			$.each( swimlane.statuses, function(statKey, status){
    				if( task.status_id == status.id ) status.tasks.unshift( task );

            $.each( status.tasks, function(taskKey, t){
              if (t.id == task.id) {
                t.assignee = task.assignee;
                console.log(boardService.project);
              }
            });
    			});
    		}
    	});

      boardService.fn.sortTasks( boardService.swimlanes );
      createTaskModal.deactivate();
      boardService.task = {};

    }, function errorCallback(response) {
      console.log(response);
    });
  }

  this.editTask = function( task ){  

    boardService.task.title = task.title;
    boardService.task.description = task.description;
    boardService.task.assignee_id = this.ui.selected.value.id;

    $http({
      method: 'PUT',
      url: '/tasks/' + boardService.task.id,
      data: boardService.task,
    }).then(function successCallback(response) {
      var task = response.data;

      $.each(boardService.project.swimlanes, function(swimKey, swimlane){
        if( task.swimlane_id == swimlane.id){

          $.each( swimlane.statuses, function(statKey, status){
            
            $.each( status.tasks, function(taskKey, t){
              if (t.id == task.id) {
                t.assignee = task.assignee;
                console.log(boardService.project);
              }
            });
          });
        }
      });

      boardService.fn.sortTasks( boardService.swimlanes );
      editTaskModal.deactivate();
      boardService.task = {};

    }, function errorCallback(response) {
      console.log(response);
    });
  };
});