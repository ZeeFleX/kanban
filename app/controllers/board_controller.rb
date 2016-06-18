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
  	).order(:sort)

    swimlanes = swimlanes.to_a.map(&:serializable_hash)
    statuses = statuses.to_a.map(&:serializable_hash)
    tasks = tasks.to_a.map(&:serializable_hash)

    swimlanes.each do |swimlane|

      swimlane[:statuses] = Array.new
      
      statuses.each do |status|

        swimlaneStatus = status.clone
        swimlaneStatus['swimlane_id'] = swimlane['id']
        swimlane[:statuses] << swimlaneStatus
        swimlaneStatus[:tasks] = Array.new

        tasks.each do |task|

          if 
            swimlaneStatus['id'] == task['status_id'] and swimlane['id'] == task['swimlane_id']
          then   
            swimlaneStatus[:tasks] << task 
          end

        end

      end
    end

  	data = {
  		:swimlanes => swimlanes
  	}

  	render json: data
  end
end
