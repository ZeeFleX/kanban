class BoardController < ApplicationController
	
  def index

  end

  def show
  end

  def get_board

  	statuses = Status.where(
  		project_id: User.find(params[:user_id]).projects.where(id: 1)
  	)

  	swimlanes = Swimlane.where(
  		project_id: User.find(params[:user_id]).projects.where(id: 1)
  	)

  	tasks = Task.where(
  		project_id: User.find(params[:user_id]).projects.where(id: 1)
  	)

  	data = {
  		:swimlanes => swimlanes,
  		:statuses => statuses,
  		:tasks =>tasks
  	}

  	render json: data
  end
end
