kanbanApp.controller('taskModalCtrl', function ($http, createTaskModal, editTaskModal, boardService) {
  
  this.task = boardService.task;
  this.project = boardService.project;

  this.assigneeUser =  _.find(boardService.project.users, function(u){
    return u.id == boardService.task.assignee_id;
  });

  this.reporterUser =  _.find(boardService.project.users, function(u){
    return u.id == boardService.task.reporter_id;
  });

  boardService.ui = {
    selected: { 
      assignee: this.assigneeUser,
      reporter: this.reporterUser
    }
  };

  this.ui = boardService.ui;

  this.closeMe = function(){
    createTaskModal.deactivate();
    editTaskModal.deactivate();
  }

  this.createTask = function( task ){

    console.log('123123');

  	boardService.fn.createOrUpdateTask( task, 'create' );
  	createTaskModal.deactivate();

  }

  this.editTask = function( task ){  

    console.log('123123');

    boardService.fn.createOrUpdateTask( task, 'update' );
    editTaskModal.deactivate();

  };
});