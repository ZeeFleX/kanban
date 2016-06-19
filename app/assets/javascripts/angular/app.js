'use strict';

/* Controllers */

var kanbanApp = angular.module('kanbanApp', ['ui.sortable', 'btford.modal', 'ui.select']);


kanbanApp.config(function(uiSelectConfig) {
  uiSelectConfig.theme = 'selectize';
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
	
	//Чанк для совместной работы с доской
	service.swimlanes = {};

	service.fn = {
		getBoard: function( callback ){
			$http({
			  method: 'GET',
			  url: '/board/get_board',
			  params:  {
			  	user_id: 1
			  },
			}).then(function successCallback(response) {

				service.swimlanes = response.data.swimlanes;
				callback( service.swimlanes );

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
		}
	}

	return service
});
