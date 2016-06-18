kanbanApp.controller('taskModalCtrl', function ($http, taskModal, boardService) {
  this.closeMe = taskModal.deactivate;

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

    		boardService.task = {};
    		console.log(boardService.task);
    	});

    }, function errorCallback(response) {

    });
  }
});