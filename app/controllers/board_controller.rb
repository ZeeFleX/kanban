class BoardController < ApplicationController
	
  def index

  end

  def show
  end

  def get_board

  	swimlanes = Swimlane.where(
  		project_id: User.find(params[:user_id]).projects.where(id: 1)
  	)

    statuses = Status.where(
      project_id: User.find(params[:user_id]).projects.where(id: 1)
    )

  	tasks = Task.where(
  		project_id: User.find(params[:user_id]).projects.where(id: 1)
  	)

    statuses = statuses.to_a.map(&:serializable_hash)
    tasks = tasks.to_a.map(&:serializable_hash)

    statuses.each do |status|
      status[:tasks] = Array.new

      tasks.each do |task|
        if status['id'] == task['status_id'] then status[:tasks] << task end
      end

    end

  	data = {
  		:swimlanes => swimlanes,
  		:statuses => statuses,
  	}

  	render json: data
  end
end
