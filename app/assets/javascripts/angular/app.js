'use strict';

/* Controllers */

var kanbanApp = angular.module('kanbanApp', ['ui.sortable', 'ngMaterial']);


kanbanApp
	.config(function($mdThemingProvider) {
	  $mdThemingProvider.theme('default')
	    .primaryPalette('cyan', {
	      'default': '500', // by default use shade 400 from the pink palette for primary intentions
	      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
	      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
	      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
	    })
	    // If you specify less than all of the keys, it will inherit from the
	    // default shades
	    .accentPalette('amber', {
	      'default': '500' // use shade 200 for default, and keep all other shades the same
	    });
		}
	)
	.config(function($mdDateLocaleProvider) {
	  $mdDateLocaleProvider.formatDate = function(date) {
	    return moment(date).format('D MMMM YYYY');
	  };
	});


//Это роуты, вдруг когда-нибудь имена контроллеров поменяются
kanbanApp.routes = {
	_index: {
		_index: '/index/index.json',
		show: '/index/show.json'
	},
	board: {
		_index: '/board/index.json',
		show: '/board/show.json'
	}
}

//Сервисы
kanbanApp.factory('createTaskModal', function (btfModal) {
  return btfModal({
    controller: 'taskModalCtrl',
    controllerAs: 'modal',
    templateUrl: '/partials/createTaskModal'
  });
});

kanbanApp.factory('editTaskModal', function (btfModal) {
  return btfModal({
    controller: 'taskModalCtrl',
    controllerAs: 'modal',
    templateUrl: '/partials/editTaskModal',
    container: $('.root')
  });
});



kanbanApp.factory('boardService', function ($http) {
	var service = this;

	//Чанк для совместной работы с конкретным таском
	service.task = {};

	service.fn = {
		getBoard: function( callback ){
			$http({
			  method: 'GET',
			  url: '/board/get_board',
			  params:  {
			  	user_id: 1
			  },
			}).then(function successCallback(response) {

				service.project = response.data.project;
				console.log(service.project);
				callback( service.project );

		  }, function errorCallback(response) {
		    console.log(data);
		  });
		},
		sortTasks: function( swimlanes ){
			$.each( swimlanes, function(swimKey, swimlane){

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
		},
		sendTasks: function( obj ){
      $http({
        method: 'PUT',
        url: '/board/update_board',
        data: obj,
      }).then(function successCallback(response) {

      }, function errorCallback(response) {

      });
    },
		createOrUpdateTask: function( task, action ){

			var url, method;

			switch(action){
				case 'create':
					method = 'POST';
					url = '/tasks';
				break;

				case 'update':
					method = 'PUT';
					url = '/tasks/' + service.task.id;
				break;
			}

			service.task.title = task.title;
	  	service.task.description = task.description;
	  	service.task.due_date = moment(task.due_date_obj).format('YYYY-MM-DD');
	    service.task.assignee_id = service.ui.selected.assignee.id;
	    service.task.reporter_id = service.ui.selected.reporter.id;

	  	$http({
	      method: method,
	      url: url,
	      data: service.task,
	    }).then(function successCallback(response) {
	    	var task = response.data;

	    	$.each(service.project.swimlanes, function(swimKey, swimlane){
	    		if( task.swimlane_id == swimlane.id){

	    			$.each( swimlane.statuses, function(statKey, status){
	    				if( task.status_id == status.id && action == 'create' ) status.tasks.unshift( task );

	            $.each( status.tasks, function(taskKey, t){
	              if (t.id == task.id) {
	                t.assignee = task.assignee;
	                t.due_date = task.due_date;
	              }
	            });
	    			});
	    		}
	    	});

	      service.fn.sortTasks( service.swimlanes );

	      service.task = {};

	    }, function errorCallback(response) {
	      console.log(response);
	    });
		}
	}

	return service
});
