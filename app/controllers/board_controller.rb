class BoardController < ApplicationController
	skip_before_filter :verify_authenticity_token, :only => [:update_board]
  def index

  end

  def show
    
  end

  def get_board

    project = Hash.new

  	swimlanes = Swimlane.where(
  		project_id: User.find(params[:user_id]).projects.where(id: 1)
  	)

    statuses = Status.where(
      project_id: User.find(params[:user_id]).projects.where(id: 1)
    )

  	tasks = Task.where(
  		project_id: User.find(params[:user_id]).projects.where(id: 1)
  	).order(:sort)

    users = Project.find(1).users

    swimlanes = swimlanes.to_a.map(&:serializable_hash)
    statuses = statuses.to_a.map(&:serializable_hash)
    tasks = tasks.to_a.map(&:serializable_hash)
    users = users.to_a.map(&:serializable_hash)

    users.each do |user|
      user['profile'] = Profile.where(user_id: user['id']).take
    end
    
    project[:users] = users
    project[:swimlanes] = swimlanes

    project[:swimlanes].each do |swimlane|

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

          users.each do |user|
            task['assignee'] = user if task['assignee_id'] == user['id']
            task['reporter'] = user if task['reporter_id'] == user['id']
          end

        end

      end
    end

  	data = {
  		:project => project
  	}

  	render json: data
  end

  def update_board

    swimlanes = params[:_json]

    tasks = {}

    swimlanes.each do |swimlane|

      swimlane['statuses'].each do |status|
        status['tasks'].each do |task|
          tasks[task['id']] = task
          task.delete(:id)
          task.delete(:assignee)
          task.delete(:reporter)
        end
      end

    end

    puts tasks.inspect

    render text: 'success' if Task.update(tasks.keys, tasks.values)
  end
end
