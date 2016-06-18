class TasksController < ApplicationController
  skip_before_filter :verify_authenticity_token, :only => [:create, :update]

  def index
  end

  def new
  end

  def create
    

    task = Task.new(params[:task]);

    render json: task if task.save

  end

  def show
    task = Task.find(1)

    render json: task
  end

  def edit
  end

  def update
    swimlanes = params[:_json]

    tasks = {}

    swimlanes.each do |swimlane|

      swimlane['statuses'].each do |status|
        status['tasks'].each do |task|
          tasks[task['id']] = task
          task.delete('id')
        end
      end

    end

    puts tasks.inspect

    Task.update(tasks.keys, tasks.values)

  end

  def destroy
  end

end
