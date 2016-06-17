class TasksController < ApplicationController
  skip_before_filter :verify_authenticity_token, :only => [:update]

  def index
  end

  def new
  end

  def create
  end

  def show
  end

  def edit
  end

  def update
    statuses = params[:_json]

    tasks = {}



    statuses.each do |status|
      status['tasks'].each do |task|
        tasks[task['id']] = task
        task.delete('id')
      end
    end

    puts tasks.inspect

    Task.update(tasks.keys, tasks.values)

  end

  def destroy
  end

end
