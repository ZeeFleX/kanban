class BoardController < ApplicationController
	
  def index

  	trackers = ['expedite', 'normal']
  	statuses = ['Backlog', 'To Do', 'In Progress', 'Done', 'QA', 'Closed']
  	tasks = [
			{
				id: 1,
				title: 'Починить интернет',
				description: 'DNS probe fnished. Впрочем, ничего нового.',
				status: 'closed',
				tracker: 'normal'
			},
			{
				id: 2,
				title: 'Написать ТЗ по сервису',
				description: 'Расписать сценарии использования нашей Kanban-доски',
				status: 'In Progress',
				tracker: 'expedite'
			},
			{
				id: 3,
				title: 'Набросать болванку',
				description: 'На которую будем натягивать потом Angular',
				status: 'Done',
				tracker: 'normal'
			},
			{
				id: 4,
				title: 'Подключить БД',
				description: 'Структура доски и таски должны браться из БД',
				status: 'To Do',
				tracker: 'normal'
			},
			{
				id: 5,
				title: 'Отдать Стасу',
				description: 'Для проверки на говнокод',
				status: 'To Do',
				tracker: 'normal'
			}
		]

  	data = {
  		:trackers => trackers,
  		:statuses => statuses,
  		:tasks =>tasks
  	}

  	respond_to do |format|
      format.html
      format.json { render json: data }
    end

  end

  def show
  end
end
