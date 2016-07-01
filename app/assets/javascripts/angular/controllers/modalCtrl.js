kanbanApp.controller('taskModalCtrl', function ($scope, $http, createTaskModal, editTaskModal, boardService) {

  this.dueDate = {
    altInputFormats: ['yyyy-MM-dd'],
    format:'yyyy-MM-dd',
    dateOptions: {
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1
    },
    opened: false,
    open: function(){
      this.opened = true;
    }
  }

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

    task.due_date = moment(task.due_date_obj).format("D MMMM YYYY");

  	boardService.fn.createOrUpdateTask( task, 'create' );
  	createTaskModal.deactivate();

  }

  this.editTask = function( task ){  

    task.due_date = moment(task.due_date_obj).format("D MMMM YYYY");

    boardService.fn.createOrUpdateTask( task, 'update' );
    editTaskModal.deactivate();

  };
});