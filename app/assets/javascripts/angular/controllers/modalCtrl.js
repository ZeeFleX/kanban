kanbanApp.controller('taskModalCtrl', function ($http, createTaskModal, editTaskModal, boardService) {
  this.task = boardService.task;


  this.closeMe = function(){
    createTaskModal.deactivate();
    editTaskModal.deactivate();
  }

  this.createTask = function( task ){
  	
  	boardService.task.title = task.title;
  	boardService.task.description = task.description;

  	$http({
      method: 'POST',
      url: '/tasks',
      data: boardService.task,
    }).then(function successCallback(response) {
    	var task = response.data;

    	$.each(boardService.swimlanes, function(swimKey, swimlane){
    		if( task.swimlane_id == swimlane.id){

    			$.each( swimlane.statuses, function(statKey, status){
    				if( task.status_id == status.id ) status.tasks.unshift( task );
    			});

    		}

    		boardService.fn.sortTasks( boardService.swimlanes );
        createTaskModal.deactivate();
        boardService.task = {};
    	});

    }, function errorCallback(response) {
      console.log(response);
    });
  }

  this.editTask = function( task ){    
    boardService.task.title = task.title;
    boardService.task.description = task.description;

    $http({
      method: 'PUT',
      url: '/tasks/' + boardService.task.id,
      data: boardService.task,
    }).then(function successCallback(response) {
      var task = response.data;

      $.each(boardService.swimlanes, function(swimKey, swimlane){
        if( task.swimlane_id == swimlane.id){

          $.each( swimlane.statuses, function(statKey, status){
            if( task.status_id == status.id ) status.tasks.unshift( task );
          });

        }

        boardService.fn.sortTasks( boardService.swimlanes );
        editTaskModal.deactivate();
        boardService.task = {};
      });

    }, function errorCallback(response) {
      console.log(response);
    });
  };
});